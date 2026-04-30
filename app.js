// --- i18n ---
const TRANSLATIONS = {
  ko: {
    'app.name': '🎲 보드게임 LFG',
    'login.subtitle': '함께 게임할 사람을 찾아보세요',
    'login.google': 'Google로 로그인',
    'login.discord': 'Discord로 로그인',
    'nick.title': '닉네임 설정',
    'nick.subtitle': '사용할 닉네임을 입력해주세요 (2~16자)',
    'nick.placeholder': '닉네임을 입력하세요',
    'nick.err.length': '닉네임은 2~16자로 입력해주세요.',
    'nick.err.dup': '이미 사용 중인 닉네임이에요.',
    'nick.err.save': '저장에 실패했어요. 다시 시도해주세요.',
    'nick.changed': '닉네임이 변경됐어요!',
    'main.rooms': '방 목록',
    'main.create': '+ 방 만들기',
    'filter.all': '전체', 'filter.private': '개인소유', 'filter.cafe': '보드게임방',
    'filter.tabletop': '테이블탑 시뮬레이터', 'filter.bga': 'BGA', 'filter.steam': '스팀게임',
    'room.empty': '방이 없습니다. 첫 번째로 방을 만들어보세요!',
    'room.mine': '참여 중', 'room.unit': ' 명',
    'cat.private': '개인소유', 'cat.cafe': '보드게임방', 'cat.tabletop': '테이블탑 시뮬레이터',
    'cat.bga': 'BGA', 'cat.steam': '스팀게임',
    'btn.logout': '로그아웃', 'btn.send': '전송', 'btn.search': '검색', 'btn.more': '더 보기',
    'btn.back': '← 목록', 'btn.profile-back': '← 뒤로', 'btn.leave': '나가기',
    'btn.edit': '변경', 'btn.save': '저장', 'btn.cancel': '취소', 'btn.done': '완료',
    'btn.dm': '💬 DM', 'btn.remove': '삭제', 'btn.accept': '수락', 'btn.reject': '거절',
    'btn.add-friend': '친구 추가', 'btn.requested': '요청됨',
    'btn.create-room': '방 만들기', 'btn.creating': '생성 중...',
    'settings.title': '설정', 'settings.sound': '알림음',
    'settings.notif.join': '🚪 방 입장 알림', 'settings.notif.leave': '🚶 방 퇴장 알림',
    'settings.notif.chat': '💬 방 채팅 알림', 'settings.notif.dm': '✉️ DM 알림',
    'settings.detail': '세부 알림 설정',
    'settings.notif.chat-in-room': '💬 방 채팅 중 알림',
    'settings.notif.chat-in-list': '📋 방 목록 중 알림',
    'settings.notif.dm-in-dm': '✉️ DM 채팅 중 알림',
    'settings.lang': '언어', 'settings.lang.label': '표시 언어', 'lang.auto': '자동 감지',
    'title.friends': '친구', 'title.dm': '메시지', 'title.settings': '설정', 'title.theme': '테마 변경',
    'friends.title': '친구', 'friends.tab.list': '친구 목록',
    'friends.tab.requests': '받은 요청', 'friends.tab.search': '유저 검색',
    'friends.empty': '아직 친구가 없어요.<br>유저 검색 탭에서 친구를 추가해보세요!',
    'friends.requests.empty': '받은 친구 요청이 없어요.',
    'friends.search.placeholder': '닉네임으로 검색',
    'friends.search.loading': '검색 중...', 'friends.search.empty': '검색 결과가 없어요.',
    'dm.list.title': '메시지',
    'dm.list.empty': '아직 대화가 없어요.<br>친구 목록에서 DM을 시작해보세요!',
    'dm.list.loading': '로딩 중...', 'dm.mine.prefix': '나: ',
    'dm.input.placeholder': '메시지를 입력하세요...',
    'place.title': '장소 검색', 'place.placeholder': '장소명으로 검색',
    'place.searching': '검색 중...', 'place.empty': '검색 결과가 없습니다',
    'place.fail': '⚠️ 검색 실패. 다시 시도해주세요.',
    'create.title': '방 만들기', 'create.category': '카테고리', 'create.cat.select': '선택하세요',
    'create.cat.private': '개인소유', 'create.cat.cafe': '보드게임방',
    'create.cat.tabletop': '테이블탑 시뮬레이터', 'create.cat.bga': 'BGA', 'create.cat.steam': '스팀게임',
    'create.location': '장소', 'create.location.placeholder': '장소명으로 검색 (예: 레드버튼)',
    'create.game': '게임 이름', 'create.game.placeholder': '예: 카탄, 스플렌더...',
    'create.room-title': '방 제목', 'create.room-title.placeholder': '방 제목을 입력하세요',
    'create.max-players': '최대 인원', 'create.scheduled': '예정 시간',
    'create.err.input': '모든 항목을 입력해주세요.', 'create.err.fail': '방 만들기 실패: ',
    'profile.title': '내 프로필', 'profile.nickname': '닉네임', 'profile.new-nick': '새 닉네임',
    'profile.email': '이메일', 'profile.provider': '로그인 방식', 'profile.created': '가입일',
    'chat.placeholder': '메시지를 입력하세요...',
    'room.leave.err': '나가기 실패: ', 'login.err': '로그인 오류: ', 'friend.req.err': '친구 요청 실패: ',
    'unknown': '알 수 없음', 'time.yesterday': '어제', 'time.days-ago': '%s일 전',
    'members.title': '참여 인원', 'title.members': '참여 인원',
  },
  en: {
    'app.name': '🎲 Board Game LFG',
    'login.subtitle': 'Find people to play with',
    'login.google': 'Log in with Google',
    'login.discord': 'Log in with Discord',
    'nick.title': 'Set Nickname',
    'nick.subtitle': 'Enter a nickname to use (2–16 characters)',
    'nick.placeholder': 'Enter your nickname',
    'nick.err.length': 'Nickname must be 2–16 characters.',
    'nick.err.dup': 'This nickname is already taken.',
    'nick.err.save': 'Failed to save. Please try again.',
    'nick.changed': 'Nickname updated!',
    'main.rooms': 'Room List',
    'main.create': '+ Create Room',
    'filter.all': 'All', 'filter.private': 'Private', 'filter.cafe': 'BG Café',
    'filter.tabletop': 'Tabletop Sim', 'filter.bga': 'BGA', 'filter.steam': 'Steam',
    'room.empty': 'No rooms found. Be the first to create one!',
    'room.mine': 'Joined', 'room.unit': ' players',
    'cat.private': 'Private', 'cat.cafe': 'BG Café', 'cat.tabletop': 'Tabletop Sim',
    'cat.bga': 'BGA', 'cat.steam': 'Steam',
    'btn.logout': 'Logout', 'btn.send': 'Send', 'btn.search': 'Search', 'btn.more': 'Load More',
    'btn.back': '← List', 'btn.profile-back': '← Back', 'btn.leave': 'Leave',
    'btn.edit': 'Edit', 'btn.save': 'Save', 'btn.cancel': 'Cancel', 'btn.done': 'Done',
    'btn.dm': '💬 DM', 'btn.remove': 'Remove', 'btn.accept': 'Accept', 'btn.reject': 'Decline',
    'btn.add-friend': 'Add Friend', 'btn.requested': 'Requested',
    'btn.create-room': 'Create Room', 'btn.creating': 'Creating...',
    'settings.title': 'Settings', 'settings.sound': 'Sound Notifications',
    'settings.notif.join': '🚪 Room Join Alert', 'settings.notif.leave': '🚶 Room Leave Alert',
    'settings.notif.chat': '💬 Room Chat Alert', 'settings.notif.dm': '✉️ DM Alert',
    'settings.detail': 'Detailed Notifications',
    'settings.notif.chat-in-room': '💬 Alert while in room',
    'settings.notif.chat-in-list': '📋 Alert while in list',
    'settings.notif.dm-in-dm': '✉️ Alert while in DM',
    'settings.lang': 'Language', 'settings.lang.label': 'Display Language', 'lang.auto': 'Auto Detect',
    'title.friends': 'Friends', 'title.dm': 'Messages', 'title.settings': 'Settings', 'title.theme': 'Toggle Theme',
    'friends.title': 'Friends', 'friends.tab.list': 'Friends',
    'friends.tab.requests': 'Requests', 'friends.tab.search': 'Search Users',
    'friends.empty': 'No friends yet.<br>Search for users to add friends!',
    'friends.requests.empty': 'No pending friend requests.',
    'friends.search.placeholder': 'Search by nickname',
    'friends.search.loading': 'Searching...', 'friends.search.empty': 'No results found.',
    'dm.list.title': 'Messages',
    'dm.list.empty': 'No conversations yet.<br>Start a DM from your friends list!',
    'dm.list.loading': 'Loading...', 'dm.mine.prefix': 'Me: ',
    'dm.input.placeholder': 'Type a message...',
    'place.title': 'Place Search', 'place.placeholder': 'Search by place name',
    'place.searching': 'Searching...', 'place.empty': 'No results found',
    'place.fail': '⚠️ Search failed. Please try again.',
    'create.title': 'Create Room', 'create.category': 'Category', 'create.cat.select': 'Select',
    'create.cat.private': 'Private', 'create.cat.cafe': 'BG Café',
    'create.cat.tabletop': 'Tabletop Sim', 'create.cat.bga': 'BGA', 'create.cat.steam': 'Steam',
    'create.location': 'Location', 'create.location.placeholder': 'Search for a location',
    'create.game': 'Game Name', 'create.game.placeholder': 'e.g. Catan, Splendor...',
    'create.room-title': 'Room Title', 'create.room-title.placeholder': 'Enter room title',
    'create.max-players': 'Max Players', 'create.scheduled': 'Scheduled Time',
    'create.err.input': 'Please fill in all fields.', 'create.err.fail': 'Failed to create room: ',
    'profile.title': 'My Profile', 'profile.nickname': 'Nickname', 'profile.new-nick': 'New Nickname',
    'profile.email': 'Email', 'profile.provider': 'Login Method', 'profile.created': 'Joined',
    'chat.placeholder': 'Type a message...',
    'room.leave.err': 'Failed to leave: ', 'login.err': 'Login error: ', 'friend.req.err': 'Friend request failed: ',
    'unknown': 'Unknown', 'time.yesterday': 'Yesterday', 'time.days-ago': '%s days ago',
    'members.title': 'Members', 'title.members': 'Members',
  },
};

function detectLang() {
  return (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

let currentLang = detectLang();

function t(key) {
  return TRANSLATIONS[currentLang]?.[key] ?? TRANSLATIONS.ko[key] ?? key;
}

const CAT_KEY = {
  '개인소유': 'cat.private', '보드게임방': 'cat.cafe',
  '테이블탑 시뮬레이터': 'cat.tabletop', 'BGA': 'cat.bga', '스팀게임': 'cat.steam',
};
function tCat(cat) { return t(CAT_KEY[cat]) || cat; }
function currentLocale() { return currentLang === 'ko' ? 'ko-KR' : 'en-US'; }

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  currentLang = (!lang || lang === 'auto' || !TRANSLATIONS[lang]) ? detectLang() : lang;
  applyI18n();
  if (typeof mainScreen !== 'undefined' && !mainScreen.classList.contains('hidden')) renderRooms();
}

async function saveLang(lang) {
  localStorage.setItem('lang', lang);
  setLang(lang);
  if (currentUser) {
    await sb.from('profiles').update({ lang }).eq('id', currentUser.id);
  }
}

const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- State ---
const USER_ICON_SVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#4a8fe8" fill-opacity="0.15"/><circle cx="16" cy="12" r="5" fill="#4a8fe8"/><path d="M7 28c0-4.97 4.03-9 9-9s9 4.03 9 9H7z" fill="#4a8fe8"/></svg>`;

let currentUser = null;
let currentRoom = null;
let currentFilter = '전체';
let allRooms = [];
let myRoomIds = new Set();
let realtimeChannels = [];
let currentNickname = '';
let dmUnreadMap = {};
let globalDMChannel = null;
let chatNotifChannel = null;
let participatingRoomId = null;
let roomUnreadMap = {};
let currentRoomMembers = [];

// --- DOM refs ---
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const roomScreen = document.getElementById('room-screen');
const profileScreen = document.getElementById('profile-screen');
const nicknameScreen = document.getElementById('nickname-screen');
const googleLoginBtn = document.getElementById('google-login-btn');
const discordLoginBtn = document.getElementById('discord-login-btn');
const userNameBtn = document.getElementById('user-name');
const profileBackBtn = document.getElementById('profile-back-btn');
const logoutBtn = document.getElementById('logout-btn');

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
  [loginScreen, mainScreen, roomScreen, profileScreen, nicknameScreen].forEach(s => s.classList.add('hidden'));
  if (name === 'login') loginScreen.classList.remove('hidden');
  if (name === 'main') mainScreen.classList.remove('hidden');
  if (name === 'room') roomScreen.classList.remove('hidden');
  if (name === 'profile') profileScreen.classList.remove('hidden');
  if (name === 'nickname') nicknameScreen.classList.remove('hidden');
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

// 초기 언어 적용 (로그인 전)
applyI18n();

// --- Auth ---
googleLoginBtn.addEventListener('click', async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: location.origin }
  });
  if (error) alert(t('login.err') + error.message);
});

discordLoginBtn.addEventListener('click', async () => {
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'discord',
    options: { redirectTo: location.origin }
  });
  if (error) alert(t('login.err') + error.message);
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
  if (currentUser?.id === user.id) return;
  currentUser = user;
  unsubscribeAll();
  await upsertProfile(user);

  const { data: profile } = await sb.from('profiles').select('nickname, lang').eq('id', user.id).single();

  const savedLang = profile?.lang || localStorage.getItem('lang') || 'auto';
  localStorage.setItem('lang', savedLang);
  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.value = savedLang;
  setLang(savedLang);

  if (profile?.nickname) {
    currentNickname = profile.nickname;
    goToMain();
  } else {
    showScreen('nickname');
  }
}

function goToMain() {
  userNameBtn.textContent = currentNickname || currentUser.user_metadata?.full_name || currentUser.email;
  showScreen('main');
  loadRooms();
  subscribeRooms();
  loadFriends();
  subscribeFriends();
  initDMUnread();
  subscribeGlobalDM();
  resumeRoomSubscription();
  initRoomUnread();
}

async function resumeRoomSubscription() {
  if (participatingRoomId) return; // 이미 구독 중
  const { data } = await sb.from('room_members')
    .select('room_id')
    .eq('user_id', currentUser.id)
    .limit(1)
    .maybeSingle();
  if (data?.room_id) {
    participatingRoomId = data.room_id;
    subscribeChatNotif(data.room_id);
  }
}

function onLogout() {
  currentUser = null;
  currentRoom = null;
  participatingRoomId = null;
  dmUnreadMap = {};
  roomUnreadMap = {};
  if (globalDMChannel) { sb.removeChannel(globalDMChannel); globalDMChannel = null; }
  if (chatNotifChannel) { sb.removeChannel(chatNotifChannel); chatNotifChannel = null; }
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
        ? sb.from('profiles').select('id, nickname, display_name, email').in('id', hostIds)
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
        profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || t('unknown');
      });
      rooms.forEach(room => { room.host_name = profileMap[room.host_id] || '알 수 없음'; });
    }
  }

  allRooms = rooms;
  renderRooms();
}

const CAT_CLASS = {
  '보드게임방': 'cat-boardgame',
  '개인소유': 'cat-private',
  '테이블탑 시뮬레이터': 'cat-tabletop',
  'BGA': 'cat-bga',
  '스팀게임': 'cat-steam',
};

function renderRooms() {
  let filtered = currentFilter === '전체'
    ? allRooms
    : allRooms.filter(r => r.category === currentFilter);

  // member_count가 명확히 0인 방만 숨김 (undefined면 표시)
  filtered = filtered.filter(r => r.member_count === undefined || r.member_count > 0);

  if (filtered.length === 0) {
    roomsList.innerHTML = `<div class="empty-state"><p>${t('room.empty')}</p></div>`;
    return;
  }

  roomsList.innerHTML = filtered.map(room => {
    const count = room.member_count ?? 0;
    const isFull = count >= room.max_players;
    const countClass = isFull ? 'full' : 'current';
    const host = room.host_name || t('unknown');
    const isMine = myRoomIds.has(room.id);
    const unread = roomUnreadMap[room.id] || 0;
    const timeStr = room.scheduled_at
      ? new Date(room.scheduled_at).toLocaleString(currentLocale(), { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
      : '';
    return `
      <div class="room-card${isMine ? ' my-room' : ''}" data-id="${room.id}">
        <div class="room-card-header">
          <div class="room-card-title">${escHtml(room.title)}</div>
          <div style="display:flex;gap:6px;align-items:center">
            ${isMine ? `<span class="badge-mine">${t('room.mine')}</span>` : ''}
            ${unread > 0 ? `<span class="room-unread-badge">${unread}</span>` : ''}
            <div class="room-card-cat ${CAT_CLASS[room.category] || ''}">${escHtml(tCat(room.category))}</div>
          </div>
        </div>
        <div class="room-card-game">🎮 ${escHtml(room.game_name)}</div>
        ${room.location ? `<div class="room-card-location">📍 ${escHtml(room.location)}</div>` : ''}
        <div class="room-card-footer">
          <div class="room-card-count">
            <span class="${countClass}">${count}</span> / ${room.max_players}${t('room.unit')}
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
    placeSearchResults.innerHTML = `<div class="location-result-item"><div class="location-result-name">${t('place.searching')}</div></div>`;
    placeSearchMoreWrap.classList.add('hidden');
  }

  try {
    if (currentLang === 'ko') {
      // 한국어 유저: 카카오 로컬 API
      const res = await fetch(`https://board-game-lfg-kakao.dota87654.workers.dev?query=${encodeURIComponent(placeCurrentQuery)}&page=${placeCurrentPage}`);
      const json = await res.json();

      if (reset) placeSearchResults.innerHTML = '';

      if (!json.documents?.length && reset) {
        placeSearchResults.innerHTML = `<div class="location-result-item"><div class="location-result-name">${t('place.empty')}</div></div>`;
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
    } else {
      // 비한국어 유저: OpenStreetMap Nominatim (무료, 전세계)
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(placeCurrentQuery)}&format=json&limit=10&addressdetails=1&accept-language=${currentLang}&email=dota87654@gmail.com`
      );
      const json = await res.json();

      if (reset) placeSearchResults.innerHTML = '';

      if (!json.length && reset) {
        placeSearchResults.innerHTML = `<div class="location-result-item"><div class="location-result-name">${t('place.empty')}</div></div>`;
        return;
      }

      json.forEach(place => {
        const parts = place.display_name.split(', ');
        const placeName = parts[0];
        const address = parts.slice(1).join(', ');
        const item = document.createElement('div');
        item.className = 'location-result-item';
        item.innerHTML = `
          <div class="location-result-name">${escHtml(placeName)}</div>
          <div class="location-result-addr">${escHtml(address)}</div>
        `;
        item.addEventListener('click', () => {
          locationSearchInput.value = placeName;
          selectLocation(placeName, address);
        });
        placeSearchResults.appendChild(item);
      });

      // Nominatim은 페이지네이션 없음
      placeSearchMoreWrap.classList.add('hidden');
    }
  } catch (e) {
    if (reset) placeSearchResults.innerHTML = `<div class="location-result-item"><div class="location-result-name">${t('place.fail')}</div></div>`;
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

// --- Game name autocomplete ---
const gameNameInput = document.getElementById('game-name-input');
const gameNameDropdown = document.getElementById('game-name-dropdown');
let gameSearchTimer = null;

gameNameInput.addEventListener('input', () => {
  clearTimeout(gameSearchTimer);
  const q = gameNameInput.value.trim();
  if (!q) { gameNameDropdown.classList.add('hidden'); return; }
  gameSearchTimer = setTimeout(() => searchGames(q), 200);
});

gameNameInput.addEventListener('blur', () => {
  setTimeout(() => gameNameDropdown.classList.add('hidden'), 150);
});

async function searchGames(query) {
  const { data } = await sb.from('boardgames')
    .select('name_ko, name_en')
    .or(`name_ko.ilike.%${query}%,name_en.ilike.%${query}%`)
    .limit(10);

  if (!data?.length) { gameNameDropdown.classList.add('hidden'); return; }

  gameNameDropdown.innerHTML = '';
  data.forEach(game => {
    const ko = game.name_ko || '';
    const en = game.name_en || '';
    const item = document.createElement('div');
    item.className = 'game-dropdown-item';
    item.innerHTML = `
      <div class="game-dropdown-ko">${escHtml(ko || en)}</div>
      ${ko && en ? `<div class="game-dropdown-en">${escHtml(en)}</div>` : ''}
    `;
    item.addEventListener('mousedown', () => {
      gameNameInput.value = ko || en;
      gameNameDropdown.classList.add('hidden');
    });
    gameNameDropdown.appendChild(item);
  });
  gameNameDropdown.classList.remove('hidden');
}

createRoomForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!currentUser) return;

  const fd = new FormData(createRoomForm);
  const title = fd.get('title')?.trim();
  const game_name = fd.get('game_name')?.trim();
  const category = fd.get('category');
  const max_players = parseInt(fd.get('max_players'));
  const scheduled_at = fd.get('scheduled_at') || null;

  if (!title || !game_name || !category) { alert(t('create.err.input')); return; }

  const submitBtn = createRoomForm.querySelector('[type=submit]');
  submitBtn.disabled = true;
  submitBtn.textContent = t('btn.creating');

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
  submitBtn.textContent = t('btn.create-room');

  if (error) { alert(t('create.err.fail') + error.message); return; }

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
    ? ' · ⏰ ' + new Date(room.scheduled_at).toLocaleString(currentLocale(), { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })
    : '';
  roomMetaEl.textContent = `🎮 ${room.game_name} · ${room.category}${timeStr}`;

  showScreen('room');
  messagesList.innerHTML = '';

  // 이전 참여 방 기록 (위임 처리용)
  const prevRoomId = (participatingRoomId && participatingRoomId !== room.id) ? participatingRoomId : null;

  if (prevRoomId) {
    const prevRoom = allRooms.find(r => r.id === prevRoomId);
    const prevRemaining = await fetchRemainingMembers(prevRoomId);

    // 방장 위임: room_members 삭제 전에 실행 (RLS)
    if (prevRoom?.host_id === currentUser.id && prevRemaining?.length) {
      const newHostId = prevRemaining[0].user_id;
      await sb.from('rooms').update({ host_id: newHostId }).eq('id', prevRoomId);
      allRooms = allRooms.map(r => r.id === prevRoomId ? { ...r, host_id: newHostId } : r);
    }

    await sb.from('room_members').delete()
      .eq('user_id', currentUser.id)
      .neq('room_id', room.id);

    if (!prevRemaining?.length) {
      await sb.from('rooms').delete().eq('id', prevRoomId);
      allRooms = allRooms.filter(r => r.id !== prevRoomId);
    }
  } else {
    await sb.from('room_members').delete()
      .eq('user_id', currentUser.id)
      .neq('room_id', room.id);
  }

  // 현재 방 참여 (이미 있으면 무시 — upsert로 409 방지)
  await sb.from('room_members')
    .upsert({ room_id: room.id, user_id: currentUser.id }, { onConflict: 'room_id,user_id', ignoreDuplicates: true });

  participatingRoomId = room.id;
  clearRoomUnread(room.id);
  document.getElementById('members-panel').classList.remove('open');
  await loadMessages(room.id);
  await updateMemberCount(room.id);
  loadRoomMembers(room.id);
  subscribeChat(room.id);
  subscribeMembers(room.id);
  subscribeChatNotif(room.id);
}

// 목록 버튼: 방 유지하고 목록으로만 이동
backBtn.addEventListener('click', () => {
  if (participatingRoomId) clearRoomUnread(participatingRoomId);
  currentRoom = null;
  currentRoomMembers = [];
  document.getElementById('members-panel').classList.remove('open');
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

  const remaining = await fetchRemainingMembers(roomId);

  if (chatNotifChannel) { sb.removeChannel(chatNotifChannel); chatNotifChannel = null; }
  unsubscribeAll();

  // 방장 위임: room_members 삭제 전에 실행 (삭제 후엔 RLS로 UPDATE 권한 없을 수 있음)
  if (currentRoom.host_id === currentUser.id && remaining?.length) {
    const newHostId = remaining[0].user_id;
    const { data: updated, error: updateErr } = await sb.from('rooms')
      .update({ host_id: newHostId })
      .eq('id', roomId)
      .select('host_id')
      .maybeSingle();
    if (updateErr || !updated) {
      alert(`방장 위임 실패 (RLS 문제일 수 있음)\n\n아래 SQL을 Supabase SQL Editor에서 실행해주세요:\n\nDROP POLICY IF EXISTS "Enable update for users based on user_id" ON rooms;\nCREATE POLICY "host can update room" ON rooms\nFOR UPDATE USING (auth.uid() = host_id);`);
      subscribeRooms();
      return;
    }
    const { data: newHostProfile } = await sb.from('profiles')
      .select('nickname, display_name, email')
      .eq('id', newHostId)
      .maybeSingle();
    const newHostName = newHostProfile?.nickname || newHostProfile?.display_name || newHostProfile?.email?.split('@')[0] || '알 수 없음';
    allRooms = allRooms.map(r => r.id === roomId ? { ...r, host_id: newHostId, host_name: newHostName } : r);
  }

  const { error: delErr } = await sb.from('room_members').delete()
    .eq('room_id', roomId)
    .eq('user_id', currentUser.id);

  if (delErr) {
    console.error('leave error:', delErr);
    alert(t('room.leave.err') + delErr.message);
    subscribeRooms();
    return;
  }

  allRooms = allRooms.map(r => {
    if (r.id === roomId) return { ...r, member_count: Math.max(0, (r.member_count || 1) - 1) };
    return r;
  });
  myRoomIds.delete(roomId);

  // 남은 멤버 없으면 방 삭제 (host_id가 아직 본인 → RLS 통과)
  if (!remaining?.length) {
    await sb.from('rooms').delete().eq('id', roomId);
    allRooms = allRooms.filter(r => r.id !== roomId);
  }

  currentRoom = null;
  participatingRoomId = null;
  currentRoomMembers = [];
  roomUnreadMap = {};
  document.getElementById('members-panel').classList.remove('open');
  showScreen('main');
  renderRooms();
  await loadRooms();
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
    const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', userIds);
    const profileMap = {};
    (profiles || []).forEach(p => {
      profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || t('unknown');
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

// --- Member list panel ---
async function loadRoomMembers(roomId) {
  const { data } = await sb.from('room_members')
    .select('user_id, joined_at')
    .eq('room_id', roomId)
    .order('joined_at', { ascending: true });
  if (!data?.length) { currentRoomMembers = []; renderMembersPanel(); return; }
  const userIds = data.map(m => m.user_id);
  const { data: profiles } = await sb.from('profiles')
    .select('id, nickname, display_name, email')
    .in('id', userIds);
  const profileMap = {};
  (profiles || []).forEach(p => {
    profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || t('unknown');
  });
  currentRoomMembers = data.map(m => ({
    user_id: m.user_id,
    nickname: profileMap[m.user_id] || t('unknown'),
  }));
  renderMembersPanel();
}

function renderMembersPanel() {
  const body = document.getElementById('members-panel-body');
  if (!body) return;
  body.innerHTML = currentRoomMembers.map(m => {
    const isHost = m.user_id === currentRoom?.host_id;
    return `
      <div class="member-item">
        ${USER_ICON_SVG}
        <span class="member-name">${isHost ? '👑 ' : ''}${escHtml(m.nickname)}</span>
      </div>
    `;
  }).join('');
}

// --- Member count ---
async function updateMemberCount(roomId) {
  const { count, error } = await sb.from('room_members')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId);

  if (!error && currentRoom?.id === roomId) {
    const max = currentRoom.max_players;
    roomMembersInfo.textContent = `👥 ${count} / ${max}${t('room.unit')}`;
  }
}

// --- Realtime ---
function subscribeRooms() {
  const ch = sb.channel('rooms-list')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rooms' }, () => loadRooms())
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'rooms' }, () => loadRooms())
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms' }, async payload => {
      const updated = payload.new;
      if (!updated) { loadRooms(); return; }
      const local = allRooms.find(r => r.id === updated.id);
      if (local && local.host_id !== updated.host_id) {
        const { data: p } = await sb.from('profiles')
          .select('nickname, display_name, email')
          .eq('id', updated.host_id)
          .maybeSingle();
        const hostName = p?.nickname || p?.display_name || p?.email?.split('@')[0] || '알 수 없음';
        allRooms = allRooms.map(r =>
          r.id === updated.id ? { ...r, host_id: updated.host_id, host_name: hostName } : r
        );
        renderRooms();
      } else {
        loadRooms();
      }
    })
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
      if (isNotifOn('chat_in_room')) playChat();
      const { data: profile } = await sb.from('profiles').select('nickname, display_name, email').eq('id', msg.user_id).single();
      msg.profiles = { display_name: profile?.nickname || profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음' };
      appendMessage(msg);
      scrollToBottom();
    })
    .subscribe();
  realtimeChannels.push(ch);
}

function subscribeMembers(roomId) {
  const ch = sb.channel(`members-${roomId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'room_members',
      filter: `room_id=eq.${roomId}`
    }, payload => {
      if (payload.new?.user_id !== currentUser.id) playJoin();
      updateMemberCount(roomId);
      loadRoomMembers(roomId);
    })
    .on('postgres_changes', {
      event: 'DELETE',
      schema: 'public',
      table: 'room_members',
      filter: `room_id=eq.${roomId}`
    }, () => {
      playLeave();
      updateMemberCount(roomId);
      loadRoomMembers(roomId);
    })
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'rooms',
      filter: `id=eq.${roomId}`
    }, payload => {
      if (payload.new?.host_id && currentRoom) {
        currentRoom = { ...currentRoom, host_id: payload.new.host_id };
        renderMembersPanel();
      }
    })
    .subscribe();
  realtimeChannels.push(ch);
}

function subscribeChatNotif(roomId) {
  if (chatNotifChannel) sb.removeChannel(chatNotifChannel);
  chatNotifChannel = sb.channel(`chat-notif-${roomId}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `room_id=eq.${roomId}`
    }, payload => {
      const msg = payload.new;
      if (!msg || msg.user_id === currentUser.id) return;
      if (!roomScreen.classList.contains('hidden')) return; // 방 화면이면 subscribeChat이 처리
      if (isNotifOn('chat_in_list')) playChat();
      roomUnreadMap[roomId] = (roomUnreadMap[roomId] || 0) + 1;
      renderRooms();
    })
    .subscribe();
}

async function initRoomUnread() {
  const { data: member } = await sb.from('room_members')
    .select('room_id')
    .eq('user_id', currentUser.id)
    .limit(1)
    .maybeSingle();

  if (!member?.room_id) return;
  const roomId = member.room_id;

  const { data: read } = await sb.from('room_reads')
    .select('last_read_at')
    .eq('user_id', currentUser.id)
    .eq('room_id', roomId)
    .maybeSingle();

  let query = sb.from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId)
    .neq('user_id', currentUser.id);

  if (read?.last_read_at) query = query.gt('created_at', read.last_read_at);

  const { count } = await query;
  if (count > 0) {
    roomUnreadMap[roomId] = count;
    renderRooms();
  }
}

async function fetchRemainingMembers(roomId) {
  // joined_at 기준 정렬 시도, 컬럼 없으면 순서 무관하게 재조회
  let { data, error } = await sb.from('room_members')
    .select('user_id')
    .eq('room_id', roomId)
    .neq('user_id', currentUser.id)
    .order('joined_at', { ascending: true })
    .limit(1);
  if (error) {
    ({ data } = await sb.from('room_members')
      .select('user_id')
      .eq('room_id', roomId)
      .neq('user_id', currentUser.id)
      .limit(1));
  }
  return data;
}

async function clearRoomUnread(roomId) {
  delete roomUnreadMap[roomId];
  sb.from('room_reads').upsert({
    user_id: currentUser.id,
    room_id: roomId,
    last_read_at: new Date().toISOString()
  }, { onConflict: 'user_id,room_id' }).then(({ error }) => {
    if (error) console.error('clearRoomUnread error:', error);
  });
}

function unsubscribeAll() {
  realtimeChannels.forEach(ch => sb.removeChannel(ch));
  realtimeChannels = [];
}

// --- Notifications (Web Audio API) ---
const NOTIF_DEFAULTS = { join: true, leave: true, chat: true, dm: true, chat_in_room: true, chat_in_list: true, dm_in_dm: true };
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function getNotifSettings() {
  try { return { ...NOTIF_DEFAULTS, ...JSON.parse(localStorage.getItem('notif_settings') || '{}') }; }
  catch { return { ...NOTIF_DEFAULTS }; }
}

function isNotifOn(key) { return getNotifSettings()[key]; }

function tone(ctx, freq, type, t, duration, vol = 0.25) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
  osc.start(t);
  osc.stop(t + duration);
}

// 입장: C5→E5 밝은 상승 2음
function playJoin() {
  if (!isNotifOn('join')) return;
  const ctx = getAudioCtx(), t = ctx.currentTime;
  tone(ctx, 523, 'sine', t, 0.25, 0.25);
  tone(ctx, 659, 'sine', t + 0.13, 0.25, 0.25);
}

// 퇴장: E5→A4 낮아지는 2음
function playLeave() {
  if (!isNotifOn('leave')) return;
  const ctx = getAudioCtx(), t = ctx.currentTime;
  tone(ctx, 659, 'sine', t, 0.25, 0.15);
  tone(ctx, 440, 'sine', t + 0.13, 0.3, 0.15);
}

// 채팅: 짧고 가벼운 1음 틱
function playChat() {
  if (!isNotifOn('chat')) return;
  tone(getAudioCtx(), 1000, 'sine', getAudioCtx().currentTime, 0.12, 0.15);
}

// DM: triangle 2연타 (G5→C6)
function playDM() {
  if (!isNotifOn('dm')) return;
  const ctx = getAudioCtx(), t = ctx.currentTime;
  tone(ctx, 784, 'triangle', t, 0.1, 0.3);
  tone(ctx, 1047, 'triangle', t + 0.1, 0.15, 0.3);
}

// --- Settings modal ---
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const notifToggles = {
  join: document.getElementById('notif-join'),
  leave: document.getElementById('notif-leave'),
  chat: document.getElementById('notif-chat'),
  dm: document.getElementById('notif-dm'),
  chat_in_room: document.getElementById('notif-chat-in-room'),
  chat_in_list: document.getElementById('notif-chat-in-list'),
  dm_in_dm: document.getElementById('notif-dm-in-dm'),
};

function openSettings() {
  const s = getNotifSettings();
  Object.entries(notifToggles).forEach(([k, el]) => { el.checked = s[k]; });
  document.getElementById('lang-select').value = localStorage.getItem('lang') || 'auto';
  settingsModal.classList.remove('hidden');
}

Object.entries(notifToggles).forEach(([key, el]) => {
  el.addEventListener('change', () => {
    const s = getNotifSettings();
    s[key] = el.checked;
    localStorage.setItem('notif_settings', JSON.stringify(s));
  });
});

document.getElementById('settings-btn').addEventListener('click', openSettings);
document.getElementById('settings-btn-room').addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
settingsModal.addEventListener('click', e => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });

document.getElementById('lang-select').addEventListener('change', e => saveLang(e.target.value));

// --- Members panel ---
document.getElementById('members-panel-btn').addEventListener('click', () => {
  document.getElementById('members-panel').classList.toggle('open');
});
document.getElementById('close-members-btn').addEventListener('click', () => {
  document.getElementById('members-panel').classList.remove('open');
});

// --- Nickname setup screen ---
const nicknameInput = document.getElementById('nickname-input');
const nicknameSubmitBtn = document.getElementById('nickname-submit-btn');
const nicknameMsg = document.getElementById('nickname-msg');

nicknameSubmitBtn.addEventListener('click', submitNickname);
nicknameInput.addEventListener('keydown', e => { if (e.key === 'Enter') submitNickname(); });

async function submitNickname() {
  const nick = nicknameInput.value.trim();
  if (nick.length < 2 || nick.length > 16) {
    setNicknameMsg(nicknameMsg, t('nick.err.length'), 'error');
    return;
  }
  nicknameSubmitBtn.disabled = true;
  const ok = await saveNickname(nick, nicknameMsg);
  nicknameSubmitBtn.disabled = false;
  if (ok) {
    currentNickname = nick;
    goToMain();
  }
}

async function saveNickname(nick, msgEl) {
  const { data: dup } = await sb.from('profiles').select('id').eq('nickname', nick).neq('id', currentUser.id).maybeSingle();
  if (dup) {
    setNicknameMsg(msgEl, t('nick.err.dup'), 'error');
    return false;
  }
  const { error } = await sb.from('profiles').update({ nickname: nick }).eq('id', currentUser.id);
  if (error) {
    setNicknameMsg(msgEl, t('nick.err.save'), 'error');
    return false;
  }
  return true;
}

function setNicknameMsg(el, text, type) {
  el.textContent = text;
  el.className = `nickname-msg ${type}`;
}

// --- Profile ---
userNameBtn.addEventListener('click', () => {
  renderProfile();
  showScreen('profile');
});

profileBackBtn.addEventListener('click', () => showScreen('main'));

function renderProfile() {
  const u = currentUser;
  const meta = u.user_metadata || {};
  const provider = u.app_metadata?.provider || '';

  const avatarEl = document.getElementById('profile-avatar');
  avatarEl.src = meta.avatar_url || '';
  avatarEl.onerror = () => { avatarEl.src = ''; avatarEl.style.background = 'var(--surface2)'; };

  document.getElementById('profile-nickname').textContent = currentNickname || '-';
  document.getElementById('profile-email').textContent = u.email || '-';

  const providerMap = { google: '🔵 Google', discord: '🟣 Discord' };
  document.getElementById('profile-provider').textContent = providerMap[provider] || provider || '-';

  const joined = u.created_at ? new Date(u.created_at).toLocaleDateString(currentLocale(), { year: 'numeric', month: 'long', day: 'numeric' }) : '-';
  document.getElementById('profile-created').textContent = joined;

  // 편집 행 초기화
  document.getElementById('profile-nickname-edit-row').classList.add('hidden');
  document.getElementById('profile-nickname-row').classList.remove('hidden');
  const profileNicknameMsg = document.getElementById('profile-nickname-msg');
  profileNicknameMsg.textContent = '';
  profileNicknameMsg.className = 'nickname-msg';
}

// 프로필 닉네임 변경
const nicknameEditBtn = document.getElementById('nickname-edit-btn');
const nicknameEditRow = document.getElementById('profile-nickname-edit-row');
const profileNicknameInput = document.getElementById('profile-nickname-input');
const nicknameSaveBtn = document.getElementById('nickname-save-btn');
const nicknameCancelBtn = document.getElementById('nickname-cancel-btn');
const profileNicknameMsg = document.getElementById('profile-nickname-msg');

nicknameEditBtn.addEventListener('click', () => {
  profileNicknameInput.value = currentNickname;
  document.getElementById('profile-nickname-row').classList.add('hidden');
  nicknameEditRow.classList.remove('hidden');
  profileNicknameMsg.textContent = '';
  profileNicknameInput.focus();
});

nicknameCancelBtn.addEventListener('click', () => {
  nicknameEditRow.classList.add('hidden');
  document.getElementById('profile-nickname-row').classList.remove('hidden');
  profileNicknameMsg.textContent = '';
});

nicknameSaveBtn.addEventListener('click', saveProfileNickname);
profileNicknameInput.addEventListener('keydown', e => { if (e.key === 'Enter') saveProfileNickname(); });

async function saveProfileNickname() {
  const nick = profileNicknameInput.value.trim();
  if (nick.length < 2 || nick.length > 16) {
    setNicknameMsg(profileNicknameMsg, t('nick.err.length'), 'error');
    return;
  }
  if (nick === currentNickname) {
    nicknameCancelBtn.click();
    return;
  }
  nicknameSaveBtn.disabled = true;
  const ok = await saveNickname(nick, profileNicknameMsg);
  nicknameSaveBtn.disabled = false;
  if (ok) {
    currentNickname = nick;
    userNameBtn.textContent = nick;
    document.getElementById('profile-nickname').textContent = nick;
    setNicknameMsg(profileNicknameMsg, t('nick.changed'), 'success');
    nicknameEditRow.classList.add('hidden');
    document.getElementById('profile-nickname-row').classList.remove('hidden');
  }
}

// --- DM Notifications ---
const dmBtn = document.getElementById('dm-btn');
const dmBadge = document.getElementById('dm-badge');
const dmListModal = document.getElementById('dm-list-modal');
const dmListBody = document.getElementById('dm-list-body');
const closeDmListBtn = document.getElementById('close-dm-list-btn');

dmBtn.addEventListener('click', openDMList);
closeDmListBtn.addEventListener('click', () => dmListModal.classList.add('hidden'));
dmListModal.addEventListener('click', e => { if (e.target === dmListModal) dmListModal.classList.add('hidden'); });

async function fetchDMReadMap() {
  const { data } = await sb.from('dm_reads')
    .select('partner_id, last_read_at')
    .eq('user_id', currentUser.id);
  const map = {};
  (data || []).forEach(r => { map[r.partner_id] = r.last_read_at; });
  return map;
}

async function setLastRead(friendId) {
  await sb.from('dm_reads').upsert({
    user_id: currentUser.id,
    partner_id: friendId,
    last_read_at: new Date().toISOString()
  }, { onConflict: 'user_id,partner_id' });
}

function updateDMBadge() {
  const total = Object.values(dmUnreadMap).reduce((a, b) => a + b, 0);
  if (total > 0) {
    dmBadge.textContent = total > 99 ? '99+' : total;
    dmBadge.classList.remove('hidden');
  } else {
    dmBadge.classList.add('hidden');
  }
}

async function initDMUnread() {
  const [lastReadMap, msgsRes] = await Promise.all([
    fetchDMReadMap(),
    sb.from('dm_messages')
      .select('sender_id, created_at')
      .eq('receiver_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(300)
  ]);

  dmUnreadMap = {};
  (msgsRes.data || []).forEach(msg => {
    const lastRead = lastReadMap[msg.sender_id];
    if (!lastRead || new Date(msg.created_at) > new Date(lastRead)) {
      dmUnreadMap[msg.sender_id] = (dmUnreadMap[msg.sender_id] || 0) + 1;
    }
  });
  updateDMBadge();
}

function subscribeGlobalDM() {
  if (globalDMChannel) sb.removeChannel(globalDMChannel);
  globalDMChannel = sb.channel(`global-dm-${currentUser.id}`)
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'dm_messages',
      filter: `receiver_id=eq.${currentUser.id}`
    }, payload => {
      const msg = payload.new;
      if (!msg) return;
      if (dmFriendId === msg.sender_id) return; // 이미 열린 대화
      dmUnreadMap[msg.sender_id] = (dmUnreadMap[msg.sender_id] || 0) + 1;
      updateDMBadge();
      playDM();
    })
    .subscribe();
}

async function openDMList() {
  dmListModal.classList.remove('hidden');
  dmListBody.innerHTML = `<div class="empty-friends">${t('dm.list.loading')}</div>`;

  const { data } = await sb.from('dm_messages')
    .select('id, sender_id, receiver_id, content, created_at')
    .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
    .order('created_at', { ascending: false })
    .limit(300);

  if (!data?.length) {
    dmListBody.innerHTML = `<div class="empty-friends">${t('dm.list.empty')}</div>`;
    return;
  }

  const convMap = {};
  data.forEach(msg => {
    const partnerId = msg.sender_id === currentUser.id ? msg.receiver_id : msg.sender_id;
    if (!convMap[partnerId]) convMap[partnerId] = msg;
  });

  const partnerIds = Object.keys(convMap);
  const { data: profiles } = await sb.from('profiles')
    .select('id, nickname, display_name, email')
    .in('id', partnerIds);

  const profileMap = {};
  (profiles || []).forEach(p => {
    profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음';
  });

  const sorted = partnerIds.sort((a, b) =>
    new Date(convMap[b].created_at) - new Date(convMap[a].created_at)
  );

  dmListBody.innerHTML = '';
  sorted.forEach(partnerId => {
    const msg = convMap[partnerId];
    const name = profileMap[partnerId] || '알 수 없음';
    const unread = dmUnreadMap[partnerId] || 0;
    const time = formatDMTime(msg.created_at);
    const rawPreview = msg.sender_id === currentUser.id ? `${t('dm.mine.prefix')}${msg.content}` : msg.content;
    const preview = rawPreview.length > 32 ? rawPreview.slice(0, 32) + '…' : rawPreview;

    const el = document.createElement('div');
    el.className = 'dm-list-item';
    el.innerHTML = `
      <div class="dm-list-header">
        <span class="dm-list-name">${escHtml(name)}${unread ? `<span class="friends-badge" style="margin-left:6px;">${unread}</span>` : ''}</span>
        <span class="dm-list-time">${time}</span>
      </div>
      <div class="dm-list-preview">${escHtml(preview)}</div>
    `;
    el.addEventListener('click', () => {
      dmListModal.classList.add('hidden');
      openDM(partnerId, name);
    });
    dmListBody.appendChild(el);
  });
}

function formatDMTime(isoStr) {
  const d = new Date(isoStr);
  const now = new Date();
  const diffDays = Math.floor((now - d) / 86400000);
  if (diffDays === 0) return d.toLocaleTimeString(currentLocale(), { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return t('time.yesterday');
  if (diffDays < 7) return t('time.days-ago').replace('%s', diffDays);
  return d.toLocaleDateString(currentLocale(), { month: 'short', day: 'numeric' });
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
    const { data: profiles } = await sb.from('profiles').select('id, display_name, email, nickname').in('id', allIds);
    (profiles || []).forEach(p => { profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });
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
    friendsListBody.innerHTML = `<div class="empty-friends">${t('friends.empty')}</div>`;
    return;
  }
  friendsListBody.innerHTML = '';
  friendsList.forEach(f => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(f.name)}</span>
      <div class="friend-item-actions">
        <button class="btn btn-sm btn-primary" data-dm="${f.friendId}" data-name="${escHtml(f.name)}">${t('btn.dm')}</button>
        <button class="btn btn-sm btn-danger" data-remove="${f.id}">${t('btn.remove')}</button>
      </div>
    `;
    el.querySelector('[data-dm]').addEventListener('click', () => openDM(f.friendId, f.name));
    el.querySelector('[data-remove]').addEventListener('click', () => removeFriend(f.id));
    friendsListBody.appendChild(el);
  });
}

function renderPendingList() {
  if (pendingList.length === 0) {
    friendsRequestsBody.innerHTML = `<div class="empty-friends">${t('friends.requests.empty')}</div>`;
    return;
  }
  friendsRequestsBody.innerHTML = '';
  pendingList.forEach(f => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(f.name)}</span>
      <div class="friend-item-actions">
        <button class="btn btn-sm btn-primary" data-accept="${f.id}">${t('btn.accept')}</button>
        <button class="btn btn-sm btn-danger" data-reject="${f.id}">${t('btn.reject')}</button>
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
  friendSearchBody.innerHTML = `<div class="empty-friends">${t('friends.search.loading')}</div>`;

  const { data } = await sb.from('profiles')
    .select('id, display_name, email, nickname')
    .ilike('nickname', `%${query}%`)
    .neq('id', currentUser.id)
    .limit(20);

  if (!data?.length) {
    friendSearchBody.innerHTML = `<div class="empty-friends">${t('friends.search.empty')}</div>`;
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
    const name = user.nickname || user.display_name || user.email?.split('@')[0] || '알 수 없음';
    const alreadyRelated = existingSet.has(user.id);
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(name)}</span>
      <button class="btn btn-sm ${alreadyRelated ? '' : 'btn-primary'}" ${alreadyRelated ? 'disabled' : ''} data-uid="${user.id}">
        ${alreadyRelated ? t('btn.requested') : t('btn.add-friend')}
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
  if (error) alert(t('friend.req.err') + error.message);
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
  // 읽음 처리
  setLastRead(friendId);
  delete dmUnreadMap[friendId];
  updateDMBadge();
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
    const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', userIds);
    (profiles || []).forEach(p => { profileMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });
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
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'dm_messages',
      filter: `receiver_id=eq.${currentUser.id}`
    }, async payload => {
      const msg = payload.new;
      if (!msg) return;
      if (sentDmIds.has(msg.id)) { sentDmIds.delete(msg.id); return; }
      if (msg.sender_id !== dmFriendId) return;
      if (isNotifOn('dm_in_dm')) playDM();
      const { data: profile } = await sb.from('profiles').select('nickname, display_name, email').eq('id', msg.sender_id).single();
      const name = profile?.nickname || profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음';
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
