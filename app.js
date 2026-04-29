const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- State ---
let currentUser = null;
let currentRoom = null;
let currentFilter = '전체';
let allRooms = [];
let realtimeChannels = [];

// --- DOM refs ---
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const roomScreen = document.getElementById('room-screen');
const googleLoginBtn = document.getElementById('google-login-btn');
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

// --- Auth ---
googleLoginBtn.addEventListener('click', async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: location.origin }
  });
  if (error) alert('로그인 오류: ' + error.message);
});

logoutBtn.addEventListener('click', async () => {
  unsubscribeAll();
  await sb.auth.signOut();
});

async function upsertProfile(user) {
  const { error } = await sb.from('profiles').upsert({
    id: user.id,
    email: user.email,
    display_name: user.user_metadata?.full_name || user.email.split('@')[0],
    avatar_url: user.user_metadata?.avatar_url || null
  }, { onConflict: 'id' });
  if (error) console.error('Profile upsert error:', error);
}

async function onLogin(user) {
  currentUser = user;
  await upsertProfile(user);
  userNameEl.textContent = user.user_metadata?.full_name || user.email;
  showScreen('main');
  loadRooms();
  subscribeRooms();
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
    .select('*, profiles:host_id(display_name)')
    .eq('is_open', true)
    .order('created_at', { ascending: false });

  if (error) { console.error('loadRooms error:', error); return; }

  const rooms = data || [];

  // Fetch member counts separately (more reliable than embedded count)
  if (rooms.length > 0) {
    const { data: members } = await sb
      .from('room_members')
      .select('room_id')
      .in('room_id', rooms.map(r => r.id));

    const counts = {};
    (members || []).forEach(m => { counts[m.room_id] = (counts[m.room_id] || 0) + 1; });
    rooms.forEach(room => { room.member_count = counts[room.id] || 0; });
  }

  allRooms = rooms;
  renderRooms();
}

function renderRooms() {
  const filtered = currentFilter === '전체'
    ? allRooms
    : allRooms.filter(r => r.category === currentFilter);

  if (filtered.length === 0) {
    roomsList.innerHTML = '<div class="empty-state"><p>방이 없습니다. 첫 번째로 방을 만들어보세요!</p></div>';
    return;
  }

  roomsList.innerHTML = filtered.map(room => {
    const count = room.member_count ?? 0;
    const isFull = count >= room.max_players;
    const countClass = isFull ? 'full' : 'current';
    const host = room.profiles?.display_name || '알 수 없음';
    const timeStr = room.scheduled_at
      ? new Date(room.scheduled_at).toLocaleString('ko-KR', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
      : '';
    return `
      <div class="room-card" data-id="${room.id}" data-full="${isFull}">
        <div class="room-card-header">
          <div class="room-card-title">${escHtml(room.title)}</div>
          <div class="room-card-cat">${escHtml(room.category)}</div>
        </div>
        <div class="room-card-game">🎮 ${escHtml(room.game_name)}</div>
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

  const { data: room, error } = await sb.from('rooms').insert({
    title,
    game_name,
    category,
    max_players,
    scheduled_at: scheduled_at || null,
    host_id: currentUser.id,
    is_open: true
  }).select().single();

  submitBtn.disabled = false;
  submitBtn.textContent = '방 만들기';

  if (error) { alert('방 만들기 실패: ' + error.message); return; }

  // Auto-join as host
  await sb.from('room_members').insert({ room_id: room.id, user_id: currentUser.id });

  createModal.classList.add('hidden');
  createRoomForm.reset();
  enterRoom(room);
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

  // Join room
  const { error: joinErr } = await sb.from('room_members')
    .upsert({ room_id: room.id, user_id: currentUser.id }, { onConflict: 'room_id,user_id' });
  if (joinErr) console.error('join error:', joinErr);

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
  await sb.from('room_members').delete()
    .eq('room_id', currentRoom.id)
    .eq('user_id', currentUser.id);
  currentRoom = null;
  unsubscribeAll();
  showScreen('main');
  loadRooms();
  subscribeRooms();
});

// --- Messages ---
async function loadMessages(roomId) {
  const { data, error } = await sb.from('messages')
    .select('*, profiles:user_id(display_name)')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true });

  if (error) { console.error('loadMessages error:', error); return; }
  messagesList.innerHTML = '';
  (data || []).forEach(msg => appendMessage(msg));
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
      const { data: profile } = await sb.from('profiles').select('display_name').eq('id', msg.user_id).single();
      msg.profiles = profile;
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

// --- Util ---
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
