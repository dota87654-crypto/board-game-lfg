const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';
// ⚠️ 아래에 본인 Supabase User ID를 입력하세요
// Supabase Dashboard → Authentication → Users → 본인 이메일 행 클릭 → UID 복사
const ADMIN_USER_ID = 'YOUR_USER_ID_HERE';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PUNISHMENT_LABELS = {
  warning:       '⚠️ 경고',
  chat_ban_3d:   '💬 채팅금지 3일',
  chat_ban_7d:   '💬 채팅금지 7일',
  suspend_1d:    '🔒 이용정지 1일',
  suspend_7d:    '🔒 이용정지 7일',
  permanent_ban: '🚫 영구정지',
};

const PUNISHMENT_CONFIG = {
  warning:       { type: 'warning',       days: 0 },
  chat_ban_3d:   { type: 'chat_ban',      days: 3 },
  chat_ban_7d:   { type: 'chat_ban',      days: 7 },
  suspend_1d:    { type: 'suspend',       days: 1 },
  suspend_7d:    { type: 'suspend',       days: 7 },
  permanent_ban: { type: 'permanent_ban', days: null },
};

let currentAdmin = null;

async function init() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { location.href = '/'; return; }
  if (session.user.id !== ADMIN_USER_ID) { alert('접근 권한이 없습니다.'); location.href = '/'; return; }
  currentAdmin = session.user;
  document.getElementById('admin-name').textContent = session.user.email;
  document.getElementById('loading').style.display = 'none';
  showTab('reports');
}

// 탭 전환
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showTab(tab.dataset.tab);
  });
});

function showTab(name) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  const el = document.getElementById(`tab-${name}`);
  if (el) el.style.display = 'block';
  if (name === 'reports') loadReports();
  if (name === 'users') loadUsers();
}

document.getElementById('logout-btn').addEventListener('click', async () => {
  await sb.auth.signOut();
  location.href = '/';
});

document.getElementById('status-filter').addEventListener('change', loadReports);

// 신고 목록 로드
async function loadReports() {
  const status = document.getElementById('status-filter').value;
  const container = document.getElementById('reports-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  let query = sb.from('reports')
    .select('id, reporter_id, reported_user_id, reason, message_content, room_id, created_at, status')
    .order('created_at', { ascending: false })
    .limit(100);

  if (status !== 'all') query = query.eq('status', status);

  const { data: reports, error } = await query;
  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!reports?.length) { container.innerHTML = '<div class="empty">신고 내역이 없습니다.</div>'; return; }

  // 유저 닉네임 일괄 조회
  const ids = [...new Set([...reports.map(r => r.reporter_id), ...reports.map(r => r.reported_user_id)].filter(Boolean))];
  const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', ids);
  const nameMap = {};
  (profiles || []).forEach(p => { nameMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

  container.innerHTML = '';
  reports.forEach(r => renderReportCard(r, nameMap, container));
}

function renderReportCard(r, nameMap, container) {
  const reporter = nameMap[r.reporter_id] || '알 수 없음';
  const reported = nameMap[r.reported_user_id] || '알 수 없음';
  const time = new Date(r.created_at).toLocaleString('ko-KR');

  const badgeClass = { pending: 'badge-pending', resolved: 'badge-resolved', dismissed: 'badge-dismissed' }[r.status] || '';
  const badgeLabel = { pending: '대기중', resolved: '처리됨', dismissed: '기각됨' }[r.status] || r.status;

  const card = document.createElement('div');
  card.className = 'report-card';
  card.innerHTML = `
    <div class="report-meta">
      <span>신고자: <b>${escHtml(reporter)}</b></span>
      <span>피신고자: <b>${escHtml(reported)}</b></span>
      <span>${time}</span>
      <span class="badge ${badgeClass}">${badgeLabel}</span>
    </div>
    <div class="report-reason">${escHtml(r.reason)}</div>
    ${r.message_content ? `<div class="report-content">"${escHtml(r.message_content)}"</div>` : ''}
    <div class="report-actions">
      ${r.status === 'pending' ? `
        ${Object.entries(PUNISHMENT_LABELS).map(([key, label]) =>
          `<button class="btn btn-warn" data-action="${key}" data-report="${r.id}" data-uid="${r.reported_user_id}">${label}</button>`
        ).join('')}
        <button class="btn btn-ghost" data-dismiss="${r.id}">기각</button>
      ` : ''}
    </div>
  `;

  card.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => applyPunishment(btn.dataset.action, btn.dataset.uid, btn.dataset.report, reported));
  });
  card.querySelector('[data-dismiss]')?.addEventListener('click', () => dismissReport(r.id));

  container.appendChild(card);
}

async function applyPunishment(actionKey, userId, reportId, userName) {
  const cfg = PUNISHMENT_CONFIG[actionKey];
  if (!cfg) return;
  if (!confirm(`${userName}에게 [${PUNISHMENT_LABELS[actionKey]}] 처벌을 적용할까요?`)) return;

  const expiresAt = cfg.days ? new Date(Date.now() + cfg.days * 86400000).toISOString() : null;

  // 기존 활성 처벌 비활성화
  await sb.from('punishments').update({ is_active: false })
    .eq('user_id', userId).eq('is_active', true);

  if (cfg.type !== 'warning') {
    const { error } = await sb.from('punishments').insert({
      user_id: userId,
      type: cfg.type,
      expires_at: expiresAt,
      admin_id: currentAdmin.id,
      report_id: reportId,
      is_active: true,
    });
    if (error) { alert('처벌 적용 실패: ' + error.message); return; }
  }

  await sb.from('reports').update({ status: 'resolved' }).eq('id', reportId);
  alert('처벌이 적용되었습니다.');
  loadReports();
}

async function dismissReport(reportId) {
  if (!confirm('이 신고를 기각하시겠습니까?')) return;
  await sb.from('reports').update({ status: 'dismissed' }).eq('id', reportId);
  loadReports();
}

// 유저 관리 탭
async function loadUsers() {
  const container = document.getElementById('users-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  const now = new Date().toISOString();
  const { data: punishments, error } = await sb.from('punishments')
    .select('id, user_id, type, expires_at, created_at')
    .eq('is_active', true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false });

  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!punishments?.length) { container.innerHTML = '<div class="empty">활성 처벌이 없습니다.</div>'; return; }

  const ids = [...new Set(punishments.map(p => p.user_id))];
  const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', ids);
  const nameMap = {};
  (profiles || []).forEach(p => { nameMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

  container.innerHTML = '';
  punishments.forEach(p => {
    const name = nameMap[p.user_id] || '알 수 없음';
    const typeLabel = { warning: '경고', chat_ban: '채팅금지', suspend: '이용정지', permanent_ban: '영구정지' }[p.type] || p.type;
    const until = p.expires_at ? new Date(p.expires_at).toLocaleString('ko-KR') : '영구';
    const since = new Date(p.created_at).toLocaleString('ko-KR');

    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <div class="user-info">
        <b>${escHtml(name)}</b>
        <small>처벌: ${typeLabel} &nbsp;|&nbsp; 만료: ${until} &nbsp;|&nbsp; 적용일: ${since}</small>
      </div>
      <button class="btn btn-success" data-unban="${p.id}">정지 해제</button>
    `;
    card.querySelector('[data-unban]').addEventListener('click', () => unbanUser(p.id, name));
    container.appendChild(card);
  });
}

async function unbanUser(punishmentId, userName) {
  if (!confirm(`${userName}의 처벌을 해제하시겠습니까?`)) return;
  const { error } = await sb.from('punishments').update({ is_active: false }).eq('id', punishmentId);
  if (error) { alert('해제 실패: ' + error.message); return; }
  alert('처벌이 해제되었습니다.');
  loadUsers();
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

init();
