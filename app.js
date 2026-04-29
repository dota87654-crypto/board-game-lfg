const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- State ---
let currentUser = null;
let currentRoom = null;
let currentFilter = '전체';
let allRooms = [];
let myRoomIds = new Set(); // 내가 참여 중인 방 ID
let realtimeChannels = [];

// --- DOM refs ---
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const roomScreen = document.getElementById('room-screen');
const googleLoginBtn = document.getElementById('google-login-btn');
const discordLoginBtn = document.getElementById('discord-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userNameEl = document.getElementById('user-name');
const roomsList = document.getElementById('rooms-list');
const openCreateBtn = document.getElementById('open-create-btn');
const closeCreateBtn = document.getElementById('close-create-btn');
const createModal = document.getElementById('create-modal');
const createRoomForm = document.getElementById('create-room-form');
const backBtn = document.getElementById('back-btn');
const roomTitleEl = document.getElementById('room-title');
const roomMetaEl = document.getElementById('room-meta');
const roomMembersInfo = document.getElementById('room-members-info');
const messagesList = document.getElementById('messages-list');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// --- Screen helpers ---
function showScreen(name) {
  [loginScreen, mainScreen, roomScreen].forEach(s => s.classList.add('hidden'));
  if (name === 'login') loginScreen.classList.remove('hidden');
  if (name === 'main') mainScreen.classList.remove('hidden');
  if (name === 'room') roomScreen.classList.remove('hidden');
}

// datetime-local 전체 클릭 시 picker 열기
document.querySelectorAll('input[type="datetime-local"]').forEach(input => {
  input.addEventListener('click', () => {
    if (typeof input.showPicker === 'function') input.showPicker();
  });
});

// --- Theme ---
const themeBtn = document.getElementById('theme-btn');

function applyTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light');
    themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('light');
    themeBtn.textContent = '🌙';
  }
}

// 저장된 테마 적용
applyTheme(localStorage.getItem('theme') || 'dark');

themeBtn.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// --- Auth ---
googleLoginBtn.addEventListener('click', async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: location.origin }
  });
  if (error) alert('로그인 오류: ' + error.message);
});

discordLoginBtn.addEventListener('click', async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'discord',
    options: { redirectTo: location.origin }
  });
  if (error) alert('로그인 오류: ' + error.message);
});

logoutBtn.addEventListener('click', async () => {
  unsubscribeAll();
  await sb.auth.signOut();
});

async function upsertProfile(user) {
  const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
  const { error } = await sb.from('profiles').upsert({
    id: user.id,
    email: user.email,
    display_name: displayName,
    avatar_url: user.user_metadata?.avatar_url || null
  }, { onConflict: 'id', ignoreDuplicates: false });
  if (error) {
    console.error('Profile upsert error:', error.message);
    // display_name 컬럼 없으면 최소 정보만 저장
    if (error.message?.includes('display_name')) {
      await sb.from('profiles').upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true });
    }
  }
}

async function onLogin(user) {
  if (currentUser?.id === user.id) return; // 중복 호출 방지
  currentUser = user;
  unsubscribeAll();
  await upsertProfile(user);
  userNameEl.textContent = user.user_metadata?.full_name || user.email;
  showScreen('main');
  loadRooms();
  subscribeRooms();
  loadFriends();
  subscribeFriends();
}

function onLogout() {
  currentUser = null;
  currentRoom = null;
  unsubscribeAll();
  showScreen('login');
}

// --- Init ---
sb.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    onLogin(session.user);
  } else {
    onLogout();
  }
});

// --- Rooms ---
async function loadRooms() {
  const { data, error } = await sb
    .from('rooms')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error('loadRooms error:', error); return; }

  const rooms = data || [];

  if (rooms.length > 0) {
    const roomIds = rooms.map(r => r.id);
    const hostIds = [...new Set(rooms.map(r => r.host_id).filter(Boolean))];

    const [membersRes, myRes, profilesRes] = await Promise.all([
      sb.from('room_members').select('room_id').in('room_id', roomIds),
      sb.from('room_members').select('room_id').in('room_id', roomIds).eq('user_id', currentUser.id),
      hostIds.length > 0
        ? sb.from('profiles').select('id, display_name, email').in('id', hostIds)
        : Promise.resolve({ data: [], error: null })
    ]);

    // 멤버 수 조회 성공했을 때만 member_count 설정 (실패 시 undefined 유지)
    if (!membersRes.error) {
      const counts = {};
      (membersRes.data || []).forEach(m => { counts[m.room_id] = (counts[m.room_id] || 0) + 1; });
      rooms.forEach(room => { room.member_count = counts[room.id] || 0; });
    } else {
      console.error('member count error:', membersRes.error);
    }

    if (!myRes.error) {
      myRoomIds = new Set((myRes.data || []).map(m => m.room_id));
    }

    if (!profilesRes.error) {
      const profileMap = {};
      (profilesRes.data || []).forEach(p => {
        profileMap[p.id] = p.display_name || p.email?.split('@')[0] || '알 수 없음';
      });
      rooms.forEach(room => { room.host_name = profileMap[room.host_id] || '알 수 없음'; });
    }
  }

  allRooms = rooms;
  renderRooms();
}

function renderRooms() {
  let filtered = currentFilter === '전체'
    ? allRooms
    : allRooms.filter(r => r.category === currentFilter);

  // member_count가 명확히 0인 방만 숨김 (undefined면 표시)
  filtered = filtered.filter(r => r.member_count === undefined || r.member_count > 0);

  if (filtered.length === 0) {
    roomsList.innerHTML = '<div class="empty-state"><p>방이 없습니다. 첫 번째로 방을 만들어보세요!</p></div>';
    return;
  }

  roomsList.innerHTML = filtered.map(room => {
    const count = room.member_count ?? 0;
    const isFull = count >= room.max_players;
    const countClass = isFull ? 'full' : 'current';
    const host = room.host_name || '알 수 없음';
    const isMine = myRoomIds.has(room.id);
    const timeStr = room.scheduled_at
      ? new Date(room.scheduled_at).toLocaleString('ko-KR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
      : '';
    return `
      <div class="room-card${isMine ? ' my-room' : ''}" data-id="${room.id}">
        <div class="room-card-header">
          <div class="room-card-title">${escHtml(room.title)}</div>
          <div style="display:flex;gap:6px;align-items:center">
            ${isMine ? '<span class="badge-mine">참여 중</span>' : ''}
            <div class="room-card-cat">${escHtml(room.category)}</div>
          </div>
        </div>
        <div class="room-card-game">🎮 ${escHtml(room.game_name)}</div>
        ${room.location ? `<div class="room-card-location">📍 ${escHtml(room.location)}</div>` : ''}
        <div class="room-card-footer">
          <div class="room-card-count">
            <span class="${countClass}">${count}</span> / ${room.max_players} 명
          </div>
          <div>
            ${timeStr ? `<div class="room-card-time">⏰ ${timeStr}</div>` : ''}
            <div class="room-card-host">👤 ${escHtml(host)}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  roomsList.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const room = allRooms.find(r => r.id === id);
      if (room) enterRoom(room);
    });
  });
}

// --- Filter ---
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    renderRooms();
  });
});

// --- Create Room ---
const OFFLINE_CATEGORIES = new Set(['보드게임방', '개인소유']);
const categorySelect = document.getElementById('category-select');
const locationField = document.getElementById('location-field');
const locationInput = document.getElementById('location-input');
const locationSearchInput = document.getElementById('location-search-input');
const locationSearchBtn = document.getElementById('location-search-btn');
const locationSelected = document.getElementById('location-selected');
const locationSelectedText = document.getElementById('location-selected-text');
const locationClearBtn = document.getElementById('location-clear-btn');
const placeSearchModal = document.getElementById('place-search-modal');
const closePlaceSearchBtn = document.getElementById('close-place-search-btn');
const placeSearchInput = document.getElementById('place-search-input');
const placeSearchGoBtn = document.getElementById('place-search-go-btn');
const placeSearchResults = document.getElementById('place-search-results');
const placeSearchMoreWrap = document.getElementById('place-search-more-wrap');
const placeSearchMoreBtn = document.getElementById('place-search-more-btn');

let placeCurrentQuery = '';
let placeCurrentPage = 1;
let placeIsEnd = false;

categorySelect.addEventListener('change', () => {
  const isOffline = OFFLINE_CATEGORIES.has(categorySelect.value);
  locationField.classList.toggle('hidden', !isOffline);
  if (!isOffline) clearLocation();
});

function clearLocation() {
  locationInput.value = '';
  locationSearchInput.value = '';
  locationSelected.classList.add('hidden');
}

function selectLocation(name, address) {
  locationInput.value = `${name} (${address})`;
  locationSelectedText.textContent = `📍 ${name}  ${address}`;
  locationSelected.classList.remove('hidden');
  placeSearchModal.classList.add('hidden');
}

locationClearBtn.addEventListener('click', clearLocation);

function openPlaceSearchModal() {
  placeSearchInput.value = locationSearchInput.value;
  placeSearchResults.innerHTML = '';
  placeSearchMoreWrap.classList.add('hidden');
  placeCurrentPage = 1;
  placeIsEnd = false;
  placeSearchModal.classList.remove('hidden');
  placeSearchInput.focus();
  if (placeSearchInput.value.trim()) fetchPlaces(true);
}

async function fetchPlaces(reset) {
  const query = placeSearchInput.value.trim();
  if (!query) return;

  if (reset) {
    placeCurrentQuery = query;
    placeCurrentPage = 1;
    placeSearchResults.innerHTML = '<div class="location-result-item"><div class="location-result-name">검색 중...</div></div>';
    placeSearchMoreWrap.classList.add('hidden');
  }

  try {
    const res = await fetch(`https://board-game-lfg-kakao.dota87654.workers.dev?query=${encodeURIComponent(placeCurrentQuery)}&page=${placeCurrentPage}`);
    const json = await res.json();

    if (reset) placeSearchResults.innerHTML = '';

    if (!json.documents?.length && reset) {
      placeSearchResults.innerHTML = '<div class="location-result-item"><div class="location-result-name">검색 결과가 없습니다</div></div>';
      return;
    }

    json.documents.forEach(place => {
      const item = document.createElement('div');
      item.className = 'location-result-item';
      item.innerHTML = `
        <div class="location-result-name">${escHtml(place.place_name)}</div>
        <div class="location-result-addr">${escHtml(place.road_address_name || place.address_name)}</div>
      `;
      item.addEventListener('click', () => {
        locationSearchInput.value = place.place_name;
        selectLocation(place.place_name, place.road_address_name || place.address_name);
      });
      placeSearchResults.appendChild(item);
    });

    placeIsEnd = json.meta?.is_end ?? true;
    placeSearchMoreWrap.classList.toggle('hidden', placeIsEnd);
    placeCurrentPage++;
  } catch (e) {
    if (reset) placeSearchResults.innerHTML = '<div class="location-result-item"><div class="location-result-name">⚠️ 검색 실패. 다시 시도해주세요.</div></div>';
    console.error('place search error:', e);
  }
}

locationSearchBtn.addEventListener('click', openPlaceSearchModal);
locationSearchInput.addEventListener('click', openPlaceSearchModal);
placeSearchGoBtn.addEventListener('click', () => fetchPlaces(true));
placeSearchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); fetchPlaces(true); } });
placeSearchMoreBtn.addEventListener('click', () => fetchPlaces(false));
closePlaceSearchBtn.addEventListener('click', () => placeSearchModal.classList.add('hidden'));
placeSearchModal.addEventListener('click', e => { if (e.target === placeSearchModal) placeSearchModal.classList.add('hidden'); });

openCreateBtn.addEventListener('click', () => createModal.classList.remove('hidden'));
closeCreateBtn.addEventListener('click', () => createModal.classList.add('hidden'));
createModal.addEventListener('click', e => { if (e.target === createModal) createModal.classList.add('hidden'); });

createRoomForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!currentUser) return;

  const fd = new FormData(createRoomForm);
  const title = fd.get('title')?.trim();
  const game_name = fd.get('game_name')?.trim();
  const category = fd.get('category');
  const max_players = parseInt(fd.get('max_players'));
  const scheduled_at = fd.get('scheduled_at') || null;

  if (!title || !game_name || !category) { alert('모든 항목을 입력해주세요.'); return; }

  const submitBtn = createRoomForm.querySelector('[type=submit]');
  submitBtn.disabled = true;
  submitBtn.textContent = '생성 중...';

  const location = (fd.get('location') || '').trim() || null;

  const { data: room, error } = await sb.from('rooms').insert({
    title,
    game_name,
    category,
    max_players,
    scheduled_at: scheduled_at || null,
    location,
    host_id: currentUser.id,
    is_open: true
  }).select().single();

  submitBtn.disabled = false;
  submitBtn.textContent = '방 만들기';

  if (error) { alert('방 만들기 실패: ' + error.message); return; }

  // allRooms에 즉시 추가 (목록 돌아올 때 바로 보이도록)
  room.member_count = 1;
  room.host_name = currentUser.user_metadata?.full_name || currentUser.email;
  myRoomIds.add(room.id);
  allRooms = [room, ...allRooms];

  createModal.classList.add('hidden');
  createRoomForm.reset();
  enterRoom(room); // enterRoom 내부에서 upsert로 참여 처리
});

// --- Enter Room ---
async function enterRoom(room) {
  currentRoom = room;
  unsubscribeAll();

  roomTitleEl.textContent = room.title;
  const timeStr = room.scheduled_at
    ? ' · ⏰ ' + new Date(room.scheduled_at).toLocaleString('ko-KR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
    : '';
  roomMetaEl.textContent = `🎮 ${room.game_name} · ${room.category}${timeStr}`;

  showScreen('room');
  messagesList.innerHTML = '';

  // 다른 방에 참여 중이면 먼저 모두 나가기
  await sb.from('room_members').delete()
    .eq('user_id', currentUser.id)
    .neq('room_id', room.id);

  // 현재 방 참여 (이미 있으면 무시)
  await sb.from('room_members')
    .insert({ room_id: room.id, user_id: currentUser.id })
    .select()
    .maybeSingle();

  await loadMessages(room.id);
  await updateMemberCount(room.id);
  subscribeChat(room.id);
  subscribeMembers(room.id);
}

// 목록 버튼: 방 유지하고 목록으로만 이동
backBtn.addEventListener('click', () => {
  currentRoom = null;
  unsubscribeAll();
  showScreen('main');
  renderRooms();  // 즉시 현재 목록 표시
  loadRooms();    // DB에서 최신 데이터 갱신
  subscribeRooms();
});

// 나가기 버튼: room_members에서 삭제 후 목록으로
const leaveBtn = document.getElementById('leave-btn');
leaveBtn.addEventListener('click', async () => {
  if (!currentRoom) return;
  const roomId = currentRoom.id;

  const { error: delErr } = await sb.from('room_members').delete()
    .eq('room_id', roomId)
    .eq('user_id', currentUser.id);

  if (delErr) {
    console.error('leave error:', delErr);
    alert('나가기 실패: ' + delErr.message);
    return;
  }

  // 로컬 상태 즉시 반영 (목록에서 바로 숨김)
  allRooms = allRooms.map(r => {
    if (r.id === roomId) return { ...r, member_count: Math.max(0, (r.member_count || 1) - 1) };
    return r;
  });
  myRoomIds.delete(roomId);

  // 남은 인원 확인 후 0명이면 방 삭제
  const { count } = await sb.from('room_members')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId);

  if (count === 0) {
    await sb.from('rooms').delete().eq('id', roomId);
    allRooms = allRooms.filter(r => r.id !== roomId);
  }

  currentRoom = null;
  unsubscribeAll();
  showScreen('main');
  renderRooms();   // 즉시 반영
  loadRooms();     // DB 재확인
  subscribeRooms();
});

// --- Messages ---
async function loadMessages(roomId) {
  const { data, error } = await sb.from('messages')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });

  if (error) { console.error('loadMessages error:', error); return; }

  const msgs = data || [];

  // 메시지 작성자 프로필 별도 조회
  const userIds = [...new Set(msgs.map(m => m.user_id).filter(Boolean))];
  if (userIds.length > 0) {
    const { data: profiles } = await sb.from('profiles').select('id, display_name, email').in('id', userIds);
    const profileMap = {};
    (profiles || []).forEach(p => {
      profileMap[p.id] = p.display_name || p.email?.split('@')[0] || '알 수 없음';
    });
    msgs.forEach(m => { m.profiles = { display_name: profileMap[m.user_id] || '알 수 없음' }; });
  }

  messagesList.innerHTML = '';
  msgs.forEach(msg => appendMessage(msg));
  scrollToBottom();
}

function appendMessage(msg) {
  const isMine = msg.user_id === currentUser?.id;
  const name = msg.profiles?.display_name || '알 수 없음';
  const time = new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  if (msg.type === 'system') {
    const el = document.createElement('div');
    el.className = 'system-message';
    el.textContent = msg.content;
    messagesList.appendChild(el);
    return;
  }

  const el = document.createElement('div');
  el.className = `message ${isMine ? 'mine' : 'theirs'}`;
  el.innerHTML = `
    ${!isMine ? `<div class="message-author">${escHtml(name)}</div>` : ''}
    <div class="message-bubble">${escHtml(msg.content)}</div>
    <div class="message-time">${time}</div>
  `;
  messagesList.appendChild(el);
}

function scrollToBottom() {
  messagesList.scrollTop = messagesList.scrollHeight;
}

// --- Send message ---
const sentMessageIds = new Set();

async function sendMessage() {
  const content = chatInput.value.trim();
  if (!content || !currentRoom) return;
  chatInput.value = '';

  // Optimistic: render immediately
  const tempMsg = {
    id: `temp-${Date.now()}`,
    user_id: currentUser.id,
    content,
    type: 'text',
    created_at: new Date().toISOString(),
    profiles: { display_name: currentUser.user_metadata?.full_name || currentUser.email }
  };
  appendMessage(tempMsg);
  scrollToBottom();

  const { data, error } = await sb.from('messages').insert({
    room_id: currentRoom.id,
    user_id: currentUser.id,
    content,
    type: 'text'
  }).select('id').single();

  if (error) {
    console.error('sendMessage error:', error);
    chatInput.value = content;
  } else if (data?.id) {
    // Mark real ID so realtime event doesn't duplicate it
    sentMessageIds.add(data.id);
  }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

// --- Member count ---
async function updateMemberCount(roomId) {
  const { count, error } = await sb.from('room_members')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId);

  if (!error && currentRoom?.id === roomId) {
    const max = currentRoom.max_players;
    roomMembersInfo.textContent = `👥 ${count} / ${max} 명`;
  }
}

// --- Realtime ---
function subscribeRooms() {
  const ch = sb.channel('rooms-list')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, () => loadRooms())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'room_members' }, () => loadRooms())
    .subscribe();
  realtimeChannels.push(ch);
}

function subscribeChat(roomId) {
  const ch = sb.channel(`room-${roomId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `room_id=eq.${roomId}`
    }, async payload => {
      const msg = payload.new;
      if (!msg) return;
      // Skip messages we already rendered optimistically
      if (sentMessageIds.has(msg.id)) {
        sentMessageIds.delete(msg.id);
        return;
      }
      // Fetch author name for others' messages
      const { data: profile } = await sb.from('profiles').select('display_name, email').eq('id', msg.user_id).single();
      msg.profiles = { display_name: profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음' };
      appendMessage(msg);
      scrollToBottom();
    })
    .subscribe();
  realtimeChannels.push(ch);
}

function subscribeMembers(roomId) {
  const ch = sb.channel(`members-${roomId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'room_members',
      filter: `room_id=eq.${roomId}`
    }, () => updateMemberCount(roomId))
    .subscribe();
  realtimeChannels.push(ch);
}

function unsubscribeAll() {
  realtimeChannels.forEach(ch => sb.removeChannel(ch));
  realtimeChannels = [];
}

// --- Friends ---
let friendsList = [];
let pendingList = [];
let dmFriendId = null;
let dmChannel = null;
const sentDmIds = new Set();

const friendsBtn = document.getElementById('friends-btn');
const friendsBadge = document.getElementById('friends-badge');
const friendsModal = document.getElementById('friends-modal');
const closeFriendsBtn = document.getElementById('close-friends-btn');
const reqCountBadge = document.getElementById('req-count-badge');
const friendsListBody = document.getElementById('friends-list-body');
const friendsRequestsBody = document.getElementById('friends-requests-body');
const friendSearchInput = document.getElementById('friend-search-input');
const friendSearchBtn = document.getElementById('friend-search-btn');
const friendSearchBody = document.getElementById('friend-search-body');
const dmModal = document.getElementById('dm-modal');
const closeDmBtn = document.getElementById('close-dm-btn');
const dmTitle = document.getElementById('dm-title');
const dmMessages = document.getElementById('dm-messages');
const dmInput = document.getElementById('dm-input');
const dmSendBtn = document.getElementById('dm-send-btn');

friendsBtn.addEventListener('click', () => {
  friendsModal.classList.remove('hidden');
  loadFriends();
});
closeFriendsBtn.addEventListener('click', () => friendsModal.classList.add('hidden'));
friendsModal.addEventListener('click', e => { if (e.target === friendsModal) friendsModal.classList.add('hidden'); });

document.querySelectorAll('.friends-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.friends-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.ftab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(`ftab-${tab.dataset.tab}`).classList.remove('hidden');
  });
});

friendSearchBtn.addEventListener('click', searchFriendUsers);
friendSearchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchFriendUsers(); } });

async function loadFriends() {
  const { data, error } = await sb.from('friendships')
    .select('id, requester_id, addressee_id, status')
    .or(`requester_id.eq.${currentUser.id},addressee_id.eq.${currentUser.id}`);

  if (error) return;

  const accepted = (data || []).filter(f => f.status === 'accepted');
  const pending = (data || []).filter(f => f.status === 'pending' && f.addressee_id === currentUser.id);

  const allIds = [...new Set([
    ...accepted.map(f => f.requester_id === currentUser.id ? f.addressee_id : f.requester_id),
    ...pending.map(f => f.requester_id)
  ])];

  const profileMap = {};
  if (allIds.length > 0) {
    const { data: profiles } = await sb.from('profiles').select('id, display_name, email').in('id', allIds);
    (profiles || []).forEach(p => { profileMap[p.id] = p.display_name || p.email?.split('@')[0] || '알 수 없음'; });
  }

  friendsList = accepted.map(f => {
    const fid = f.requester_id === currentUser.id ? f.addressee_id : f.requester_id;
    return { id: f.id, friendId: fid, name: profileMap[fid] || '알 수 없음' };
  });

  pendingList = pending.map(f => ({
    id: f.id, requesterId: f.requester_id, name: profileMap[f.requester_id] || '알 수 없음'
  }));

  if (pendingList.length > 0) {
    friendsBadge.textContent = pendingList.length;
    friendsBadge.classList.remove('hidden');
    reqCountBadge.textContent = pendingList.length;
    reqCountBadge.classList.remove('hidden');
  } else {
    friendsBadge.classList.add('hidden');
    reqCountBadge.classList.add('hidden');
  }

  renderFriendsList();
  renderPendingList();
}

function renderFriendsList() {
  if (friendsList.length === 0) {
    friendsListBody.innerHTML = '<div class="empty-friends">아직 친구가 없어요.<br>유저 검색 탭에서 친구를 추가해보세요!</div>';
    return;
  }
  friendsListBody.innerHTML = '';
  friendsList.forEach(f => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(f.name)}</span>
      <div class="friend-item-actions">
        <button class="btn btn-sm btn-primary" data-dm="${f.friendId}" data-name="${escHtml(f.name)}">💬 DM</button>
        <button class="btn btn-sm btn-danger" data-remove="${f.id}">삭제</button>
      </div>
    `;
    el.querySelector('[data-dm]').addEventListener('click', () => openDM(f.friendId, f.name));
    el.querySelector('[data-remove]').addEventListener('click', () => removeFriend(f.id));
    friendsListBody.appendChild(el);
  });
}

function renderPendingList() {
  if (pendingList.length === 0) {
    friendsRequestsBody.innerHTML = '<div class="empty-friends">받은 친구 요청이 없어요.</div>';
    return;
  }
  friendsRequestsBody.innerHTML = '';
  pendingList.forEach(f => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(f.name)}</span>
      <div class="friend-item-actions">
        <button class="btn btn-sm btn-primary" data-accept="${f.id}">수락</button>
        <button class="btn btn-sm btn-danger" data-reject="${f.id}">거절</button>
      </div>
    `;
    el.querySelector('[data-accept]').addEventListener('click', () => acceptRequest(f.id));
    el.querySelector('[data-reject]').addEventListener('click', () => rejectRequest(f.id));
    friendsRequestsBody.appendChild(el);
  });
}

async function searchFriendUsers() {
  const query = friendSearchInput.value.trim();
  if (!query) return;
  friendSearchBody.innerHTML = '<div class="empty-friends">검색 중...</div>';

  const { data } = await sb.from('profiles')
    .select('id, display_name, email')
    .ilike('display_name', `%${query}%`)
    .neq('id', currentUser.id)
    .limit(20);

  if (!data?.length) {
    friendSearchBody.innerHTML = '<div class="empty-friends">검색 결과가 없어요.</div>';
    return;
  }

  // 이미 친구이거나 요청 보낸 유저 ID 목록
  const { data: existing } = await sb.from('friendships')
    .select('requester_id, addressee_id, status')
    .or(`requester_id.eq.${currentUser.id},addressee_id.eq.${currentUser.id}`);

  const existingSet = new Set();
  (existing || []).forEach(f => {
    existingSet.add(f.requester_id === currentUser.id ? f.addressee_id : f.requester_id);
  });

  friendSearchBody.innerHTML = '';
  data.forEach(user => {
    const name = user.display_name || user.email?.split('@')[0] || '알 수 없음';
    const alreadyRelated = existingSet.has(user.id);
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(name)}</span>
      <button class="btn btn-sm ${alreadyRelated ? '' : 'btn-primary'}" ${alreadyRelated ? 'disabled' : ''} data-uid="${user.id}">
        ${alreadyRelated ? '요청됨' : '친구 추가'}
      </button>
    `;
    if (!alreadyRelated) {
      el.querySelector('button').addEventListener('click', async () => {
        await sendFriendRequest(user.id);
        el.querySelector('button').disabled = true;
        el.querySelector('button').textContent = '요청됨';
      });
    }
    friendSearchBody.appendChild(el);
  });
}

async function sendFriendRequest(addresseeId) {
  const { error } = await sb.from('friendships').insert({ requester_id: currentUser.id, addressee_id: addresseeId });
  if (error) alert('친구 요청 실패: ' + error.message);
}

async function acceptRequest(id) {
  await sb.from('friendships').update({ status: 'accepted' }).eq('id', id);
  await loadFriends();
}

async function rejectRequest(id) {
  await sb.from('friendships').delete().eq('id', id);
  await loadFriends();
}

async function removeFriend(id) {
  await sb.from('friendships').delete().eq('id', id);
  await loadFriends();
}

function subscribeFriends() {
  const ch = sb.channel('friendships-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'friendships' }, () => loadFriends())
    .subscribe();
  realtimeChannels.push(ch);
}

// --- DM ---
async function openDM(friendId, friendName) {
  dmFriendId = friendId;
  dmTitle.textContent = `💬 ${friendName}`;
  dmMessages.innerHTML = '';
  friendsModal.classList.add('hidden');
  dmModal.classList.remove('hidden');
  await loadDMMessages();
  subscribeDM();
  dmInput.focus();
}

closeDmBtn.addEventListener('click', () => {
  dmModal.classList.add('hidden');
  if (dmChannel) { sb.removeChannel(dmChannel); dmChannel = null; }
  dmFriendId = null;
});
dmModal.addEventListener('click', e => {
  if (e.target === dmModal) closeDmBtn.click();
});

async function loadDMMessages() {
  const { data } = await sb.from('dm_messages')
    .select('id, sender_id, content, created_at')
    .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${dmFriendId}),and(sender_id.eq.${dmFriendId},receiver_id.eq.${currentUser.id})`)
    .order('created_at', { ascending: true })
    .limit(50);

  const userIds = [...new Set((data || []).map(m => m.sender_id))];
  const profileMap = {};
  if (userIds.length > 0) {
    const { data: profiles } = await sb.from('profiles').select('id, display_name, email').in('id', userIds);
    (profiles || []).forEach(p => { profileMap[p.id] = p.display_name || p.email?.split('@')[0] || '알 수 없음'; });
  }

  dmMessages.innerHTML = '';
  (data || []).forEach(msg => appendDMMessage(msg, profileMap[msg.sender_id] || '알 수 없음'));
  dmMessages.scrollTop = dmMessages.scrollHeight;
}

function appendDMMessage(msg, senderName) {
  const isMine = msg.sender_id === currentUser.id;
  const time = new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const el = document.createElement('div');
  el.className = `message ${isMine ? 'mine' : 'theirs'}`;
  el.innerHTML = `
    ${!isMine ? `<div class="message-author">${escHtml(senderName)}</div>` : ''}
    <div class="message-bubble">${escHtml(msg.content)}</div>
    <div class="message-time">${time}</div>
  `;
  dmMessages.appendChild(el);
}

async function sendDMMessage() {
  const content = dmInput.value.trim();
  if (!content || !dmFriendId) return;
  dmInput.value = '';

  const tempMsg = {
    id: `temp-${Date.now()}`,
    sender_id: currentUser.id,
    content,
    created_at: new Date().toISOString()
  };
  appendDMMessage(tempMsg, currentUser.user_metadata?.full_name || currentUser.email);
  dmMessages.scrollTop = dmMessages.scrollHeight;

  const { data, error } = await sb.from('dm_messages').insert({
    sender_id: currentUser.id,
    receiver_id: dmFriendId,
    content
  }).select('id').single();

  if (error) { console.error('DM send error:', error); dmInput.value = content; }
  else if (data?.id) sentDmIds.add(data.id);
}

dmSendBtn.addEventListener('click', sendDMMessage);
dmInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendDMMessage(); } });

function subscribeDM() {
  if (dmChannel) sb.removeChannel(dmChannel);
  dmChannel = sb.channel(`dm-${[currentUser.id, dmFriendId].sort().join('-')}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'dm_messages' }, async payload => {
      const msg = payload.new;
      if (!msg) return;
      if (sentDmIds.has(msg.id)) { sentDmIds.delete(msg.id); return; }
      if (msg.sender_id !== dmFriendId) return;
      const { data: profile } = await sb.from('profiles').select('display_name, email').eq('id', msg.sender_id).single();
      const name = profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음';
      appendDMMessage(msg, name);
      dmMessages.scrollTop = dmMessages.scrollHeight;
    })
    .subscribe();
}

// --- Util ---
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
