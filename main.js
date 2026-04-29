// ============================================================
//  보드게임 LFG — App
// ============================================================

// ── Supabase 설정 ─────────────────────────────────────────────
// supabase.com > 프로젝트 > Settings > API 에서 복사하세요
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// ── 카테고리 ──────────────────────────────────────────────────
const CATS = {
  boardgame_cafe: { label: '보드게임방',          icon: '🏠' },
  private:        { label: '개인소유',             icon: '☕' },
  tabletop_sim:   { label: '테이블탑 시뮬레이터',  icon: '🖥️' },
  bga:            { label: 'BGA',                  icon: '🌐' },
  steam:          { label: '스팀게임',             icon: '🎮' },
};

// ── 전역 상태 ─────────────────────────────────────────────────
let sb;
let me;               // 현재 로그인 유저 + 프로필
let curRoomId;
let curCat = 'all';
let memberSet = new Set();   // 현재 방 멤버 user_id
let roomChannel;             // 방 실시간 채널
let listChannel;             // 목록 실시간 채널
let curRoomData;             // 방 정보 캐시

// ── 초기화 ───────────────────────────────────────────────────
async function init() {
  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    document.getElementById('view-loading').innerHTML = `
      <div style="text-align:center;padding:40px;color:#8892b0;font-family:Inter,sans-serif">
        <div style="font-size:48px;margin-bottom:16px">⚙️</div>
        <h2 style="color:#e8eaf2;margin-bottom:8px">Supabase 설정 필요</h2>
        <p>main.js 상단의 SUPABASE_URL과 SUPABASE_ANON_KEY를 설정하세요.</p>
        <p style="margin-top:8px;font-size:13px">supabase_setup.sql을 먼저 실행하세요.</p>
      </div>`;
    return;
  }

  sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  sb.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      await loadProfile(session.user);
      showView('main');
      subscribeList();
      await fetchRooms(curCat);
    } else {
      me = null;
      if (listChannel) sb.removeChannel(listChannel);
      showView('auth');
    }
  });

  const { data: { session } } = await sb.auth.getSession();
  if (!session) showView('auth');
}

// ── 프로필 ───────────────────────────────────────────────────
async function loadProfile(user) {
  const meta = user.user_metadata || {};

  // 프로필이 없으면 생성 (트리거 미실행 or 트리거 설정 전 가입 계정 대비)
  const { error: upsertErr } = await sb.from('profiles').upsert({
    id:         user.id,
    username:   meta.full_name || meta.name || user.email?.split('@')[0] || '익명',
    avatar_url: meta.avatar_url || meta.picture || null,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' });

  if (upsertErr) console.warn('profile upsert:', upsertErr.message);

  const { data } = await sb.from('profiles').select('*').eq('id', user.id).single();
  me = { ...user, ...(data || {}) };
  renderUserUI();
}

function renderUserUI() {
  const av = me.avatar_url || avatar(me.username);
  document.querySelectorAll('.u-avatar').forEach(el => el.src = av);
  document.querySelectorAll('.u-name').forEach(el => el.textContent = me.username || me.email);
}

// ── 인증 ─────────────────────────────────────────────────────
$('btn-google-login').onclick = () =>
  sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: location.origin } });

$('btn-logout').onclick = async () => {
  if (roomChannel) sb.removeChannel(roomChannel);
  if (listChannel) sb.removeChannel(listChannel);
  await sb.auth.signOut();
};

// ── 뷰 전환 ──────────────────────────────────────────────────
function showView(name) {
  document.querySelectorAll('.view').forEach(v => { v.hidden = true; });
  $(`view-${name}`).hidden = false;
}

// ── 방 목록 ──────────────────────────────────────────────────
async function fetchRooms(cat = 'all') {
  curCat = cat;

  let q = sb.from('rooms')
    .select('*, host:profiles!host_id(username, avatar_url)')
    .eq('status', 'open')
    .order('created_at', { ascending: false });

  if (cat !== 'all') q = q.eq('category', cat);

  const [{ data: rooms }, { data: mems }] = await Promise.all([
    q,
    sb.from('room_members').select('room_id'),
  ]);

  // 방별 인원 수 집계
  const cnt = {};
  (mems || []).forEach(m => { cnt[m.room_id] = (cnt[m.room_id] || 0) + 1; });

  renderRooms(rooms || [], cnt);
}

function renderRooms(rooms, cnt) {
  const grid = $('room-grid');
  $('rooms-count').textContent = `${rooms.length}개`;

  if (!rooms.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎲</div>
        <div class="empty-text">모집 중인 방이 없어요.<br>첫 번째로 방을 만들어보세요!</div>
      </div>`;
    return;
  }

  grid.innerHTML = rooms.map(r => {
    const cat = CATS[r.category] || {};
    const n   = cnt[r.id] || 0;
    const full = n >= r.max_players;
    const av  = r.host?.avatar_url || avatar(r.host?.username);
    return `
      <div class="room-card" data-id="${r.id}">
        <div class="rc-top">
          <span class="rc-title">${h(r.title)}</span>
          <span class="cbadge cb-${r.category}">${cat.icon} ${cat.label}</span>
        </div>
        ${r.game_name ? `<div class="rc-game">🎯 ${h(r.game_name)}</div>` : ''}
        ${r.description ? `<div class="rc-desc">${h(r.description)}</div>` : ''}
        <div class="rc-bottom">
          <span class="rc-host">
            <img src="${av}" alt="">
            ${h(r.host?.username || '알 수 없음')}
          </span>
          <span class="rc-players ${full ? 'full' : 'open'}">
            ${full ? '🔴' : '🟢'} ${n} / ${r.max_players}
          </span>
        </div>
      </div>`;
  }).join('');

  grid.querySelectorAll('.room-card').forEach(el =>
    el.onclick = () => openRoom(el.dataset.id)
  );
}

// ── 카테고리 탭 ──────────────────────────────────────────────
document.querySelectorAll('.cat-tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    fetchRooms(tab.dataset.cat);
  };
});

// ── 방 만들기 ─────────────────────────────────────────────────
$('btn-create-room').onclick = () => { $('modal-create').hidden = false; };
$('btn-modal-close').onclick = closeModal;
$('btn-cancel').onclick      = closeModal;
function closeModal() { $('modal-create').hidden = true; }

$('btn-submit').onclick = async () => {
  const title = $('f-title').value.trim();
  const game  = $('f-game').value.trim();
  const cat   = $('f-category').value;
  const max   = parseInt($('f-max').value) || 4;
  const desc  = $('f-desc').value.trim();

  if (!title) { alert('방 제목을 입력해주세요.'); return; }

  const btn = $('btn-submit');
  btn.disabled = true; btn.textContent = '생성 중...';

  const { data: room, error } = await sb.from('rooms').insert({
    title, game_name: game || null, category: cat,
    max_players: max, description: desc || null, host_id: me.id,
  }).select().single();

  btn.disabled = false; btn.textContent = '방 만들기';

  if (error) { console.error(error); alert(`방 생성 실패: ${error.message}`); return; }

  // 호스트 자동 참여
  await sb.from('room_members').insert({ room_id: room.id, user_id: me.id });

  closeModal();
  // 폼 초기화
  ['f-title','f-game','f-desc'].forEach(id => { $(id).value = ''; });
  $('f-max').value = '4';

  openRoom(room.id);
};

// ── 방 열기 ──────────────────────────────────────────────────
async function openRoom(roomId) {
  curRoomId = roomId;
  showView('room');
  renderUserUI();

  const { data: room } = await sb.from('rooms')
    .select('*, host:profiles!host_id(id, username, avatar_url)')
    .eq('id', roomId)
    .single();

  if (!room) { showView('main'); return; }
  curRoomData = room;

  const cat = CATS[room.category] || {};
  $('room-cat-badge').innerHTML =
    `<span class="cbadge cb-${room.category}">${cat.icon} ${cat.label}</span>`;
  $('room-title').textContent = room.title;
  $('room-game').textContent  = room.game_name ? `🎯 ${room.game_name}` : '';
  $('room-desc').textContent  = room.description || '';
  $('room-host').textContent  = room.host?.username || '알 수 없음';
  $('room-max').textContent   = room.max_players;

  await loadMembers();
  await loadMessages();
  subscribeRoom(roomId);
}

// ── 멤버 ─────────────────────────────────────────────────────
async function loadMembers() {
  const { data } = await sb.from('room_members')
    .select('user:profiles(id, username, avatar_url)')
    .eq('room_id', curRoomId);

  const mems = data || [];
  memberSet = new Set(mems.map(m => m.user?.id));

  $('room-cur').textContent    = memberSet.size;
  $('member-count').textContent = memberSet.size;

  $('members-list').innerHTML = mems.map(m => {
    const u = m.user || {};
    const isHost = curRoomData && u.id === curRoomData.host_id;
    return `
      <div class="member-item ${isHost ? 'is-host' : ''}">
        <img class="m-avatar" src="${u.avatar_url || avatar(u.username)}" alt="">
        <span class="m-name">${h(u.username || '?')}</span>
        ${isHost ? '<span class="host-tag">호스트</span>' : ''}
      </div>`;
  }).join('');

  updateJoinBtn();
}

function updateJoinBtn() {
  const btn     = $('btn-join-leave');
  const isMem   = memberSet.has(me?.id);
  const isHost  = curRoomData?.host_id === me?.id;
  const isFull  = memberSet.size >= (curRoomData?.max_players || 0);

  btn.className = 'btn btn-block';
  btn.disabled  = false;

  if (isHost) {
    btn.textContent = '방 닫기';
    btn.classList.add('btn-danger');
    btn.onclick = closeRoomHandler;
  } else if (isMem) {
    btn.textContent = '방 나가기';
    btn.classList.add('btn-danger');
    btn.onclick = leaveRoomHandler;
  } else if (isFull) {
    btn.textContent = '인원 마감';
    btn.classList.add('btn-ghost');
    btn.disabled = true;
  } else {
    btn.textContent = '방 참여하기';
    btn.classList.add('btn-primary');
    btn.onclick = joinRoomHandler;
  }
}

async function joinRoomHandler() {
  const { error } = await sb.from('room_members')
    .insert({ room_id: curRoomId, user_id: me.id });
  if (error) { console.error(error); return; }
  await sysMsg(`${me.username || me.email}님이 참여했습니다.`);
}

async function leaveRoomHandler() {
  await sb.from('room_members')
    .delete().eq('room_id', curRoomId).eq('user_id', me.id);
  await sysMsg(`${me.username || me.email}님이 나갔습니다.`);
  showView('main');
  fetchRooms(curCat);
}

async function closeRoomHandler() {
  if (!confirm('방을 닫으시겠습니까?')) return;
  await sb.from('rooms').update({ status: 'closed' }).eq('id', curRoomId);
  showView('main');
  fetchRooms(curCat);
}

// ── 채팅 ─────────────────────────────────────────────────────
async function loadMessages() {
  const { data } = await sb.from('messages')
    .select('*, user:profiles(username, avatar_url)')
    .eq('room_id', curRoomId)
    .order('created_at', { ascending: true });

  const box = $('chat-messages');
  box.innerHTML = '';
  (data || []).forEach(appendMsg);
  scrollDown();
}

function appendMsg(msg) {
  const box    = $('chat-messages');
  const isSys  = msg.content.startsWith('__sys__');
  const isMine = msg.user_id === me?.id;
  const u      = msg.user || {};
  const time   = new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const av     = u.avatar_url || avatar(u.username);

  const el = document.createElement('div');

  if (isSys) {
    el.className = 'chat-msg system';
    el.innerHTML = `<span class="c-sys">${h(msg.content.replace('__sys__', ''))}</span>`;
  } else {
    el.className = `chat-msg ${isMine ? 'mine' : ''}`;
    el.innerHTML = `
      <img class="c-avatar" src="${av}" alt="">
      <div class="c-body">
        <div class="c-meta">
          <span class="c-name">${h(u.username || '?')}</span>
          <span>${time}</span>
        </div>
        <div class="c-bubble">${h(msg.content)}</div>
      </div>`;
  }
  box.appendChild(el);
}

function scrollDown() {
  const box = $('chat-messages');
  box.scrollTop = box.scrollHeight;
}

async function sysMsg(text) {
  await sb.from('messages').insert({
    room_id: curRoomId, user_id: me.id, content: `__sys__${text}`,
  });
}

$('btn-send').onclick = sendMsg;
$('chat-input').onkeydown = e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
};

async function sendMsg() {
  const input = $('chat-input');
  const text  = input.value.trim();
  if (!text) return;

  if (!memberSet.has(me?.id)) {
    alert('채팅하려면 먼저 방에 참여하세요.');
    return;
  }

  input.value = '';
  await sb.from('messages').insert({
    room_id: curRoomId, user_id: me.id, content: text,
  });
}

// ── 실시간 구독 ──────────────────────────────────────────────
function subscribeRoom(roomId) {
  if (roomChannel) sb.removeChannel(roomChannel);

  roomChannel = sb.channel(`room-${roomId}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'messages',
      filter: `room_id=eq.${roomId}`,
    }, async payload => {
      const { data: msg } = await sb.from('messages')
        .select('*, user:profiles(username, avatar_url)')
        .eq('id', payload.new.id).single();
      if (msg) { appendMsg(msg); scrollDown(); }
    })
    .on('postgres_changes', {
      event: '*', schema: 'public', table: 'room_members',
      filter: `room_id=eq.${roomId}`,
    }, () => loadMembers())
    .subscribe();
}

function subscribeList() {
  if (listChannel) sb.removeChannel(listChannel);

  listChannel = sb.channel('room-list')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' },
      () => { if (!$('view-main').hidden) fetchRooms(curCat); })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'room_members' },
      () => { if (!$('view-main').hidden) fetchRooms(curCat); })
    .subscribe();
}

// ── 뒤로가기 ─────────────────────────────────────────────────
$('btn-back').onclick = () => {
  if (roomChannel) sb.removeChannel(roomChannel);
  showView('main');
  fetchRooms(curCat);
};

// ── 유틸 ─────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function h(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function avatar(name) {
  const n = encodeURIComponent(name || 'U');
  return `https://ui-avatars.com/api/?name=${n}&background=7c6ff7&color=fff&size=64`;
}

// ── 시작 ─────────────────────────────────────────────────────
init();
