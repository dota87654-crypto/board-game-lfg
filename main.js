// ============================================================
//  보드게임 LFG — App
// ============================================================

const SUPABASE_URL      = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';

const CATS = {
  boardgame_cafe: { label: '보드게임방',          icon: '🏠' },
  private:        { label: '개인소유',             icon: '☕' },
  tabletop_sim:   { label: '테이블탑 시뮬레이터',  icon: '🖥️' },
  bga:            { label: 'BGA',                  icon: '🌐' },
  steam:          { label: '스팀게임',             icon: '🎮' },
};

let sb, me, curRoomId, curCat = 'all';
let memberSet = new Set();
let roomChannel, listChannel, curRoomData;

function $(id) { return document.getElementById(id); }
function h(s) {
  if (!s) return '';
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function avatar(name) {
  return 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name || 'U') + '&background=7c6ff7&color=fff&size=64';
}
function showView(name) {
  document.querySelectorAll('.view').forEach(function(v) { v.hidden = true; });
  $('view-' + name).hidden = false;
}

// ── 초기화 ─────────────────────────────────────────────────
async function init() {
  try {
    sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    sb.auth.onAuthStateChange(async function(_event, session) {
      if (session && session.user) {
        await loadProfile(session.user);
        showView('main');
        subscribeList();
        fetchRooms(curCat);
      } else {
        me = null;
        if (listChannel) sb.removeChannel(listChannel);
        showView('auth');
      }
    });

    const res = await sb.auth.getSession();
    if (!res.data || !res.data.session) {
      showView('auth');
    }
  } catch (err) {
    console.error('init error:', err);
    showView('auth');
  }
}

// ── 프로필 ─────────────────────────────────────────────────
async function loadProfile(user) {
  var meta = user.user_metadata || {};
  me = {
    id:         user.id,
    email:      user.email,
    username:   meta.full_name || meta.name || (user.email ? user.email.split('@')[0] : '익명'),
    avatar_url: meta.avatar_url || meta.picture || null,
  };
  try {
    await sb.from('profiles').upsert({
      id:         me.id,
      username:   me.username,
      avatar_url: me.avatar_url,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });
    var result = await sb.from('profiles').select('*').eq('id', me.id).single();
    if (result.data) {
      me.username   = result.data.username   || me.username;
      me.avatar_url = result.data.avatar_url || me.avatar_url;
    }
  } catch (err) {
    console.warn('profile sync error:', err);
  }
  renderUserUI();
}

function renderUserUI() {
  var av = me.avatar_url || avatar(me.username);
  document.querySelectorAll('.u-avatar').forEach(function(el) { el.src = av; });
  document.querySelectorAll('.u-name').forEach(function(el) { el.textContent = me.username || me.email; });
}

// ── Google 로그인 ──────────────────────────────────────────
$('btn-google-login').addEventListener('click', async function() {
  if (!sb) { alert('초기화 중입니다. 잠시 후 다시 시도해주세요.'); return; }
  try {
    var res = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (res.error) alert('Google 로그인 실패: ' + res.error.message);
  } catch (err) {
    alert('로그인 오류: ' + err.message);
  }
});

$('btn-logout').addEventListener('click', async function() {
  if (roomChannel) sb.removeChannel(roomChannel);
  if (listChannel) sb.removeChannel(listChannel);
  await sb.auth.signOut();
});

// ── 방 목록 ────────────────────────────────────────────────
async function fetchRooms(cat) {
  cat = cat || 'all';
  curCat = cat;

  var q = sb.from('rooms')
    .select('*, host:profiles!host_id(username, avatar_url)')
    .eq('status', 'open')
    .order('created_at', { ascending: false });
  if (cat !== 'all') q = q.eq('category', cat);

  var roomsRes = await q;
  var memsRes  = await sb.from('room_members').select('room_id');

  var rooms = roomsRes.data || [];
  var mems  = memsRes.data  || [];

  var cnt = {};
  mems.forEach(function(m) { cnt[m.room_id] = (cnt[m.room_id] || 0) + 1; });

  renderRooms(rooms, cnt);
}

function renderRooms(rooms, cnt) {
  $('rooms-count').textContent = rooms.length + '개';
  var grid = $('room-grid');
  if (!rooms.length) {
    grid.innerHTML = '<div class="empty-state"><div class="empty-icon">🎲</div><div class="empty-text">모집 중인 방이 없어요.<br>첫 번째로 방을 만들어보세요!</div></div>';
    return;
  }
  grid.innerHTML = rooms.map(function(r) {
    var cat  = CATS[r.category] || {};
    var n    = cnt[r.id] || 0;
    var full = n >= r.max_players;
    var av   = (r.host && r.host.avatar_url) ? r.host.avatar_url : avatar(r.host && r.host.username);
    return '<div class="room-card" data-id="' + r.id + '">' +
      '<div class="rc-top">' +
        '<span class="rc-title">' + h(r.title) + '</span>' +
        '<span class="cbadge cb-' + r.category + '">' + cat.icon + ' ' + cat.label + '</span>' +
      '</div>' +
      (r.game_name ? '<div class="rc-game">🎯 ' + h(r.game_name) + '</div>' : '') +
      (r.description ? '<div class="rc-desc">' + h(r.description) + '</div>' : '') +
      '<div class="rc-bottom">' +
        '<span class="rc-host"><img src="' + av + '" alt="">' + h((r.host && r.host.username) || '알 수 없음') + '</span>' +
        '<span class="rc-players ' + (full ? 'full' : 'open') + '">' + (full ? '🔴' : '🟢') + ' ' + n + ' / ' + r.max_players + '</span>' +
      '</div>' +
    '</div>';
  }).join('');

  grid.querySelectorAll('.room-card').forEach(function(el) {
    el.addEventListener('click', function() { openRoom(el.dataset.id); });
  });
}

document.querySelectorAll('.cat-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.cat-tab').forEach(function(t) { t.classList.remove('active'); });
    tab.classList.add('active');
    fetchRooms(tab.dataset.cat);
  });
});

// ── 방 만들기 ──────────────────────────────────────────────
$('btn-create-room').addEventListener('click', function() {
  if (!me) { alert('먼저 로그인해주세요.'); showView('auth'); return; }
  $('modal-create').hidden = false;
});
$('btn-modal-close').addEventListener('click', closeModal);
$('btn-cancel').addEventListener('click', closeModal);
function closeModal() { $('modal-create').hidden = true; }

$('btn-submit').addEventListener('click', async function() {
  if (!me) { closeModal(); showView('auth'); return; }

  var title = $('f-title').value.trim();
  var game  = $('f-game').value.trim();
  var cat   = $('f-category').value;
  var max   = parseInt($('f-max').value) || 4;
  var desc  = $('f-desc').value.trim();

  if (!title) { alert('방 제목을 입력해주세요.'); return; }

  var btn = $('btn-submit');
  btn.disabled = true; btn.textContent = '생성 중...';

  try {
    var res = await sb.from('rooms').insert({
      title:       title,
      game_name:   game || null,
      category:    cat,
      max_players: max,
      description: desc || null,
      host_id:     me.id,
    }).select().single();

    if (res.error) throw res.error;

    await sb.from('room_members').insert({ room_id: res.data.id, user_id: me.id });

    closeModal();
    $('f-title').value = ''; $('f-game').value = ''; $('f-desc').value = ''; $('f-max').value = '4';
    openRoom(res.data.id);
  } catch (err) {
    alert('방 생성 실패: ' + err.message);
  } finally {
    btn.disabled = false; btn.textContent = '방 만들기';
  }
});

// ── 방 열기 ────────────────────────────────────────────────
async function openRoom(roomId) {
  curRoomId = roomId;
  showView('room');
  renderUserUI();

  var res = await sb.from('rooms')
    .select('*, host:profiles!host_id(id, username, avatar_url)')
    .eq('id', roomId).single();

  if (!res.data) { showView('main'); return; }
  curRoomData = res.data;

  var cat = CATS[curRoomData.category] || {};
  $('room-cat-badge').innerHTML = '<span class="cbadge cb-' + curRoomData.category + '">' + cat.icon + ' ' + cat.label + '</span>';
  $('room-title').textContent = curRoomData.title;
  $('room-game').textContent  = curRoomData.game_name ? '🎯 ' + curRoomData.game_name : '';
  $('room-desc').textContent  = curRoomData.description || '';
  $('room-host').textContent  = (curRoomData.host && curRoomData.host.username) || '알 수 없음';
  $('room-max').textContent   = curRoomData.max_players;

  await loadMembers();
  await loadMessages();
  subscribeRoom(roomId);
}

// ── 멤버 ───────────────────────────────────────────────────
async function loadMembers() {
  var res = await sb.from('room_members')
    .select('user:profiles(id, username, avatar_url)')
    .eq('room_id', curRoomId);

  var mems = res.data || [];
  memberSet = new Set(mems.map(function(m) { return m.user && m.user.id; }));

  $('room-cur').textContent    = memberSet.size;
  $('member-count').textContent = memberSet.size;

  $('members-list').innerHTML = mems.map(function(m) {
    var u = m.user || {};
    var isHost = curRoomData && u.id === curRoomData.host_id;
    return '<div class="member-item' + (isHost ? ' is-host' : '') + '">' +
      '<img class="m-avatar" src="' + (u.avatar_url || avatar(u.username)) + '" alt="">' +
      '<span class="m-name">' + h(u.username || '?') + '</span>' +
      (isHost ? '<span class="host-tag">호스트</span>' : '') +
    '</div>';
  }).join('');

  updateJoinBtn();
}

function updateJoinBtn() {
  var btn    = $('btn-join-leave');
  var isMem  = me && memberSet.has(me.id);
  var isHost = me && curRoomData && curRoomData.host_id === me.id;
  var isFull = memberSet.size >= (curRoomData ? curRoomData.max_players : 0);

  btn.className = 'btn btn-block';
  btn.disabled  = false;

  if (isHost) {
    btn.textContent = '방 닫기'; btn.classList.add('btn-danger');
    btn.onclick = closeRoomHandler;
  } else if (isMem) {
    btn.textContent = '방 나가기'; btn.classList.add('btn-danger');
    btn.onclick = leaveRoomHandler;
  } else if (isFull) {
    btn.textContent = '인원 마감'; btn.classList.add('btn-ghost');
    btn.disabled = true;
  } else {
    btn.textContent = '방 참여하기'; btn.classList.add('btn-primary');
    btn.onclick = joinRoomHandler;
  }
}

async function joinRoomHandler() {
  var res = await sb.from('room_members').insert({ room_id: curRoomId, user_id: me.id });
  if (res.error) { alert('참여 실패: ' + res.error.message); return; }
  sysMsg(me.username + '님이 참여했습니다.');
}
async function leaveRoomHandler() {
  await sb.from('room_members').delete().eq('room_id', curRoomId).eq('user_id', me.id);
  sysMsg(me.username + '님이 나갔습니다.');
  showView('main'); fetchRooms(curCat);
}
async function closeRoomHandler() {
  if (!confirm('방을 닫으시겠습니까?')) return;
  await sb.from('rooms').update({ status: 'closed' }).eq('id', curRoomId);
  showView('main'); fetchRooms(curCat);
}

// ── 채팅 ───────────────────────────────────────────────────
async function loadMessages() {
  var res = await sb.from('messages')
    .select('*, user:profiles(username, avatar_url)')
    .eq('room_id', curRoomId)
    .order('created_at', { ascending: true });
  var box = $('chat-messages');
  box.innerHTML = '';
  (res.data || []).forEach(appendMsg);
  scrollDown();
}

function appendMsg(msg) {
  var box    = $('chat-messages');
  var isSys  = msg.content.indexOf('__sys__') === 0;
  var isMine = me && msg.user_id === me.id;
  var u      = msg.user || {};
  var time   = new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  var av     = u.avatar_url || avatar(u.username);
  var el     = document.createElement('div');

  if (isSys) {
    el.className = 'chat-msg system';
    el.innerHTML = '<span class="c-sys">' + h(msg.content.replace('__sys__', '')) + '</span>';
  } else {
    el.className = 'chat-msg' + (isMine ? ' mine' : '');
    el.innerHTML =
      '<img class="c-avatar" src="' + av + '" alt="">' +
      '<div class="c-body">' +
        '<div class="c-meta"><span class="c-name">' + h(u.username || '?') + '</span><span>' + time + '</span></div>' +
        '<div class="c-bubble">' + h(msg.content) + '</div>' +
      '</div>';
  }
  box.appendChild(el);
}

function scrollDown() {
  var box = $('chat-messages');
  box.scrollTop = box.scrollHeight;
}

async function sysMsg(text) {
  await sb.from('messages').insert({ room_id: curRoomId, user_id: me.id, content: '__sys__' + text });
}

$('btn-send').addEventListener('click', sendMsg);
$('chat-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
});

async function sendMsg() {
  var input = $('chat-input');
  var text  = input.value.trim();
  if (!text) return;
  if (!me || !memberSet.has(me.id)) { alert('채팅하려면 먼저 방에 참여하세요.'); return; }
  input.value = '';
  await sb.from('messages').insert({ room_id: curRoomId, user_id: me.id, content: text });
}

// ── 실시간 ─────────────────────────────────────────────────
function subscribeRoom(roomId) {
  if (roomChannel) sb.removeChannel(roomChannel);
  roomChannel = sb.channel('room-' + roomId)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'room_id=eq.' + roomId },
      async function(payload) {
        var res = await sb.from('messages').select('*, user:profiles(username, avatar_url)').eq('id', payload.new.id).single();
        if (res.data) { appendMsg(res.data); scrollDown(); }
      })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'room_members', filter: 'room_id=eq.' + roomId },
      function() { loadMembers(); })
    .subscribe();
}

function subscribeList() {
  if (listChannel) sb.removeChannel(listChannel);
  listChannel = sb.channel('room-list')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' },
      function() { if (!$('view-main').hidden) fetchRooms(curCat); })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'room_members' },
      function() { if (!$('view-main').hidden) fetchRooms(curCat); })
    .subscribe();
}

$('btn-back').addEventListener('click', function() {
  if (roomChannel) sb.removeChannel(roomChannel);
  showView('main'); fetchRooms(curCat);
});

// ── 시작 ───────────────────────────────────────────────────
init();
