const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';
// ⚠️ 아래에 본인 Supabase User ID를 입력하세요
// Supabase Dashboard → Authentication → Users → 본인 이메일 행 클릭 → UID 복사
const ADMIN_USER_ID = '49c6d001-2598-4f7c-af78-a1e89c7ff806';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PUNISHMENT_LABELS = {
  warning:       '⚠️ 경고',
  chat_ban_3d:   '💬 채팅금지 3일',
  chat_ban_7d:   '💬 채팅금지 7일',
  suspend_1d:    '🔒 이용정지 1일',
  suspend_7d:    '🔒 이용정지 7일',
  permanent_ban: '🚫 영구정지',
};

function buildPunishmentMessage(actionKey, expiresAt, reason) {
  const until = expiresAt ? new Date(expiresAt).toLocaleDateString('ko-KR') + '까지' : '';
  const prefix = reason ? `${reason}(으)로 인해 ` : '관리자로부터 ';
  const msgs = {
    warning:       `${prefix}경고 처분을 받았습니다.`,
    chat_ban_3d:   `${prefix}채팅금지 처분을 받았습니다. 기간: ${until}`,
    chat_ban_7d:   `${prefix}채팅금지 처분을 받았습니다. 기간: ${until}`,
    suspend_1d:    `${prefix}이용정지 처분을 받았습니다. 기간: ${until}`,
    suspend_7d:    `${prefix}이용정지 처분을 받았습니다. 기간: ${until}`,
    permanent_ban: `${prefix}영구정지 처분을 받았습니다.`,
  };
  return msgs[actionKey] || `${prefix}처분을 받았습니다.`;
}

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
  if (name === 'inquiries') loadInquiries();
  if (name === 'announcements') loadAdminAnnouncements();
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
    .select('id, reporter_id, reported_user_id, reason, detail, message_content, room_id, created_at, status')
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
    ${r.detail ? `<div class="report-content" style="border-left:3px solid var(--warn);padding-left:10px;">${escHtml(r.detail)}</div>` : ''}
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

  // 신고 사유 조회
  const { data: reportData } = await sb.from('reports').select('reason').eq('id', reportId).maybeSingle();
  const reason = reportData?.reason || null;

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

  await sb.from('notifications').insert({
    user_id: userId,
    type: 'punishment',
    message: buildPunishmentMessage(actionKey, expiresAt, reason),
    is_read: false,
  });

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

// 문의 목록
document.getElementById('inquiry-status-filter').addEventListener('change', loadInquiries);

async function loadInquiries() {
  const status = document.getElementById('inquiry-status-filter').value;
  const container = document.getElementById('inquiries-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  let query = sb.from('inquiries')
    .select('id, user_id, type, title, content, created_at, status, answer, answered_at')
    .order('created_at', { ascending: false })
    .limit(100);
  if (status !== 'all') query = query.eq('status', status);

  const { data: items, error } = await query;
  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!items?.length) { container.innerHTML = '<div class="empty">문의 내역이 없습니다.</div>'; return; }

  const ids = [...new Set(items.map(i => i.user_id).filter(Boolean))];
  const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', ids);
  const nameMap = {};
  (profiles || []).forEach(p => { nameMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

  const typeLabel = { bug: '🐛 버그 신고', feature: '💡 기능 제안', account: '🔑 계정 문제', other: '💬 기타' };

  container.innerHTML = '';
  items.forEach(item => {
    const name = nameMap[item.user_id] || '알 수 없음';
    const time = new Date(item.created_at).toLocaleString('ko-KR');
    const badgeMap = { pending: 'badge-pending', answered: 'badge-answered', resolved: 'badge-resolved' };
    const labelMap = { pending: '대기중', answered: '답변완료', resolved: '처리됨' };
    const badgeClass = badgeMap[item.status] || 'badge-pending';
    const badgeLabel = labelMap[item.status] || item.status;

    const card = document.createElement('div');
    card.className = 'report-card';
    card.innerHTML = `
      <div class="report-meta">
        <span>문의자: <b>${escHtml(name)}</b></span>
        <span>${typeLabel[item.type] || item.type}</span>
        <span>${time}</span>
        <span class="badge ${badgeClass}">${badgeLabel}</span>
      </div>
      <div style="font-weight:600;margin-bottom:6px;">${escHtml(item.title)}</div>
      <div class="report-content" style="white-space:pre-wrap;">${escHtml(item.content)}</div>
      ${item.answer ? `
        <div class="answer-box">
          <div class="answer-label">📨 답변 (${new Date(item.answered_at).toLocaleString('ko-KR')})</div>
          <div class="answer-text">${escHtml(item.answer)}</div>
        </div>
      ` : ''}
      <div class="answer-form">
        <textarea class="answer-textarea" placeholder="답변을 입력하세요...">${escHtml(item.answer || '')}</textarea>
        <div class="report-actions" style="margin-top:8px;">
          <button class="btn btn-primary btn-send-answer">📨 답변 전송</button>
          ${item.status !== 'pending'
            ? `<button class="btn btn-ghost" data-reopen="${item.id}">↩ 재개</button>`
            : ''
          }
        </div>
      </div>
    `;

    card.querySelector('.btn-send-answer').addEventListener('click', () => {
      const answer = card.querySelector('.answer-textarea').value.trim();
      if (!answer) { alert('답변 내용을 입력해주세요.'); return; }
      sendAnswer(item.id, item.user_id, answer);
    });
    card.querySelector('[data-reopen]')?.addEventListener('click', () => reopenInquiry(item.id));
    container.appendChild(card);
  });
}

async function sendAnswer(itemId, userId, answer) {
  const { error } = await sb.from('inquiries').update({
    answer,
    answered_at: new Date().toISOString(),
    status: 'answered',
  }).eq('id', itemId);
  if (error) { alert('답변 전송 실패: ' + error.message); return; }

  await sb.from('notifications').insert({
    user_id: userId,
    type: 'inquiry_answer',
    message: '문의하신 내용에 대한 답변이 등록되었습니다.',
    is_read: false,
  });

  alert('답변이 전송되었습니다.');
  loadInquiries();
}

async function reopenInquiry(id) {
  await sb.from('inquiries').update({ status: 'pending' }).eq('id', id);
  loadInquiries();
}

// ---- 공지사항 관리 ----
async function loadAdminAnnouncements() {
  const container = document.getElementById('announcements-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  const { data, error } = await sb.from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!data?.length) { container.innerHTML = '<div class="empty">공지사항이 없습니다.</div>'; return; }

  container.innerHTML = '';
  data.forEach(item => {
    const date = new Date(item.created_at).toLocaleDateString('ko-KR');
    const card = document.createElement('div');
    card.className = 'announce-card';
    card.innerHTML = `
      <div class="announce-card-header">
        <div>
          <div class="announce-card-title">${item.is_pinned ? '📌 ' : ''}${escHtml(item.title)}</div>
          <div class="announce-card-meta">${date}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button class="btn btn-ghost btn-edit" data-id="${item.id}">✏️ 수정</button>
          <button class="btn btn-danger btn-del" data-id="${item.id}">🗑️ 삭제</button>
        </div>
      </div>
      <div class="announce-card-body">${escHtml(item.content)}</div>
    `;
    card.querySelector('.btn-edit').addEventListener('click', () => startEditAnnouncement(item));
    card.querySelector('.btn-del').addEventListener('click', () => deleteAnnouncement(item.id, item.title));
    container.appendChild(card);
  });
}

function startEditAnnouncement(item) {
  document.getElementById('announce-edit-id').value = item.id;
  document.getElementById('announce-title-input').value = item.title;
  document.getElementById('announce-content-input').value = item.content;
  document.getElementById('announce-pinned-input').checked = item.is_pinned || false;
  document.getElementById('announce-form-title').textContent = '공지 수정';
  document.getElementById('announce-cancel-btn').style.display = '';
  document.getElementById('announce-title-input').focus();
  document.getElementById('tab-announcements').scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetAnnounceForm() {
  document.getElementById('announce-edit-id').value = '';
  document.getElementById('announce-title-input').value = '';
  document.getElementById('announce-content-input').value = '';
  document.getElementById('announce-pinned-input').checked = false;
  document.getElementById('announce-form-title').textContent = '새 공지 작성';
  document.getElementById('announce-cancel-btn').style.display = 'none';
}

document.getElementById('announce-cancel-btn').addEventListener('click', resetAnnounceForm);

document.getElementById('announce-save-btn').addEventListener('click', async () => {
  const id = document.getElementById('announce-edit-id').value;
  const title = document.getElementById('announce-title-input').value.trim();
  const content = document.getElementById('announce-content-input').value.trim();
  const is_pinned = document.getElementById('announce-pinned-input').checked;

  if (!title || !content) { alert('제목과 내용을 입력해주세요.'); return; }

  const btn = document.getElementById('announce-save-btn');
  btn.disabled = true;

  let error;
  if (id) {
    ({ error } = await sb.from('announcements').update({ title, content, is_pinned, updated_at: new Date().toISOString() }).eq('id', id));
  } else {
    ({ error } = await sb.from('announcements').insert({ title, content, is_pinned }));
  }

  btn.disabled = false;
  if (error) { alert('저장 실패: ' + error.message); return; }

  resetAnnounceForm();
  loadAdminAnnouncements();
});

async function deleteAnnouncement(id, title) {
  if (!confirm(`"${title}" 공지를 삭제하시겠습니까?`)) return;
  const { error } = await sb.from('announcements').delete().eq('id', id);
  if (error) { alert('삭제 실패: ' + error.message); return; }
  loadAdminAnnouncements();
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

init();
