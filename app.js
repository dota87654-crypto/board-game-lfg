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
    'nick.err.profanity': '사용할 수 없는 닉네임입니다.',
    'nick.err.save': '저장에 실패했어요. 다시 시도해주세요.',
    'nick.changed': '닉네임이 변경됐어요!',
    'main.rooms': '방 목록',
    'main.create': '+ 방 만들기',
    'filter.all': '전체', 'filter.private': '개인소유', 'filter.cafe': '보드게임방',
    'filter.tabletop': '테이블탑 시뮬레이터', 'filter.bga': 'BGA', 'filter.steam': '스팀게임',
    'room.empty': '방이 없습니다. 첫 번째로 방을 만들어보세요!',
    'room.search.placeholder': '방 제목, 게임, 방장으로 검색...',
    'room.search.empty': '검색 결과가 없습니다.',
    'room.mine': '참여 중', 'room.unit': ' 명',
    'cat.private': '개인소유', 'cat.cafe': '보드게임방', 'cat.tabletop': '테이블탑 시뮬레이터',
    'cat.bga': 'BGA', 'cat.steam': '스팀게임',
    'btn.logout': '로그아웃', 'btn.send': '전송', 'btn.search': '검색', 'btn.more': '더 보기',
    'btn.back': '← 목록', 'btn.profile-back': '← 뒤로', 'btn.leave': '나가기',
    'btn.edit': '변경', 'btn.save': '저장', 'btn.cancel': '취소', 'btn.done': '완료',
    'btn.dm': '💬 DM', 'btn.remove': '삭제', 'btn.accept': '수락', 'btn.reject': '거절',
    'btn.block': '차단',
    'confirm.remove-friend': '정말로 친구를 삭제하시겠습니까?',
    'confirm.block-friend': '정말로 차단하시겠습니까?\n차단하면 친구 관계도 삭제됩니다.',
    'btn.add-friend': '친구 추가', 'btn.requested': '요청됨', 'btn.friends': '친구',
    'btn.create-room': '방 만들기', 'btn.creating': '생성 중...',
    'settings.title': '설정',
    'settings.tab.audio': '🔊 오디오', 'settings.tab.general': '⚙️ 일반', 'settings.tab.block': '🚫 차단',
    'settings.notif.vol': '전체 알림 볼륨',
    'settings.notif.room-group': '[방]', 'settings.notif.dm-group': '[DM]', 'settings.notif.friend-group': '[친구]',
    'settings.notif.join': '🚪 방 입장 알림', 'settings.notif.leave': '🚶 방 퇴장 알림',
    'settings.notif.chat': '💬 방 채팅 알림 (목록)', 'settings.notif.dm': '✉️ DM 알림',
    'settings.notif.chat-in-room': '💬 방 채팅 알림 (방 안)',
    'settings.notif.dm-in-dm': '✉️ DM 채팅 중 알림',
    'settings.notif.friend-req': '👤 친구 요청 알림',
    'settings.theme': '테마', 'settings.theme.label': '다크 모드',
    'settings.filter': '채팅 필터', 'settings.filter.profanity': '🤬 욕설 필터',
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
    'dm.list.search.placeholder': '닉네임 검색...',
    'dm.list.search.empty': '일치하는 대화가 없어요.',
    'dm.list.loading': '로딩 중...', 'dm.mine.prefix': '나: ',
    'dm.input.placeholder': '메시지를 입력하세요...',
    'place.title': '장소 검색', 'place.placeholder': '장소명으로 검색',
    'place.searching': '검색 중...', 'place.empty': '검색 결과가 없습니다',
    'place.fail': '⚠️ 검색 실패. 다시 시도해주세요.',
    'create.title': '방 만들기', 'create.category': '카테고리', 'create.cat.select': '선택하세요',
    'create.password': '비밀번호', 'create.password.optional': '(선택사항)',
    'create.password.placeholder': '숫자만, 최대 8자리',
    'create.password.invalid': '비밀번호는 숫자만 입력 가능합니다.',
    'room.password.title': '🔒 비밀번호 입력',
    'room.password.placeholder': '숫자를 입력하세요',
    'room.password.wrong': '비밀번호가 틀렸습니다.',
    'btn.enter': '입장',
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
    'ctx.add-friend': '친구 추가', 'ctx.dm': 'DM 보내기',
    'ctx.kick': '강퇴', 'ctx.block': '차단', 'ctx.unblock': '차단 해제',
    'ctx.dm.pin': '고정', 'ctx.dm.unpin': '고정 해제', 'ctx.dm.delete': '대화 삭제',
    'dm.delete.confirm': '정말로 삭제하시겠습니까?', 'dm.delete.ok': '삭제', 'btn.cancel': '취소', 'btn.delete': '삭제',
    'kick.notice': '방에서 강퇴되었습니다.', 'block.dm.err': '차단한 유저에게는 DM을 보낼 수 없어요.',
    'block.recv.err': '메시지를 보낼 수 없습니다.', 'block.friend.err': '친구 요청을 보낼 수 없어요.',
    'settings.blocked': '차단 목록', 'settings.blocked.empty': '차단한 유저가 없어요.',
    'settings.blocked.view': '차단 목록 보기',
    'ban.notice': '강퇴된 방이라 다시 입장할 수 없어요.',
    'entry.limit.exceeded': '오늘 이 방 입장 횟수를 초과했습니다 (최대 3회)',
    'entry.limit.title': '입장 제한',
    'btn.invite': '초대', 'title.invite': '친구 초대',
    'invite.sent': '%s님에게 초대를 보냈어요!', 'invite.already': '이미 초대한 유저예요.',
    'invite.err': '초대 전송에 실패했어요.',
    'invite.toast': '%i님이 [%r]에 초대했어요',
    'notice.placeholder': '공지 내용을 입력하세요...',
    'notice.edit.title': '방 공지 수정',
    'notice.delete.confirm': '공지를 삭제하시겠습니까?',
    'btn.notice.write': '공지 작성',
    'btn.notice.edit': '수정',
    'btn.notice.delete': '삭제',
    'invite.link.btn': '🔗 링크 복사',
    'invite.link.copied': '초대 링크가 클립보드에 복사됐어요!',
    'invite.link.invalid': '유효하지 않은 초대 링크예요.',
    'invite.link.full': '방이 가득 찼어요. 입장할 수 없어요.',
    'create.tags': '태그', 'create.tags.optional': '(선택사항, 다중 선택 가능)',
    'filter.tag.all': '태그 전체',
    'avatar.type.error': '이미지 파일만 업로드 가능합니다 (jpg, png, gif, webp)',
    'avatar.size.error': '파일 크기는 최대 2MB까지 가능합니다',
    'avatar.upload.error': '업로드에 실패했습니다. 다시 시도해 주세요.',
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
    'nick.err.profanity': 'This nickname is not allowed.',
    'nick.err.save': 'Failed to save. Please try again.',
    'nick.changed': 'Nickname updated!',
    'main.rooms': 'Room List',
    'main.create': '+ Create Room',
    'filter.all': 'All', 'filter.private': 'Private', 'filter.cafe': 'BG Café',
    'filter.tabletop': 'Tabletop Sim', 'filter.bga': 'BGA', 'filter.steam': 'Steam',
    'room.empty': 'No rooms found. Be the first to create one!',
    'room.search.placeholder': 'Search by title, game, or host...',
    'room.search.empty': 'No results found.',
    'room.mine': 'Joined', 'room.unit': ' players',
    'cat.private': 'Private', 'cat.cafe': 'BG Café', 'cat.tabletop': 'Tabletop Sim',
    'cat.bga': 'BGA', 'cat.steam': 'Steam',
    'btn.logout': 'Logout', 'btn.send': 'Send', 'btn.search': 'Search', 'btn.more': 'Load More',
    'btn.back': '← List', 'btn.profile-back': '← Back', 'btn.leave': 'Leave',
    'btn.edit': 'Edit', 'btn.save': 'Save', 'btn.cancel': 'Cancel', 'btn.done': 'Done',
    'btn.dm': '💬 DM', 'btn.remove': 'Remove', 'btn.accept': 'Accept', 'btn.reject': 'Decline',
    'btn.block': 'Block',
    'confirm.remove-friend': 'Are you sure you want to remove this friend?',
    'confirm.block-friend': 'Are you sure you want to block this user?\nThis will also remove the friendship.',
    'btn.add-friend': 'Add Friend', 'btn.requested': 'Requested', 'btn.friends': 'Friends',
    'btn.create-room': 'Create Room', 'btn.creating': 'Creating...',
    'settings.title': 'Settings',
    'settings.tab.audio': '🔊 Audio', 'settings.tab.general': '⚙️ General', 'settings.tab.block': '🚫 Block',
    'settings.notif.vol': 'Master Volume',
    'settings.notif.room-group': '[Room]', 'settings.notif.dm-group': '[DM]', 'settings.notif.friend-group': '[Friends]',
    'settings.notif.join': '🚪 Room Join Alert', 'settings.notif.leave': '🚶 Room Leave Alert',
    'settings.notif.chat': '💬 Room Chat Alert (List)', 'settings.notif.dm': '✉️ DM Alert',
    'settings.notif.chat-in-room': '💬 Room Chat Alert (In Room)',
    'settings.notif.dm-in-dm': '✉️ Alert while in DM',
    'settings.notif.friend-req': '👤 Friend Request Alert',
    'settings.theme': 'Theme', 'settings.theme.label': 'Dark Mode',
    'settings.filter': 'Chat Filter', 'settings.filter.profanity': '🤬 Profanity Filter',
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
    'dm.list.search.placeholder': 'Search nickname...',
    'dm.list.search.empty': 'No matching conversations.',
    'dm.list.loading': 'Loading...', 'dm.mine.prefix': 'Me: ',
    'dm.input.placeholder': 'Type a message...',
    'place.title': 'Place Search', 'place.placeholder': 'Search by place name',
    'place.searching': 'Searching...', 'place.empty': 'No results found',
    'place.fail': '⚠️ Search failed. Please try again.',
    'create.title': 'Create Room', 'create.category': 'Category', 'create.cat.select': 'Select',
    'create.password': 'Password', 'create.password.optional': '(optional)',
    'create.password.placeholder': 'Numbers only, max 8 digits',
    'create.password.invalid': 'Password must contain numbers only.',
    'room.password.title': '🔒 Enter Password',
    'room.password.placeholder': 'Enter numbers',
    'room.password.wrong': 'Wrong password.',
    'btn.enter': 'Enter',
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
    'ctx.add-friend': 'Add Friend', 'ctx.dm': 'Send DM',
    'ctx.kick': 'Kick', 'ctx.block': 'Block', 'ctx.unblock': 'Unblock',
    'ctx.dm.pin': 'Pin', 'ctx.dm.unpin': 'Unpin', 'ctx.dm.delete': 'Delete Conversation',
    'dm.delete.confirm': 'Are you sure you want to delete this conversation?', 'dm.delete.ok': 'Delete', 'btn.cancel': 'Cancel', 'btn.delete': 'Delete',
    'kick.notice': 'You have been kicked from the room.', 'block.dm.err': 'Cannot send DM to a blocked user.',
    'block.recv.err': 'Cannot send message.', 'block.friend.err': 'Cannot send friend request.',
    'settings.blocked': 'Blocked Users', 'settings.blocked.empty': 'No blocked users.',
    'settings.blocked.view': 'View Blocked Users',
    'ban.notice': 'You have been banned from this room and cannot re-enter.',
    'entry.limit.exceeded': 'You have exceeded the entry limit for this room today (max 3 times)',
    'entry.limit.title': 'Entry Limit Reached',
    'btn.invite': 'Invite', 'title.invite': 'Invite Friends',
    'invite.sent': 'Invite sent to %s!', 'invite.already': 'Already invited this user.',
    'invite.err': 'Failed to send invite.',
    'invite.toast': '%i invited you to [%r]',
    'notice.placeholder': 'Enter notice content...',
    'notice.edit.title': 'Edit Room Notice',
    'notice.delete.confirm': 'Delete this notice?',
    'btn.notice.write': 'Post Notice',
    'btn.notice.edit': 'Edit',
    'btn.notice.delete': 'Delete',
    'invite.link.btn': '🔗 Copy Link',
    'invite.link.copied': 'Invite link copied to clipboard!',
    'invite.link.invalid': 'This invite link is no longer valid.',
    'invite.link.full': 'The room is full. You cannot join.',
    'create.tags': 'Tags', 'create.tags.optional': '(optional, multi-select)',
    'filter.tag.all': 'All Tags',
    'avatar.type.error': 'Only image files are allowed (jpg, png, gif, webp)',
    'avatar.size.error': 'File size must be 2MB or less',
    'avatar.upload.error': 'Upload failed. Please try again.',
  },
};

// --- Profanity filter ---
const PROFANITY_LIST = [
  // 씨발 계열
  '시발','씨발','씨팔','시팔','쉬발','씌발','씹발','시빨','ㅅㅂ','ㅆㅂ',
  // 병신 계열
  '병신','ㅂㅅ','븅신','뵹신','병싱','뼝신',
  // 보지/자지 계열
  '보지','자지','보쥐','봊','자즤',
  // 새끼 계열
  '개새끼','새끼','개쉐끼','개세끼','개쉑',
  // 기타 한국어
  '섹스','창녀','창년','미친놈','미친년','존나','졸라','좆','찐따','빠구리','개년','썅','썅놈','닥쳐','느금마','니애미','니엄마','꺼져','지랄','년놈',
  // 영어
  'fuck','shit','bitch','asshole','bastard','cunt','dick','pussy','ass','cock','whore','slut','nigger','nigga','faggot','retard',
];
function isProfanityFilterOn() {
  return localStorage.getItem('profanity_filter') === 'true';
}

function filterProfanity(text) {
  if (!isProfanityFilterOn()) return text;
  let result = text;
  for (const word of PROFANITY_LIST) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escaped, 'gi'), '***');
  }
  return result;
}

function normalizeLeet(text) {
  return text.toLowerCase().replace(/\s/g, '')
    .replace(/@/g, 'a').replace(/\$/g, 's').replace(/5/g, 's')
    .replace(/1/g, 'i').replace(/!/g, 'i')
    .replace(/0/g, 'o').replace(/3/g, 'e').replace(/4/g, 'a')
    .replace(/v/g, 'u')
    .replace(/[*_.+]/g, '');
}
function containsProfanity(text) {
  const raw = text.toLowerCase().replace(/\s/g, '');
  const leet = normalizeLeet(text);
  const noDigits = raw.replace(/\d/g, '');
  return PROFANITY_LIST.some(w => raw.includes(w) || leet.includes(w) || noDigits.includes(w));
}

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
function userIconSvg(color) {
  return `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="${color}" fill-opacity="0.15"/><circle cx="16" cy="12" r="5" fill="${color}"/><path d="M7 28c0-4.97 4.03-9 9-9s9 4.03 9 9H7z" fill="${color}"/></svg>`;
}

const ROOM_TAGS = ['온라인', '오프라인', '초보환영', '숙련자', '빠른게임', '긴게임', '친목', '진지하게', '음성채팅', '텍스트만'];

let currentUser = null;
let currentRoom = null;
const currentFilters = new Set(); // 비어있으면 전체
const currentTagFilters = new Set();
let currentSearch = '';
let currentGameChipFilter = null; // ⭐ 칩 클릭으로 설정된 게임명 필터 (소문자)
let gameNameMatches = null; // boardgames 테이블 검색 결과 (소문자 Set), null이면 미사용
let bgSearchId = 0;         // 경쟁 조건 방지용 시퀀스
let allRooms = [];
let myRoomIds = new Set();
let realtimeChannels = [];
let currentNickname = '';
let currentAvatarUrl = '';
let dmUnreadMap = {};
let globalDMChannel = null;
let friendNotifChannel = null;
let chatNotifChannel = null;
let participatingRoomId = null;
let roomUnreadMap = {};
let currentRoomMembers = [];
let blockedSet = new Set();
let blockedList = [];
let dmBlockedByFriend = false;

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

function applyTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  const toggle = document.getElementById('theme-toggle');
  if (toggle) toggle.checked = mode !== 'light';
}

// 저장된 테마 적용
applyTheme(localStorage.getItem('theme') || 'dark');


document.getElementById('theme-toggle').addEventListener('change', e => {
  const next = e.target.checked ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// 초기 언어 적용 (로그인 전)
applyI18n();

// 초대 링크 파라미터 저장 (OAuth 리다이렉트 후에도 처리되도록 localStorage 활용)
(function () {
  const code = new URLSearchParams(location.search).get('invite');
  if (code) {
    localStorage.setItem('pending_invite', code);
    history.replaceState({}, '', location.pathname);
  }
})();

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
  }, { onConflict: 'id', ignoreDuplicates: false });
  if (error) {
    console.error('Profile upsert error:', error.message);
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

  // 처벌 확인
  const now = new Date().toISOString();
  const { data: punish } = await sb.from('punishments')
    .select('type, expires_at')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (punish) {
    if (punish.type === 'suspend' || punish.type === 'permanent_ban') {
      const until = punish.expires_at ? `(${new Date(punish.expires_at).toLocaleDateString('ko-KR')}까지)` : '(영구)';
      alert(`이용이 정지된 계정입니다 ${until}.\n사유가 없다고 생각하시면 문의해주세요.`);
      await sb.auth.signOut();
      return;
    }
    if (punish.type === 'chat_ban') {
      window._chatBanned = true;
      window._chatBanUntil = punish.expires_at;
    }
  }

  const { data: profile } = await sb.from('profiles').select('nickname, lang, avatar_url').eq('id', user.id).single();
  currentAvatarUrl = profile?.avatar_url || '';

  const savedLang = profile?.lang || localStorage.getItem('lang') || 'auto';
  localStorage.setItem('lang', savedLang);
  const langSelect = document.getElementById('lang-select');
  if (langSelect) langSelect.value = savedLang;
  setLang(savedLang);

  if (profile?.nickname) {
    currentNickname = profile.nickname;
    await goToMain();
  } else {
    showScreen('nickname');
  }
}

async function goToMain() {
  userNameBtn.textContent = currentNickname || currentUser.user_metadata?.full_name || currentUser.email;
  showScreen('main');
  renderRoomFavBar();
  await loadFriends();
  loadRooms();
  subscribeRooms();
  subscribeFriends();
  subscribeFriendNotif();
  initDMUnread();
  subscribeGlobalDM();
  resumeRoomSubscription();
  subscribeNotifications();
  initRoomUnread();
  loadBlocks();
  subscribeInvites();
  loadPendingInvites();
  handlePendingInvite();
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
  blockedSet = new Set();
  currentRoomMembers = [];
  if (globalDMChannel) { sb.removeChannel(globalDMChannel); globalDMChannel = null; }
  if (friendNotifChannel) { sb.removeChannel(friendNotifChannel); friendNotifChannel = null; }
  if (chatNotifChannel) { sb.removeChannel(chatNotifChannel); chatNotifChannel = null; }
  unsubscribeAll();
  showScreen('login');
}

// --- Init ---
sb.auth.onAuthStateChange((event, session) => {
  if (session?.user) {
    onLogin(session.user);
  } else if (event === 'SIGNED_OUT') {
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

  // password_hash가 DB에서 누락된 경우(스키마 캐시 지연) 기존 로컬 값으로 보완
  allRooms = rooms.map(r => {
    const prev = allRooms.find(p => p.id === r.id);
    return r.password_hash == null && prev?.password_hash ? { ...r, password_hash: prev.password_hash } : r;
  });
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
  let filtered = allRooms;
  if (currentFilters.size > 0) {
    const hasLocked = currentFilters.has('__locked__');
    const cats = new Set([...currentFilters].filter(c => c !== '__locked__'));
    filtered = allRooms.filter(r =>
      (hasLocked ? r.password_hash : false) ||
      (cats.size > 0 ? cats.has(r.category) : false)
    );
  }

  // member_count가 명확히 0인 방만 숨김 (undefined면 표시)
  filtered = filtered.filter(r => r.member_count === undefined || r.member_count > 0);

  if (currentGameChipFilter) {
    filtered = filtered.filter(r => r.game_name?.toLowerCase() === currentGameChipFilter);
  } else if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(r =>
      r.title?.toLowerCase().includes(q) ||
      (r.host_name || '').toLowerCase().includes(q) ||
      r.game_name?.toLowerCase().includes(q) ||
      (gameNameMatches !== null && gameNameMatches.has(r.game_name?.toLowerCase()))
    );
  }

  if (currentTagFilters.size > 0) {
    filtered = filtered.filter(r =>
      Array.isArray(r.tags) && [...currentTagFilters].every(tag => r.tags.includes(tag))
    );
  }

  // 참여 중인 방 최상단 고정
  filtered = [...filtered].sort((a, b) => {
    const am = myRoomIds.has(a.id) ? 0 : 1;
    const bm = myRoomIds.has(b.id) ? 0 : 1;
    return am - bm;
  });

  if (filtered.length === 0) {
    roomsList.innerHTML = `<div class="empty-state"><p>${(currentSearch || currentGameChipFilter) ? t('room.search.empty') : t('room.empty')}</p></div>`;
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
          <div class="room-card-title">${room.password_hash ? '🔒 ' : ''}${escHtml(room.title)}</div>
          <div style="display:flex;gap:6px;align-items:center">
            ${isMine ? `<span class="badge-mine">${t('room.mine')}</span>` : ''}
            ${unread > 0 ? `<span class="room-unread-badge">${unread}</span>` : ''}
            <div class="room-card-cat ${CAT_CLASS[room.category] || ''}">${escHtml(tCat(room.category))}</div>
          </div>
        </div>
        <div class="room-card-game">🎮 ${escHtml(room.game_name)}</div>
        ${room.location ? `<div class="room-card-location">📍 ${escHtml(room.location)}</div>` : ''}
        ${room.tags?.length ? `<div class="room-card-tags">${room.tags.map(tag => `<span class="room-tag">${escHtml(tag)}</span>`).join('')}</div>` : ''}
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
    card.addEventListener('click', async () => {
      const id = card.dataset.id;
      const room = allRooms.find(r => r.id === id);
      if (room) await tryEnterRoom(room);
    });
  });
}

// --- Filter & Search ---
function updateFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(b => {
    if (b.dataset.cat === '전체') b.classList.toggle('active', currentFilters.size === 0);
    else b.classList.toggle('active', currentFilters.has(b.dataset.cat));
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.dataset.cat;
    if (cat === '전체') {
      currentFilters.clear();
    } else {
      if (currentFilters.has(cat)) currentFilters.delete(cat);
      else currentFilters.add(cat);
    }
    updateFilterBtns();
    renderRooms();
  });
});

let bgSearchTimer = null;
const roomSearchInput = document.getElementById('room-search-input');

roomSearchInput.addEventListener('input', e => {
  currentSearch = e.target.value.trim();
  currentGameChipFilter = null;

  if (!currentSearch) {
    gameNameMatches = null;
    clearTimeout(bgSearchTimer);
    hideRoomSearchDropdown();
    renderRoomFavBar();
    renderRooms();
    return;
  }

  renderRooms();
  renderRoomFavBar(); // 칩 active 해제 반영

  clearTimeout(bgSearchTimer);
  bgSearchTimer = setTimeout(async () => {
    const myId = ++bgSearchId;
    const q = currentSearch;
    const { data } = await sb.from('boardgames')
      .select('name_ko, name_en')
      .or(`name_ko.ilike.%${q}%,name_en.ilike.%${q}%`)
      .limit(20);
    if (myId !== bgSearchId) return;

    renderRoomSearchDropdown(data || []);

    gameNameMatches = new Set();
    (data || []).forEach(g => {
      if (g.name_ko) gameNameMatches.add(g.name_ko.toLowerCase());
      if (g.name_en) gameNameMatches.add(g.name_en.toLowerCase());
    });
    renderRooms();
  }, 100);
});

roomSearchInput.addEventListener('blur', () => {
  setTimeout(hideRoomSearchDropdown, 150);
});

function renderRoomSearchDropdown(games) {
  const dropdown = document.getElementById('room-search-dropdown');
  if (!games.length) { dropdown.classList.add('hidden'); return; }
  const favSet = new Set(getFavoriteGames());
  dropdown.innerHTML = '';
  games.forEach(game => {
    const ko = game.name_ko || '';
    const en = game.name_en || '';
    const name = ko || en;
    if (!name) return;
    const isFav = favSet.has(name);
    const item = document.createElement('div');
    item.className = 'room-search-dropdown-item';
    item.innerHTML = `
      <div class="room-search-game-info">
        <span class="room-search-game-ko">${escHtml(ko || en)}</span>
        ${ko && en ? `<span class="room-search-game-en">${escHtml(en)}</span>` : ''}
      </div>
      <button type="button" class="room-fav-btn${isFav ? ' active' : ''}" title="즐겨찾기">⭐</button>
    `;
    item.querySelector('.room-search-game-info').addEventListener('mousedown', () => {
      roomSearchInput.value = name;
      currentSearch = name;
      currentGameChipFilter = name.toLowerCase();
      gameNameMatches = null;
      hideRoomSearchDropdown();
      renderRooms();
      renderRoomFavBar();
    });
    item.querySelector('.room-fav-btn').addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleRoomFavoriteGame(name, e.currentTarget);
    });
    dropdown.appendChild(item);
  });
  dropdown.classList.remove('hidden');
}

function hideRoomSearchDropdown() {
  document.getElementById('room-search-dropdown').classList.add('hidden');
}

function toggleRoomFavoriteGame(name, btn) {
  let favs = getFavoriteGames();
  if (favs.includes(name)) {
    favs = favs.filter(f => f !== name);
    btn.classList.remove('active');
  } else {
    if (favs.length >= 10) { showSnackbar('즐겨찾기는 최대 10개까지 가능해요.'); return; }
    favs.push(name);
    btn.classList.add('active');
  }
  setFavoriteGames(favs);
  renderRoomFavBar();
  renderFavoriteGames(); // 방 만들기 모달 즐겨찾기 바도 갱신
}

function renderRoomFavBar() {
  const bar = document.getElementById('room-game-fav-bar');
  if (!bar) return;
  const favs = getFavoriteGames();
  if (!favs.length) { bar.innerHTML = ''; return; }
  bar.innerHTML = favs.map(name => {
    const isActive = currentGameChipFilter === name.toLowerCase();
    return `<button type="button" class="room-game-fav-chip${isActive ? ' active' : ''}" data-name="${escHtml(name)}">${escHtml(name)}</button>`;
  }).join('');
}

document.getElementById('room-game-fav-bar').addEventListener('click', e => {
  const chip = e.target.closest('.room-game-fav-chip');
  if (!chip) return;
  const name = chip.dataset.name;
  if (currentGameChipFilter === name.toLowerCase()) {
    currentGameChipFilter = null;
    roomSearchInput.value = '';
    currentSearch = '';
    gameNameMatches = null;
  } else {
    currentGameChipFilter = name.toLowerCase();
    roomSearchInput.value = name;
    currentSearch = name;
    gameNameMatches = null;
  }
  renderRoomFavBar();
  renderRooms();
});

// --- Tag UI ---
function initTagUI() {
  const chipsHtml = ROOM_TAGS.map(tag =>
    `<button type="button" class="tag-chip" data-tag="${tag}">${tag}</button>`
  ).join('');
  const footer = `<div class="tag-dropdown-footer"><button type="button" class="tag-reset-btn">초기화</button></div>`;

  document.getElementById('tag-filter-dropdown').innerHTML =
    `<div class="tag-chips-wrap">${chipsHtml}</div>${footer}`;

  document.getElementById('create-tag-panel').innerHTML =
    `<div class="tag-chips-wrap">${chipsHtml}</div>${footer}`;
}
initTagUI();

function updateTagFilterBtn() {
  const n = currentTagFilters.size;
  const btn = document.getElementById('tag-filter-btn');
  btn.textContent = n > 0 ? `🏷️ 태그 · ${n}개` : '🏷️ 태그 필터';
  btn.classList.toggle('has-selection', n > 0);
}

function updateCreateTagToggle() {
  const n = document.querySelectorAll('#create-tag-panel .tag-chip.selected').length;
  document.getElementById('create-tag-toggle').textContent =
    n > 0 ? `🏷️ 태그 선택 · ${n}개 선택됨` : '🏷️ 태그 선택';
}

// 태그 필터 드롭다운
const tagFilterBtn = document.getElementById('tag-filter-btn');
const tagFilterDropdown = document.getElementById('tag-filter-dropdown');

tagFilterBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = !tagFilterDropdown.classList.contains('hidden');
  tagFilterDropdown.classList.toggle('hidden', open);
  tagFilterBtn.classList.toggle('open', !open);
});

tagFilterDropdown.addEventListener('click', e => {
  e.stopPropagation();
  const chip = e.target.closest('.tag-chip');
  const reset = e.target.closest('.tag-reset-btn');
  if (chip) {
    const tag = chip.dataset.tag;
    if (currentTagFilters.has(tag)) { currentTagFilters.delete(tag); chip.classList.remove('selected'); }
    else { currentTagFilters.add(tag); chip.classList.add('selected'); }
    updateTagFilterBtn();
    renderRooms();
  } else if (reset) {
    currentTagFilters.clear();
    tagFilterDropdown.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('selected'));
    updateTagFilterBtn();
    renderRooms();
  }
});

document.addEventListener('click', () => {
  tagFilterDropdown.classList.add('hidden');
  tagFilterBtn.classList.remove('open');
});

// 방 만들기 태그 토글
const createTagToggle = document.getElementById('create-tag-toggle');
const createTagPanel = document.getElementById('create-tag-panel');

createTagToggle.addEventListener('click', () => {
  const open = !createTagPanel.classList.contains('hidden');
  createTagPanel.classList.toggle('hidden', open);
  createTagToggle.classList.toggle('open', !open);
});

createTagPanel.addEventListener('click', e => {
  const chip = e.target.closest('.tag-chip');
  const reset = e.target.closest('.tag-reset-btn');
  if (chip) {
    chip.classList.toggle('selected');
    updateCreateTagToggle();
  } else if (reset) {
    createTagPanel.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('selected'));
    updateCreateTagToggle();
  }
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

openCreateBtn.addEventListener('click', () => { createModal.classList.remove('hidden'); renderFavoriteGames(); });
closeCreateBtn.addEventListener('click', () => createModal.classList.add('hidden'));
createModal.addEventListener('click', e => { if (e.target === createModal) createModal.classList.add('hidden'); });

document.getElementById('room-password-create').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '');
});
document.getElementById('room-password-entry').addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// --- Game Favorites ---
function getFavoriteGames() {
  try { return JSON.parse(localStorage.getItem('fav_games') || '[]'); } catch { return []; }
}
function setFavoriteGames(list) {
  localStorage.setItem('fav_games', JSON.stringify(list));
}

function renderFavoriteGames() {
  const favs = getFavoriteGames();
  const bar = document.getElementById('game-favorites-bar');
  bar.innerHTML = favs.map(name =>
    `<button type="button" class="game-fav-chip" data-name="${escHtml(name)}">${escHtml(name)}</button>`
  ).join('');
}

document.getElementById('game-favorites-bar').addEventListener('click', e => {
  const chip = e.target.closest('.game-fav-chip');
  if (!chip) return;
  gameNameInput.value = chip.dataset.name;
});

function toggleFavoriteGame(name, btn) {
  let favs = getFavoriteGames();
  if (favs.includes(name)) {
    favs = favs.filter(f => f !== name);
    btn.classList.remove('active');
  } else {
    if (favs.length >= 10) { showSnackbar('즐겨찾기는 최대 10개까지 가능해요.'); return; }
    favs.push(name);
    btn.classList.add('active');
  }
  setFavoriteGames(favs);
  renderFavoriteGames();
}

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

  const favSet = new Set(getFavoriteGames());
  gameNameDropdown.innerHTML = '';
  data.forEach(game => {
    const ko = game.name_ko || '';
    const en = game.name_en || '';
    const name = ko || en;
    const isFav = favSet.has(name);

    const item = document.createElement('div');
    item.className = 'game-dropdown-item';
    item.innerHTML = `
      <div class="game-dropdown-info">
        <div class="game-dropdown-ko">${escHtml(ko || en)}</div>
        ${ko && en ? `<div class="game-dropdown-en">${escHtml(en)}</div>` : ''}
      </div>
      <button type="button" class="game-fav-btn${isFav ? ' active' : ''}" title="즐겨찾기">⭐</button>
    `;
    item.querySelector('.game-dropdown-info').addEventListener('mousedown', () => {
      gameNameInput.value = name;
      gameNameDropdown.classList.add('hidden');
    });
    item.querySelector('.game-fav-btn').addEventListener('mousedown', e => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavoriteGame(name, e.currentTarget);
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
  const rawPassword = document.getElementById('room-password-create').value.trim();

  if (!title || !game_name || !category) { alert(t('create.err.input')); return; }
  if (rawPassword && !/^\d+$/.test(rawPassword)) { alert(t('create.password.invalid')); return; }

  const submitBtn = createRoomForm.querySelector('[type=submit]');
  submitBtn.disabled = true;
  submitBtn.textContent = t('btn.creating');

  const location = (fd.get('location') || '').trim() || null;
  const password_hash = rawPassword ? await sha256(rawPassword) : null;
  const tags = [...document.querySelectorAll('#create-tag-panel .tag-chip.selected')].map(b => b.dataset.tag);

  const { data: room, error } = await sb.from('rooms').insert({
    title,
    game_name,
    category,
    max_players,
    scheduled_at: scheduled_at || null,
    location,
    host_id: currentUser.id,
    is_open: true,
    password_hash,
    tags,
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
  document.getElementById('room-password-create').value = '';
  createTagPanel.querySelectorAll('.tag-chip').forEach(b => b.classList.remove('selected'));
  createTagPanel.classList.add('hidden');
  createTagToggle.classList.remove('open');
  updateCreateTagToggle();
  enterRoom(room); // enterRoom 내부에서 upsert로 참여 처리
});

// --- Entry Limit (들락방지) ---
async function isEntryLimitExceeded(roomId) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { count } = await sb.from('room_entry_logs')
    .select('*', { count: 'exact', head: true })
    .eq('room_id', roomId)
    .eq('user_id', currentUser.id)
    .gte('entered_at', todayStart.toISOString());
  return count >= 3;
}

function logRoomEntry(roomId) {
  sb.from('room_entry_logs').insert({ room_id: roomId, user_id: currentUser.id }).then();
}

const entryLimitModal = document.getElementById('entry-limit-modal');
document.getElementById('entry-limit-ok-btn').addEventListener('click', () => {
  entryLimitModal.classList.add('hidden');
});
entryLimitModal.addEventListener('click', e => {
  if (e.target === entryLimitModal) entryLimitModal.classList.add('hidden');
});

function showEntryLimitModal() {
  applyI18n();
  entryLimitModal.classList.remove('hidden');
}

// --- Room Password ---
async function tryEnterRoom(room) {
  // 방장은 제한 없음, 일반 멤버는 재입장 포함 횟수 체크
  if (currentUser.id !== room.host_id) {
    if (await isEntryLimitExceeded(room.id)) { showEntryLimitModal(); return; }
  }

  if (myRoomIds.has(room.id)) { enterRoom(room); return; }

  const { data } = await sb.from('rooms').select('password_hash').eq('id', room.id).maybeSingle();
  const hash = data?.password_hash;
  if (!hash) { enterRoom(room); return; }
  showRoomPasswordModal({ ...room, password_hash: hash });
}

function showRoomPasswordModal(room) {
  const modal = document.getElementById('room-password-modal');
  const input = document.getElementById('room-password-entry');
  const error = document.getElementById('room-password-error');
  const cancelBtn = document.getElementById('room-password-cancel-btn');
  const closeBtn = document.getElementById('close-room-password-btn');

  input.value = '';
  error.classList.add('hidden');
  modal.classList.remove('hidden');
  setTimeout(() => input.focus(), 50);

  const cleanup = () => modal.classList.add('hidden');

  const okBtn = document.getElementById('room-password-ok-btn');
  const newOk = okBtn.cloneNode(true);
  okBtn.replaceWith(newOk);

  const verify = async () => {
    const pw = input.value.trim();
    if (!pw) return;
    const hash = await sha256(pw);
    if (hash === room.password_hash) {
      cleanup();
      enterRoom(room);
    } else {
      error.textContent = t('room.password.wrong');
      error.classList.remove('hidden');
      input.select();
    }
  };

  newOk.addEventListener('click', verify);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') verify(); });
  cancelBtn.onclick = cleanup;
  closeBtn.onclick = cleanup;
  modal.onclick = e => { if (e.target === modal) cleanup(); };
}

// --- Enter Room ---
async function enterRoom(room) {
  const { data: ban } = await sb.from('room_bans').select('room_id')
    .eq('room_id', room.id).eq('user_id', currentUser.id).maybeSingle();
  if (ban) { alert(t('ban.notice')); return; }

  // 방장 제외, 재입장 포함 매번 로그
  if (currentUser.id !== room.host_id) {
    logRoomEntry(room.id);
  }

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
  renderNotice(room);
  await loadMessages(room.id);
  await updateMemberCount(room.id);
  loadRoomMembers(room.id);
  subscribeChat(room.id);
  subscribeMembers(room.id);
  subscribeChatNotif(room.id);
  subscribeNotice(room.id);
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
    const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email, avatar_url').in('id', userIds);
    const profileMap = {};
    (profiles || []).forEach(p => {
      profileMap[p.id] = {
        name: p.nickname || p.display_name || p.email?.split('@')[0] || t('unknown'),
        avatar_url: p.avatar_url || null,
      };
    });
    msgs.forEach(m => { m.profiles = { display_name: profileMap[m.user_id]?.name || '알 수 없음', avatar_url: profileMap[m.user_id]?.avatar_url || null }; });
  }

  messagesList.innerHTML = '';
  msgs.forEach(msg => appendMessage(msg));
  scrollToBottom();
}

function appendMessage(msg) {
  if (msg.user_id && msg.user_id !== currentUser?.id && blockedSet.has(msg.user_id)) return;
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
  let authorHtml = '';
  if (!isMine) {
    const avatarSrc = msg.profiles?.avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(msg.user_id || name)}`;
    authorHtml = `<div class="message-author"><img class="message-author-avatar" src="${escHtml(avatarSrc)}" alt="" />${escHtml(name)}</div>`;
  }
  el.innerHTML = `
    ${authorHtml}
    <div class="message-bubble">${escHtml(filterProfanity(msg.content))}</div>
    <div class="message-time">${time}</div>
  `;
  if (!isMine && msg.user_id) {
    attachMessageReportHandler(el.querySelector('.message-bubble'), msg.user_id, name, msg.content);
  }
  messagesList.appendChild(el);
}

function scrollToBottom() {
  messagesList.scrollTop = messagesList.scrollHeight;
}

// --- Send message ---
const sentMessageIds = new Set();

async function sendMessage() {
  if (window._chatBanned) {
    const until = window._chatBanUntil ? new Date(window._chatBanUntil).toLocaleDateString('ko-KR') : '';
    alert(`채팅이 금지된 계정입니다${until ? ` (${until}까지)` : ''}.`);
    return;
  }
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
  const { data, error } = await sb.from('room_members')
    .select('user_id, joined_at')
    .eq('room_id', roomId)
    .order('joined_at', { ascending: true });
  if (error) return;
  // 강퇴 감지: 현재 유저가 멤버 목록에 없으면 강퇴된 것
  if (participatingRoomId === roomId && data && !data.some(m => m.user_id === currentUser?.id)) {
    handleKicked();
    return;
  }
  if (!data?.length) { currentRoomMembers = []; renderMembersPanel(); return; }
  const userIds = data.map(m => m.user_id);
  const { data: profiles } = await sb.from('profiles')
    .select('id, nickname, display_name, email, avatar_url')
    .in('id', userIds);
  const profileMap = {};
  (profiles || []).forEach(p => {
    profileMap[p.id] = {
      name: p.nickname || p.display_name || p.email?.split('@')[0] || t('unknown'),
      avatar_url: p.avatar_url || null,
    };
  });
  currentRoomMembers = data.map(m => ({
    user_id: m.user_id,
    nickname: profileMap[m.user_id]?.name || t('unknown'),
    avatar_url: profileMap[m.user_id]?.avatar_url || null,
  }));
  renderMembersPanel();
}

function renderMembersPanel() {
  const body = document.getElementById('members-panel-body');
  if (!body) return;
  body.innerHTML = '';
  currentRoomMembers.forEach(m => {
    const isHost = m.user_id === currentRoom?.host_id;
    const isSelf = m.user_id === currentUser?.id;
    const isFriend = friendsList.some(f => f.friendId === m.user_id);
    const color = isSelf ? '#9ba3bf' : isFriend ? '#4caf7d' : '#4a8fe8';
    const el = document.createElement('div');
    el.className = 'member-item';
    const iconHtml = m.avatar_url
      ? `<img class="member-avatar" src="${escHtml(m.avatar_url)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">${userIconSvg(color).replace('<svg', '<svg style="display:none"')}`
      : userIconSvg(color);
    el.innerHTML = `
      ${iconHtml}
      <span class="member-name">${isHost ? '👑 ' : ''}${escHtml(m.nickname)}</span>
    `;
    if (!isSelf) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', e => {
        e.stopPropagation();
        showMemberContextMenu(e, m);
      });
    }
    body.appendChild(el);
  });
}

function showMemberContextMenu(event, member) {
  const menu = document.getElementById('member-context-menu');
  const isFriend = friendsList.some(f => f.friendId === member.user_id);
  const isBlocked = blockedSet.has(member.user_id);
  const isRoomHost = currentRoom?.host_id === currentUser?.id;
  const isMemberHost = member.user_id === currentRoom?.host_id;

  menu.innerHTML = '';
  if (!isFriend) addCtxItem(menu, t('ctx.add-friend'), () => { sendFriendRequest(member.user_id); hideContextMenu(); });
  if (isFriend)  addCtxItem(menu, t('ctx.dm'),         () => { openDM(member.user_id, member.nickname); hideContextMenu(); });
  if (isRoomHost && !isMemberHost) addCtxItem(menu, t('ctx.kick'), () => { kickMember(member.user_id); hideContextMenu(); }, true);
  addCtxItem(menu, isBlocked ? t('ctx.unblock') : t('ctx.block'), () => {
    if (isBlocked) unblockUser(member.user_id); else blockUser(member.user_id);
    hideContextMenu();
  }, !isBlocked);
  addCtxItem(menu, '🚨 신고', () => { showReportModal(member.user_id, member.nickname); hideContextMenu(); }, true);

  menu.classList.remove('hidden');
  const x = Math.min(event.clientX, window.innerWidth - 160);
  const y = Math.min(event.clientY, window.innerHeight - menu.offsetHeight - 8);
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
}

function addCtxItem(menu, text, onClick, isDanger = false) {
  const btn = document.createElement('button');
  btn.className = `ctx-menu-item${isDanger ? ' danger' : ''}`;
  btn.textContent = text;
  btn.addEventListener('click', e => { e.stopPropagation(); onClick(); });
  menu.appendChild(btn);
}

function hideContextMenu() {
  document.getElementById('member-context-menu')?.classList.add('hidden');
}

async function loadBlocks() {
  if (!currentUser) return;
  const { data } = await sb.from('blocks').select('blocked_id').eq('blocker_id', currentUser.id);
  const ids = (data || []).map(b => b.blocked_id);
  blockedSet = new Set(ids);
  if (!ids.length) { blockedList = []; renderBlockedList(); return; }
  const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', ids);
  const pm = {};
  (profiles || []).forEach(p => { pm[p.id] = p; });
  blockedList = ids.map(id => {
    const p = pm[id];
    return { userId: id, nickname: p?.nickname || p?.display_name || p?.email?.split('@')[0] || t('unknown') };
  });
  renderBlockedList();
}

function renderBlockedList() {
  const body = document.getElementById('blocked-list-body');
  if (!body) return;
  if (!blockedList.length) {
    body.innerHTML = `<p class="empty-blocked">${t('settings.blocked.empty')}</p>`;
    return;
  }
  body.innerHTML = '';
  blockedList.forEach(u => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(u.nickname)}</span>
      <button class="btn btn-sm">${t('ctx.unblock')}</button>
    `;
    el.querySelector('button').addEventListener('click', () => unblockUser(u.userId));
    body.appendChild(el);
  });
}

async function blockUser(userId) {
  const { error } = await sb.from('blocks').insert({ blocker_id: currentUser.id, blocked_id: userId });
  if (!error) {
    blockedSet.add(userId);
    const { data: p } = await sb.from('profiles').select('nickname, display_name, email').eq('id', userId).maybeSingle();
    const nickname = p?.nickname || p?.display_name || p?.email?.split('@')[0] || t('unknown');
    blockedList.push({ userId, nickname });
    // 친구 관계 삭제 (ID로 직접 or 양방향 삭제)
    const existing = friendsList.find(f => f.friendId === userId);
    if (existing) {
      await sb.from('friendships').delete().eq('id', existing.id);
    } else {
      await sb.from('friendships').delete()
        .eq('requester_id', currentUser.id).eq('addressee_id', userId);
      await sb.from('friendships').delete()
        .eq('requester_id', userId).eq('addressee_id', currentUser.id);
    }
    await loadFriends();
    renderMembersPanel();
    renderBlockedList();
  }
}

async function unblockUser(userId) {
  await sb.from('blocks').delete().eq('blocker_id', currentUser.id).eq('blocked_id', userId);
  blockedSet.delete(userId);
  blockedList = blockedList.filter(u => u.userId !== userId);
  renderMembersPanel();
  renderBlockedList();
}

async function kickMember(userId) {
  if (!currentRoom) return;
  const { error } = await sb.from('room_members').delete()
    .eq('room_id', currentRoom.id).eq('user_id', userId);
  if (!error) {
    await sb.from('room_bans').insert({ room_id: currentRoom.id, user_id: userId });
  } else {
    console.error('kick error:', error);
  }
}

async function handleKicked() {
  if (chatNotifChannel) { sb.removeChannel(chatNotifChannel); chatNotifChannel = null; }
  unsubscribeAll();
  currentRoom = null;
  participatingRoomId = null;
  currentRoomMembers = [];
  roomUnreadMap = {};
  document.getElementById('members-panel').classList.remove('open');
  showScreen('main');
  renderRooms();
  await loadRooms();
  subscribeRooms();
  alert(t('kick.notice'));
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

// --- Room Notice ---
const noticeBar = document.getElementById('room-notice-bar');
const noticeText = document.getElementById('room-notice-text');
const noticeIcon = document.getElementById('room-notice-icon');
const noticeActions = document.getElementById('room-notice-actions');
const noticeWriteBtn = document.getElementById('notice-write-btn');
const noticeEditBtn = document.getElementById('notice-edit-btn');
const noticeDeleteBtn = document.getElementById('notice-delete-btn');
const noticeModal = document.getElementById('room-notice-modal');
const noticeInput = document.getElementById('room-notice-input');
const noticeSaveBtn = document.getElementById('notice-save-btn');
const noticeCancelBtn = document.getElementById('notice-cancel-btn');

function renderNotice(room) {
  const isHost = room.host_id === currentUser?.id;
  if (room.notice) {
    // 공지 있음: 바 표시, 아이콘+텍스트 표시, 방장이면 수정/삭제 버튼
    noticeBar.classList.remove('hidden');
    noticeIcon.classList.remove('hidden');
    noticeText.textContent = room.notice;
    noticeWriteBtn.classList.add('hidden');
    noticeActions.classList.toggle('hidden', !isHost);
  } else if (isHost) {
    // 공지 없고 방장: 바 표시, 작성 버튼만
    noticeBar.classList.remove('hidden');
    noticeWriteBtn.classList.remove('hidden');
    noticeIcon.classList.add('hidden');
    noticeText.textContent = '';
    noticeActions.classList.add('hidden');
  } else {
    // 공지 없고 일반 유저: 바 숨김
    noticeBar.classList.add('hidden');
    noticeText.textContent = '';
  }
}

function openNoticeModal(existing) {
  noticeInput.value = existing || '';
  noticeModal.classList.remove('hidden');
  noticeInput.focus();
}

noticeWriteBtn.addEventListener('click', () => openNoticeModal(''));
noticeEditBtn.addEventListener('click', () => openNoticeModal(currentRoom?.notice || ''));
noticeCancelBtn.addEventListener('click', () => noticeModal.classList.add('hidden'));

noticeModal.addEventListener('click', e => { if (e.target === noticeModal) noticeModal.classList.add('hidden'); });

noticeSaveBtn.addEventListener('click', async () => {
  const text = noticeInput.value.trim();
  if (!text || !currentRoom) return;
  await sb.from('rooms').update({ notice: text }).eq('id', currentRoom.id);
  noticeModal.classList.add('hidden');
});

noticeDeleteBtn.addEventListener('click', () => {
  showConfirm(t('notice.delete.confirm'), async () => {
    if (!currentRoom) return;
    await sb.from('rooms').update({ notice: null }).eq('id', currentRoom.id);
  });
});

let noticeChannel = null;
function subscribeNotice(roomId) {
  if (noticeChannel) sb.removeChannel(noticeChannel);
  noticeChannel = sb.channel(`notice-${roomId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'rooms',
      filter: `id=eq.${roomId}`
    }, payload => {
      if (!currentRoom || currentRoom.id !== roomId) return;
      const newNotice = payload.new?.notice ?? null;
      currentRoom = { ...currentRoom, notice: newNotice };
      allRooms = allRooms.map(r => r.id === roomId ? { ...r, notice: newNotice } : r);
      renderNotice(currentRoom);
    })
    .subscribe();
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
      const { data: profile } = await sb.from('profiles').select('nickname, display_name, email, avatar_url').eq('id', msg.user_id).single();
      msg.profiles = { display_name: profile?.nickname || profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음', avatar_url: profile?.avatar_url || null };
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
        renderNotice(currentRoom);
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
      if (isNotifOn('chat')) playChat();
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
  if (noticeChannel) { sb.removeChannel(noticeChannel); noticeChannel = null; }
  realtimeChannels.forEach(ch => sb.removeChannel(ch));
  realtimeChannels = [];
}

// --- Notifications (Web Audio API) ---
const NOTIF_DEFAULTS = { join: true, leave: true, chat: true, dm: true, chat_in_room: true, dm_in_dm: true, friend_req: true };
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

function getNotifVolume() {
  return parseInt(localStorage.getItem('notif_volume') ?? '75') / 100;
}

function tone(ctx, freq, type, t, duration, vol = 0.25) {
  const scaledVol = vol * getNotifVolume();
  if (scaledVol <= 0) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(scaledVol, t + 0.01);
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
  tone(getAudioCtx(), 1000, 'sine', getAudioCtx().currentTime, 0.12, 0.15);
}

// DM: triangle 2연타 (G5→C6)
function playDM() {
  const ctx = getAudioCtx(), t = ctx.currentTime;
  tone(ctx, 784, 'triangle', t, 0.1, 0.3);
  tone(ctx, 1047, 'triangle', t + 0.1, 0.15, 0.3);
}

// 친구 요청: sine 3연 상승 (A5→C6→E6) 밝고 경쾌한 느낌
function playFriendRequest() {
  if (!isNotifOn('friend_req')) return;
  const ctx = getAudioCtx(), t = ctx.currentTime;
  tone(ctx, 880, 'sine', t, 0.12, 0.22);
  tone(ctx, 1047, 'sine', t + 0.1, 0.12, 0.22);
  tone(ctx, 1319, 'sine', t + 0.2, 0.18, 0.3);
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
  dm_in_dm: document.getElementById('notif-dm-in-dm'),
  friend_req: document.getElementById('notif-friend-req'),
};

function switchSettingsTab(tabName) {
  document.querySelectorAll('.settings-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  document.querySelectorAll('.settings-tab-panel').forEach(p => p.classList.add('hidden'));
  document.getElementById(`stab-${tabName}`).classList.remove('hidden');
  if (tabName === 'inquiry') loadMyInquiries();
}

document.querySelectorAll('.settings-tab').forEach(tab => {
  tab.addEventListener('click', () => switchSettingsTab(tab.dataset.tab));
});

function openSettings(tab = 'general') {
  const s = getNotifSettings();
  Object.entries(notifToggles).forEach(([k, el]) => { el.checked = s[k]; });
  document.getElementById('lang-select').value = localStorage.getItem('lang') || 'auto';
  document.getElementById('profanity-filter-toggle').checked = isProfanityFilterOn();
  const vol = parseInt(localStorage.getItem('notif_volume') ?? '75');
  const volSlider = document.getElementById('notif-volume');
  volSlider.value = vol;
  document.getElementById('notif-volume-val').textContent = vol;
  switchSettingsTab(tab);
  settingsModal.classList.remove('hidden');
}

Object.entries(notifToggles).forEach(([key, el]) => {
  el.addEventListener('change', () => {
    const s = getNotifSettings();
    s[key] = el.checked;
    localStorage.setItem('notif_settings', JSON.stringify(s));
  });
});

const volSlider = document.getElementById('notif-volume');
const volVal = document.getElementById('notif-volume-val');
volSlider.addEventListener('input', () => {
  volVal.textContent = volSlider.value;
  localStorage.setItem('notif_volume', volSlider.value);
});

document.getElementById('settings-btn').addEventListener('click', () => openSettings());
document.getElementById('settings-btn-room').addEventListener('click', () => openSettings());
closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
settingsModal.addEventListener('click', e => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });

const blockedListModal = document.getElementById('blocked-list-modal');
document.getElementById('open-blocked-list-btn').addEventListener('click', () => {
  blockedListModal.classList.remove('hidden');
});
document.getElementById('close-blocked-list-btn').addEventListener('click', () => {
  blockedListModal.classList.add('hidden');
});
blockedListModal.addEventListener('click', e => { if (e.target === blockedListModal) blockedListModal.classList.add('hidden'); });

document.getElementById('lang-select').addEventListener('change', e => saveLang(e.target.value));

// 문의하기
document.getElementById('inquiry-submit-btn').addEventListener('click', async () => {
  const type    = document.getElementById('inquiry-type').value;
  const title   = document.getElementById('inquiry-title').value.trim();
  const content = document.getElementById('inquiry-content').value.trim();
  const msg     = document.getElementById('inquiry-msg');

  if (!title) { msg.style.color = 'var(--danger)'; msg.textContent = '제목을 입력해주세요.'; return; }
  if (!content) { msg.style.color = 'var(--danger)'; msg.textContent = '내용을 입력해주세요.'; return; }

  const btn = document.getElementById('inquiry-submit-btn');
  btn.disabled = true;
  btn.textContent = '제출 중...';

  const { error } = await sb.from('inquiries').insert({
    user_id: currentUser.id,
    type,
    title,
    content,
    status: 'pending',
  });

  btn.disabled = false;
  btn.textContent = '제출';

  if (error) {
    msg.style.color = 'var(--danger)';
    msg.textContent = '제출에 실패했어요. 다시 시도해주세요.';
    return;
  }

  document.getElementById('inquiry-title').value = '';
  document.getElementById('inquiry-content').value = '';
  msg.style.color = 'var(--success)';
  msg.textContent = '문의가 접수되었습니다. 감사합니다!';
  setTimeout(() => { msg.textContent = ''; }, 4000);
  loadMyInquiries();
});

const INQUIRY_TYPE_LABEL = { bug: '🐛 버그 신고', feature: '💡 기능 제안', account: '🔑 계정 문제', other: '💬 기타' };

async function loadMyInquiries() {
  const list = document.getElementById('my-inquiries-list');
  if (!list || !currentUser) return;
  list.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:8px 0;">로딩 중...</div>';

  const { data, error } = await sb.from('inquiries')
    .select('id, type, title, content, answer, answered_at, created_at, status')
    .eq('user_id', currentUser.id)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error || !data?.length) {
    list.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:8px 0;">문의 내역이 없습니다.</div>';
    return;
  }

  list.innerHTML = '';
  data.forEach(item => {
    const el = document.createElement('div');
    el.className = 'my-inquiry-card';
    const statusLabel = item.status === 'answered' ? '<span style="color:var(--success);font-weight:700;">답변완료</span>'
                      : item.status === 'resolved'  ? '<span style="color:var(--text-muted);">처리됨</span>'
                      : '<span style="color:var(--warn);">대기중</span>';
    el.innerHTML = `
      <div class="my-inquiry-header">
        <span class="my-inquiry-type">${INQUIRY_TYPE_LABEL[item.type] || item.type}</span>
        ${statusLabel}
      </div>
      <div class="my-inquiry-title">${escHtml(item.title)}</div>
      <div class="my-inquiry-content">${escHtml(item.content)}</div>
      ${item.answer ? `
        <div class="my-inquiry-answer">
          <div class="my-inquiry-answer-label">💬 관리자 답변</div>
          <div>${escHtml(item.answer)}</div>
        </div>` : ''}
    `;
    list.appendChild(el);
  });

  // 읽음 처리: 답변 있는 문의 알림을 읽음으로 표시
  await sb.from('notifications')
    .update({ is_read: true })
    .eq('user_id', currentUser.id)
    .eq('type', 'inquiry_answer')
    .eq('is_read', false);
  updateNotifBadge(0);
}

// 알림 배지 업데이트
function updateNotifBadge(count) {
  ['notif-badge', 'notif-badge-room'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (count > 0) { el.textContent = count; el.classList.remove('hidden'); }
    else el.classList.add('hidden');
  });
}

// 알림 구독 (onLogin 후 호출)
async function subscribeNotifications() {
  // 미읽음 알림 카운트 초기화
  const { count } = await sb.from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', currentUser.id)
    .eq('is_read', false);
  updateNotifBadge(count || 0);

  // 실시간 구독
  const ch = sb.channel(`notif-${currentUser.id}`)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
      filter: `user_id=eq.${currentUser.id}`,
    }, payload => {
      if (!payload.new.is_read) {
        const { count: cnt } = 0;
        sb.from('notifications').select('*', { count: 'exact', head: true })
          .eq('user_id', currentUser.id).eq('is_read', false)
          .then(({ count: c }) => updateNotifBadge(c || 0));
      }
    })
    .subscribe();
  realtimeChannels.push(ch);
}

document.getElementById('profanity-filter-toggle').addEventListener('change', e => {
  localStorage.setItem('profanity_filter', e.target.checked);
});

document.addEventListener('click', () => { hideContextMenu(); hideDMListContextMenu(); });

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
  if (containsProfanity(nick)) {
    setNicknameMsg(nicknameMsg, t('nick.err.profanity'), 'error');
    return;
  }
  nicknameSubmitBtn.disabled = true;
  const ok = await saveNickname(nick, nicknameMsg);
  nicknameSubmitBtn.disabled = false;
  if (ok) {
    currentNickname = nick;
    await goToMain();
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
  avatarEl.onerror = () => { avatarEl.src = ''; avatarEl.style.background = 'var(--surface2)'; };
  avatarEl.src = currentAvatarUrl || '';

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

// 프로필 아바타 업로드
document.getElementById('profile-avatar-wrap').addEventListener('click', () => {
  document.getElementById('avatar-upload').click();
});

document.getElementById('avatar-upload').addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  e.target.value = '';

  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowed.includes(file.type)) {
    alert(t('avatar.type.error'));
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    alert(t('avatar.size.error'));
    return;
  }

  const wrap = document.getElementById('profile-avatar-wrap');
  const overlay = wrap.querySelector('.avatar-overlay');
  wrap.classList.add('uploading');
  overlay.textContent = '업로드 중...';

  try {
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `${currentUser.id}/avatar.${ext}`;
    const { error: upErr } = await sb.storage.from('avatars').upload(path, file, { upsert: true });
    if (upErr) throw upErr;

    const { data: urlData } = sb.storage.from('avatars').getPublicUrl(path);
    const publicUrl = urlData.publicUrl + '?t=' + Date.now();

    const { error: dbErr } = await sb.from('profiles').update({ avatar_url: publicUrl }).eq('id', currentUser.id);
    if (dbErr) throw dbErr;

    currentAvatarUrl = publicUrl;
    const avatarEl = document.getElementById('profile-avatar');
    avatarEl.src = publicUrl;
  } catch (err) {
    console.error('Avatar upload error:', err);
    alert(t('avatar.upload.error') + '\n\n' + (err?.message || err));
  } finally {
    wrap.classList.remove('uploading');
    overlay.textContent = '📷';
  }
});

// 기본 아바타 프리셋
const AVATAR_PRESETS = [
  ...['Felix', 'Milo', 'Nova', 'Sage', 'Ash', 'Echo', 'Finn', 'Luna', 'Skye', 'Zara']
    .map(seed => `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`),
  ...['Felix', 'Milo', 'Nova', 'Sage', 'Ash', 'Echo', 'Finn', 'Luna', 'Skye', 'Zara']
    .map(seed => `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`),
];
const avatarPresetToggle = document.getElementById('avatar-preset-toggle');
const avatarPresetGrid = document.getElementById('avatar-preset-grid');

if (avatarPresetGrid.children.length === 0) {
  AVATAR_PRESETS.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.className = 'avatar-preset-item';
    img.addEventListener('click', () => selectPresetAvatar(url));
    avatarPresetGrid.appendChild(img);
  });
}

avatarPresetToggle.addEventListener('click', () => {
  avatarPresetGrid.classList.toggle('hidden');
});

async function selectPresetAvatar(url) {
  if (!currentUser) return;
  const { error } = await sb.from('profiles').update({ avatar_url: url }).eq('id', currentUser.id);
  if (error) {
    alert(t('avatar.upload.error'));
    return;
  }
  currentAvatarUrl = url;
  document.getElementById('profile-avatar').src = url;
  avatarPresetGrid.classList.add('hidden');

  avatarPresetGrid.querySelectorAll('.avatar-preset-item').forEach(el => {
    el.classList.toggle('selected', el.src === url);
  });
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
  if (containsProfanity(nick)) {
    setNicknameMsg(profileNicknameMsg, t('nick.err.profanity'), 'error');
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
document.getElementById('dm-list-search').addEventListener('input', e => renderDMList(e.target.value));
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
      if (isNotifOn('dm')) playDM();
    })
    .subscribe();
}

let dmListConvs = [];

function getPinnedDMs() {
  try { return JSON.parse(localStorage.getItem('dm_pinned') || '[]'); } catch { return []; }
}
function setPinnedDMs(arr) {
  localStorage.setItem('dm_pinned', JSON.stringify(arr));
}

function renderDMList(query) {
  const q = (query || '').trim().toLowerCase();
  const pinned = getPinnedDMs();
  const base = q ? dmListConvs.filter(c => c.name.toLowerCase().includes(q)) : dmListConvs;
  const sorted = [
    ...base.filter(c => pinned.includes(c.partnerId)),
    ...base.filter(c => !pinned.includes(c.partnerId)),
  ];

  if (!sorted.length) {
    dmListBody.innerHTML = `<div class="empty-friends">${q ? t('dm.list.search.empty') : t('dm.list.empty')}</div>`;
    return;
  }

  dmListBody.innerHTML = '';
  sorted.forEach(({ partnerId, name, avatar_url, unread, time, preview }) => {
    const isPinned = pinned.includes(partnerId);
    const el = document.createElement('div');
    el.className = 'dm-list-item';
    const avatarSrc = avatar_url || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(partnerId)}`;
    el.innerHTML = `
      <img class="dm-list-avatar" src="${escHtml(avatarSrc)}" alt="" onerror="this.src='https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(partnerId)}'" />
      <div class="dm-list-content">
        <div class="dm-list-header">
          <span class="dm-list-name">${isPinned ? '<span class="dm-pin-icon">📌</span>' : ''}${escHtml(name)}${unread ? `<span class="friends-badge" style="margin-left:6px;">${unread}</span>` : ''}</span>
          <span class="dm-list-time">${time}</span>
        </div>
        <div class="dm-list-preview">${escHtml(preview)}</div>
      </div>
    `;
    el.addEventListener('click', () => {
      dmListModal.classList.add('hidden');
      openDM(partnerId, name);
    });
    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      showDMListContextMenu(e, partnerId, name);
    });
    attachDMLongPress(el, partnerId, name);
    dmListBody.appendChild(el);
  });
}

async function openDMList() {
  dmListModal.classList.remove('hidden');
  dmListBody.innerHTML = `<div class="empty-friends">${t('dm.list.loading')}</div>`;

  const dmSearchInput = document.getElementById('dm-list-search');
  dmSearchInput.value = '';

  const { data } = await sb.from('dm_messages')
    .select('id, sender_id, receiver_id, content, created_at')
    .or(`sender_id.eq.${currentUser.id},receiver_id.eq.${currentUser.id}`)
    .order('created_at', { ascending: false })
    .limit(50);

  if (!data?.length) {
    dmListConvs = [];
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
    .select('id, nickname, display_name, email, avatar_url')
    .in('id', partnerIds);

  const profileMap = {};
  (profiles || []).forEach(p => {
    profileMap[p.id] = {
      name: p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음',
      avatar_url: p.avatar_url || null,
    };
  });

  const sorted = partnerIds.sort((a, b) =>
    new Date(convMap[b].created_at) - new Date(convMap[a].created_at)
  );

  dmListConvs = sorted.map(partnerId => {
    const msg = convMap[partnerId];
    const name = profileMap[partnerId]?.name || '알 수 없음';
    const avatar_url = profileMap[partnerId]?.avatar_url || null;
    const unread = dmUnreadMap[partnerId] || 0;
    const time = formatDMTime(msg.created_at);
    const rawPreview = msg.sender_id === currentUser.id ? `${t('dm.mine.prefix')}${msg.content}` : msg.content;
    const preview = rawPreview.length > 32 ? rawPreview.slice(0, 32) + '…' : rawPreview;
    return { partnerId, name, avatar_url, unread, time, preview };
  });

  renderDMList('');
}

// --- DM List Context Menu ---
let dmListLongPressTimer = null;

function attachDMLongPress(el, partnerId, name) {
  el.addEventListener('touchstart', e => {
    dmListLongPressTimer = setTimeout(() => {
      dmListLongPressTimer = null;
      const touch = e.touches[0];
      showDMListContextMenu({ clientX: touch.clientX, clientY: touch.clientY }, partnerId, name);
    }, 500);
  }, { passive: true });
  el.addEventListener('touchend', () => {
    if (dmListLongPressTimer) { clearTimeout(dmListLongPressTimer); dmListLongPressTimer = null; }
  });
  el.addEventListener('touchmove', () => {
    if (dmListLongPressTimer) { clearTimeout(dmListLongPressTimer); dmListLongPressTimer = null; }
  });
}

function showDMListContextMenu(event, partnerId, name) {
  const menu = document.getElementById('dm-list-context-menu');
  const pinned = getPinnedDMs();
  const isPinned = pinned.includes(partnerId);

  menu.innerHTML = '';
  const pinBtn = document.createElement('button');
  pinBtn.className = 'ctx-menu-item';
  pinBtn.textContent = isPinned ? t('ctx.dm.unpin') : t('ctx.dm.pin');
  pinBtn.addEventListener('click', e => {
    e.stopPropagation();
    const p = getPinnedDMs();
    if (isPinned) setPinnedDMs(p.filter(id => id !== partnerId));
    else setPinnedDMs([...p, partnerId]);
    hideDMListContextMenu();
    renderDMList(document.getElementById('dm-list-search').value);
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'ctx-menu-item danger';
  delBtn.textContent = t('ctx.dm.delete');
  delBtn.addEventListener('click', e => {
    e.stopPropagation();
    hideDMListContextMenu();
    showDMDeleteConfirm(partnerId);
  });

  menu.appendChild(pinBtn);
  menu.appendChild(delBtn);
  menu.classList.remove('hidden');

  const x = Math.min(event.clientX, window.innerWidth - 170);
  const y = Math.min(event.clientY, window.innerHeight - menu.offsetHeight - 8);
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
}

function hideDMListContextMenu() {
  document.getElementById('dm-list-context-menu').classList.add('hidden');
}

function showConfirm(message, onOk) {
  const modal = document.getElementById('dm-delete-modal');
  document.getElementById('dm-delete-msg').textContent = message;
  modal.classList.remove('hidden');

  const okBtn = document.getElementById('dm-delete-ok-btn');
  const cancelBtn = document.getElementById('dm-delete-cancel-btn');
  const cleanup = () => modal.classList.add('hidden');

  const newOk = okBtn.cloneNode(true);
  okBtn.replaceWith(newOk);
  newOk.addEventListener('click', async () => { cleanup(); await onOk(); });
  cancelBtn.onclick = cleanup;
  modal.onclick = e => { if (e.target === modal) cleanup(); };
}

function showDMDeleteConfirm(partnerId) {
  showConfirm(t('dm.delete.confirm'), () => deleteDMConversation(partnerId));
}

function showFriendConfirm(message, onOk) {
  showConfirm(message, onOk);
}

async function deleteDMConversation(partnerId) {
  await sb.from('dm_messages')
    .delete()
    .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${currentUser.id})`);

  dmListConvs = dmListConvs.filter(c => c.partnerId !== partnerId);
  const p = getPinnedDMs().filter(id => id !== partnerId);
  setPinnedDMs(p);
  renderDMList(document.getElementById('dm-list-search').value);
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
let dmFriendAvatarUrl = null;
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

document.getElementById('invite-friends-btn').addEventListener('click', () => {
  friendsModal.classList.remove('hidden');
  loadFriends();
});

document.getElementById('copy-invite-btn').addEventListener('click', copyInviteLink);

document.getElementById('invite-accept-btn').addEventListener('click', async () => {
  const toast = document.getElementById('invite-toast');
  const roomId = toast.dataset.roomId;
  const inviteId = toast.dataset.inviteId;
  toast.classList.add('hidden');
  await sb.from('room_invites').delete().eq('id', inviteId);
  const room = allRooms.find(r => r.id === roomId);
  if (room) {
    enterRoom(room);
  } else {
    const { data } = await sb.from('rooms').select('*').eq('id', roomId).maybeSingle();
    if (data) enterRoom(data);
  }
});

document.getElementById('invite-decline-btn').addEventListener('click', async () => {
  const toast = document.getElementById('invite-toast');
  await sb.from('room_invites').delete().eq('id', toast.dataset.inviteId);
  toast.classList.add('hidden');
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

async function loadPendingBadge() {
  if (!currentUser) return;
  const { data } = await sb.from('friendships')
    .select('id, addressee_id, status')
    .or(`requester_id.eq.${currentUser.id},addressee_id.eq.${currentUser.id}`);
  const count = (data || []).filter(f => f.status === 'pending' && f.addressee_id === currentUser.id).length;
  if (count > 0) {
    friendsBadge.textContent = count;
    friendsBadge.classList.remove('hidden');
    reqCountBadge.textContent = count;
    reqCountBadge.classList.remove('hidden');
  } else {
    friendsBadge.classList.add('hidden');
    reqCountBadge.classList.add('hidden');
  }
}

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
    const { data: profiles } = await sb.from('profiles').select('id, display_name, email, nickname, avatar_url').in('id', allIds);
    (profiles || []).forEach(p => { profileMap[p.id] = { name: p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음', avatar_url: p.avatar_url || null }; });
  }

  friendsList = accepted.map(f => {
    const fid = f.requester_id === currentUser.id ? f.addressee_id : f.requester_id;
    return { id: f.id, friendId: fid, name: profileMap[fid]?.name || '알 수 없음', avatar_url: profileMap[fid]?.avatar_url || null };
  });

  pendingList = pending.map(f => ({
    id: f.id, requesterId: f.requester_id, name: profileMap[f.requester_id] || '알 수 없음'
  }));

  console.log('[loadFriends] pending:', pendingList.length);
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
  const inRoom = !!currentRoom;
  friendsList.forEach(f => {
    const el = document.createElement('div');
    el.className = 'friend-item';
    el.style.cursor = 'pointer';
    const avatarHtml = f.avatar_url
      ? `<img class="friend-avatar" src="${escHtml(f.avatar_url)}" alt="" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">${userIconSvg('#4a8fe8').replace('<svg', '<svg style="display:none"')}`
      : userIconSvg('#4a8fe8');
    el.innerHTML = `
      <div class="friend-item-left">${avatarHtml}<span class="friend-item-name">${escHtml(f.name)}</span></div>
      <div class="friend-item-actions">
        ${inRoom ? `<button class="btn btn-sm btn-primary" data-invite="${f.friendId}">${t('btn.invite')}</button>` : ''}
        <button class="btn btn-sm btn-primary" data-dm="${f.friendId}">${t('btn.dm')}</button>
      </div>
    `;
    if (inRoom) {
      el.querySelector('[data-invite]').addEventListener('click', e => { e.stopPropagation(); inviteFriend(f.friendId, f.name); });
    }
    el.querySelector('[data-dm]').addEventListener('click', e => { e.stopPropagation(); openDM(f.friendId, f.name); });
    el.addEventListener('click', e => showFriendContextMenu(e, f));
    friendsListBody.appendChild(el);
  });
}

function showFriendContextMenu(e, f) {
  e.stopPropagation();
  const menu = document.getElementById('member-context-menu');
  menu.innerHTML = '';
  addCtxItem(menu, t('btn.dm'), () => { openDM(f.friendId, f.name); hideContextMenu(); });
  addCtxItem(menu, t('btn.remove'), () => { showFriendConfirm(t('confirm.remove-friend'), () => removeFriend(f.id)); hideContextMenu(); }, true);
  addCtxItem(menu, t('btn.block'), () => { showFriendConfirm(t('confirm.block-friend'), () => blockUser(f.friendId)); hideContextMenu(); }, true);
  addCtxItem(menu, '🚨 신고', () => { showReportModal(f.friendId, f.name); hideContextMenu(); }, true);
  menu.classList.remove('hidden');
  const x = Math.min(e.clientX, window.innerWidth - 160);
  const y = Math.min(e.clientY, window.innerHeight - menu.offsetHeight - 8);
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
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

  const { data: existing } = await sb.from('friendships')
    .select('requester_id, addressee_id, status')
    .or(`requester_id.eq.${currentUser.id},addressee_id.eq.${currentUser.id}`);

  const acceptedSet = new Set();
  const pendingSet = new Set();
  (existing || []).forEach(f => {
    const otherId = f.requester_id === currentUser.id ? f.addressee_id : f.requester_id;
    if (f.status === 'accepted') acceptedSet.add(otherId);
    else pendingSet.add(otherId);
  });

  friendSearchBody.innerHTML = '';
  data.forEach(user => {
    const name = user.nickname || user.display_name || user.email?.split('@')[0] || '알 수 없음';
    const isFriend  = acceptedSet.has(user.id);
    const isPending = pendingSet.has(user.id);
    const isBlocked = blockedSet.has(user.id);

    let friendBtnHtml;
    if (isFriend)       friendBtnHtml = `<button class="btn btn-sm" disabled data-add>${t('btn.friends')}</button>`;
    else if (isPending) friendBtnHtml = `<button class="btn btn-sm" disabled data-add>${t('btn.requested')}</button>`;
    else                friendBtnHtml = `<button class="btn btn-sm btn-primary" data-add>${t('btn.add-friend')}</button>`;

    const el = document.createElement('div');
    el.className = 'friend-item';
    el.innerHTML = `
      <span class="friend-item-name">${escHtml(name)}</span>
      <div class="friend-item-actions">
        ${friendBtnHtml}
        ${isFriend ? `<button class="btn btn-sm btn-primary" data-dm>${t('btn.dm')}</button>` : ''}
        ${currentRoom ? `<button class="btn btn-sm" data-invite>${t('btn.invite')}</button>` : ''}
        <button class="btn btn-sm btn-danger" data-block>${isBlocked ? t('ctx.unblock') : t('ctx.block')}</button>
        <button class="btn btn-sm btn-danger" data-report>🚨 신고</button>
      </div>
    `;
    if (!isFriend && !isPending) {
      el.querySelector('[data-add]').addEventListener('click', async () => {
        await sendFriendRequest(user.id);
        el.querySelector('[data-add]').disabled = true;
        el.querySelector('[data-add]').textContent = t('btn.requested');
      });
    }
    if (isFriend) el.querySelector('[data-dm]').addEventListener('click', () => openDM(user.id, name));
    if (currentRoom) el.querySelector('[data-invite]').addEventListener('click', () => inviteFriend(user.id, name));
    el.querySelector('[data-block]').addEventListener('click', async () => {
      if (isBlocked) {
        await unblockUser(user.id);
        el.querySelector('[data-block]').textContent = t('ctx.block');
      } else {
        await blockUser(user.id);
        el.querySelector('[data-block]').textContent = t('ctx.unblock');
      }
    });
    el.querySelector('[data-report]').addEventListener('click', () => showReportModal(user.id, name));
    friendSearchBody.appendChild(el);
  });
}

async function sendFriendRequest(addresseeId) {
  const { data: blk } = await sb.from('blocks').select('blocker_id')
    .eq('blocker_id', addresseeId).eq('blocked_id', currentUser.id).maybeSingle();
  if (blk) { alert(t('block.friend.err')); return; }
  const { error } = await sb.from('friendships').insert({ requester_id: currentUser.id, addressee_id: addresseeId });
  if (error) { alert(t('friend.req.err') + error.message); return; }
  sb.channel(`friend-notif-${addresseeId}`).send({
    type: 'broadcast',
    event: 'friend_request',
    payload: { from: currentUser.id },
  });
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
    .on('postgres_changes', { event: '*', schema: 'public', table: 'friendships' }, () => {
      loadFriends();
    })
    .subscribe();
  realtimeChannels.push(ch);
}

function subscribeFriendNotif() {
  if (friendNotifChannel) sb.removeChannel(friendNotifChannel);
  friendNotifChannel = sb.channel(`friend-notif-${currentUser.id}`)
    .on('broadcast', { event: 'friend_request' }, () => {
      playFriendRequest();
      loadFriends();
    })
    .subscribe();
}

// --- Invite Link ---
function showSnackbar(msg) {
  const el = document.getElementById('snackbar');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden', 'snackbar-hide');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => {
    el.classList.add('snackbar-hide');
    setTimeout(() => el.classList.add('hidden'), 400);
  }, 2500);
}

async function copyInviteLink() {
  if (!currentRoom) return;
  let code = currentRoom.invite_code;
  if (!code) {
    code = crypto.randomUUID();
    const { error } = await sb.from('rooms').update({ invite_code: code }).eq('id', currentRoom.id);
    if (error) { alert(t('invite.err')); return; }
    currentRoom = { ...currentRoom, invite_code: code };
    allRooms = allRooms.map(r => r.id === currentRoom.id ? { ...r, invite_code: code } : r);
  }
  const url = `${location.origin}${location.pathname}?invite=${code}`;
  try {
    await navigator.clipboard.writeText(url);
    showSnackbar(t('invite.link.copied'));
  } catch {
    prompt(t('invite.link.copied'), url);
  }
}

async function handlePendingInvite() {
  const code = localStorage.getItem('pending_invite');
  if (!code) return;
  localStorage.removeItem('pending_invite');

  const { data: room } = await sb.from('rooms').select('*').eq('invite_code', code).maybeSingle();
  if (!room) { alert(t('invite.link.invalid')); return; }

  // 이미 멤버인지 확인
  const { data: membership } = await sb.from('room_members')
    .select('room_id').eq('room_id', room.id).eq('user_id', currentUser.id).maybeSingle();
  if (membership) { enterRoom(room); return; }

  // 인원 초과 확인
  const { count } = await sb.from('room_members')
    .select('*', { count: 'exact', head: true }).eq('room_id', room.id);
  if (count >= room.max_players) { alert(t('invite.link.full')); return; }

  // 들락방지 확인 (방장 제외)
  if (currentUser.id !== room.host_id && await isEntryLimitExceeded(room.id)) {
    showEntryLimitModal();
    return;
  }

  // 비밀번호 확인 후 입장
  if (room.password_hash) {
    showRoomPasswordModal(room);
  } else {
    enterRoom(room);
  }
}

async function inviteFriend(friendId, friendName) {
  if (!currentRoom) return;
  const { error } = await sb.from('room_invites').insert({
    room_id: currentRoom.id,
    inviter_id: currentUser.id,
    invitee_id: friendId
  });
  if (error) {
    alert(error.code === '23505' ? t('invite.already') : t('invite.err'));
  } else {
    alert(t('invite.sent').replace('%s', friendName));
    friendsModal.classList.add('hidden');
  }
}

async function showInviteToast(invite) {
  const [{ data: room }, { data: inviter }] = await Promise.all([
    sb.from('rooms').select('id, title').eq('id', invite.room_id).maybeSingle(),
    sb.from('profiles').select('nickname').eq('id', invite.inviter_id).maybeSingle()
  ]);
  if (!room) return;
  const inviterName = inviter?.nickname || t('unknown');
  const toast = document.getElementById('invite-toast');
  document.getElementById('invite-toast-msg').textContent =
    t('invite.toast').replace('%i', inviterName).replace('%r', room.title);
  toast.dataset.inviteId = invite.id;
  toast.dataset.roomId = invite.room_id;
  toast.classList.remove('hidden');
}

async function loadPendingInvites() {
  const { data } = await sb.from('room_invites')
    .select('*').eq('invitee_id', currentUser.id)
    .order('created_at', { ascending: false }).limit(1);
  if (data?.length > 0) showInviteToast(data[0]);
}

function subscribeInvites() {
  const ch = sb.channel('room-invites-realtime')
    .on('postgres_changes', {
      event: 'INSERT', schema: 'public', table: 'room_invites',
      filter: `invitee_id=eq.${currentUser.id}`
    }, payload => showInviteToast(payload.new))
    .subscribe();
  realtimeChannels.push(ch);
}

// --- DM ---
async function openDM(friendId, friendName) {
  dmFriendId = friendId;
  dmMessages.innerHTML = '';
  friendsModal.classList.add('hidden');
  dmModal.classList.remove('hidden');

  const { data: fp } = await sb.from('profiles').select('avatar_url').eq('id', friendId).maybeSingle();
  dmFriendAvatarUrl = fp?.avatar_url || null;
  const avatarSrc = dmFriendAvatarUrl || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${encodeURIComponent(friendId)}`;
  dmTitle.innerHTML = `<img class="dm-title-avatar" src="${escHtml(avatarSrc)}" alt="" />${escHtml(friendName)}`;
  // 상대방이 나를 차단했는지 확인
  const { data: blk } = await sb.from('blocks').select('blocker_id')
    .eq('blocker_id', friendId).eq('blocked_id', currentUser.id).maybeSingle();
  dmBlockedByFriend = !!blk;
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
    .order('created_at', { ascending: false })
    .limit(150);

  const messages = (data || []).reverse();
  const userIds = [...new Set(messages.map(m => m.sender_id))];
  const profileMap = {};
  if (userIds.length > 0) {
    const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email, avatar_url').in('id', userIds);
    (profiles || []).forEach(p => {
      profileMap[p.id] = {
        name: p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음',
        avatar_url: p.avatar_url || null,
      };
    });
  }

  dmMessages.innerHTML = '';
  messages.forEach(msg => {
    const p = profileMap[msg.sender_id];
    appendDMMessage(msg, p?.name || '알 수 없음', p?.avatar_url || null);
  });
  dmMessages.scrollTop = dmMessages.scrollHeight;
}

function appendDMMessage(msg, senderName, senderAvatarUrl) {
  const isMine = msg.sender_id === currentUser.id;
  const time = new Date(msg.created_at).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  const el = document.createElement('div');
  el.className = `message ${isMine ? 'mine' : 'theirs'}`;
  const authorHtml = !isMine ? `<div class="message-author">${escHtml(senderName)}</div>` : '';
  el.innerHTML = `
    ${authorHtml}
    <div class="message-bubble">${escHtml(filterProfanity(msg.content))}</div>
    <div class="message-time">${time}</div>
  `;
  dmMessages.appendChild(el);
}

async function sendDMMessage() {
  const content = dmInput.value.trim();
  if (!content || !dmFriendId) return;
  if (blockedSet.has(dmFriendId)) { alert(t('block.dm.err')); return; }
  if (dmBlockedByFriend) { alert(t('block.recv.err')); return; }
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
      const { data: profile } = await sb.from('profiles').select('nickname, display_name, email, avatar_url').eq('id', msg.sender_id).single();
      const name = profile?.nickname || profile?.display_name || profile?.email?.split('@')[0] || '알 수 없음';
      appendDMMessage(msg, name, profile?.avatar_url || null);
      dmMessages.scrollTop = dmMessages.scrollHeight;
    })
    .subscribe();
}

// --- 신고 ---
const REPORT_REASONS = ['욕설/혐오 발언', '도배/스팸', '사기/허위정보', '부적절한 행동', '기타'];

let reportTarget = { userId: null, userName: null, content: null };

function showReportModal(userId, userName, content = null) {
  if (userId === currentUser?.id) return;
  reportTarget = { userId, userName, content };

  document.getElementById('report-target-info').textContent = `신고 대상: ${userName}`;

  const list = document.getElementById('report-reason-list');
  list.innerHTML = '';
  REPORT_REASONS.forEach((r, i) => {
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:8px;cursor:pointer;font-size:0.9rem;';
    label.innerHTML = `<input type="radio" name="report-reason" value="${escHtml(r)}" ${i === 0 ? 'checked' : ''} />${escHtml(r)}`;
    list.appendChild(label);
  });

  const preview = document.getElementById('report-msg-preview');
  if (content) {
    preview.textContent = content;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }

  document.getElementById('report-detail').value = '';
  document.getElementById('report-modal').classList.remove('hidden');
}

document.getElementById('close-report-modal').addEventListener('click', () => {
  document.getElementById('report-modal').classList.add('hidden');
});
document.getElementById('report-cancel-btn').addEventListener('click', () => {
  document.getElementById('report-modal').classList.add('hidden');
});

document.getElementById('report-submit-btn').addEventListener('click', async () => {
  const selected = document.querySelector('input[name="report-reason"]:checked');
  if (!selected) return;
  const reason = selected.value;

  const detail = document.getElementById('report-detail').value.trim() || null;

  const { error } = await sb.from('reports').insert({
    reporter_id: currentUser.id,
    reported_user_id: reportTarget.userId,
    reason,
    detail,
    message_content: reportTarget.content || null,
    room_id: currentRoom?.id || null,
    status: 'pending',
  });

  document.getElementById('report-modal').classList.add('hidden');
  if (error) { alert('신고 접수에 실패했어요.'); return; }
  alert('신고가 접수되었습니다.');
});

// 채팅 메시지 우클릭/길게누르기 신고
function attachMessageReportHandler(el, userId, userName, content) {
  let longPressTimer = null;
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    e.stopPropagation();
    showReportModal(userId, userName, content);
  });
  el.addEventListener('pointerdown', () => {
    longPressTimer = setTimeout(() => showReportModal(userId, userName, content), 600);
  });
  el.addEventListener('pointerup', () => clearTimeout(longPressTimer));
  el.addEventListener('pointermove', () => clearTimeout(longPressTimer));
}

// --- Util ---
function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
