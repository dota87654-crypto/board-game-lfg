const SUPABASE_URL = 'https://zjxryvtbzlbdsgqceygc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_qD9MADOLO1AdQgTY4KUvTA_ogSu_rTl';
// ⚠️ 아래에 본인 Supabase User ID를 입력하세요
// Supabase Dashboard → Authentication → Users → 본인 이메일 행 클릭 → UID 복사
const ADMIN_USER_ID = '49c6d001-2598-4f7c-af78-a1e89c7ff806';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PUNISHMENT_TYPE_LABELS = {
  warning:       '⚠️ 경고',
  chat_ban:      '💬 채팅금지',
  suspend:       '🔒 이용정지',
  permanent_ban: '🚫 영구정지',
};

function buildPunishmentMessage(type, expiresAt, reason) {
  const until = expiresAt ? new Date(expiresAt).toLocaleDateString('ko-KR') + '까지' : '';
  const prefix = reason ? `${reason}(으)로 인해 ` : '관리자로부터 ';
  const msgs = {
    warning:       `${prefix}경고 처분을 받았습니다.`,
    chat_ban:      `${prefix}채팅금지 처분을 받았습니다. 기간: ${until}`,
    suspend:       `${prefix}이용정지 처분을 받았습니다. 기간: ${until}`,
    permanent_ban: `${prefix}영구정지 처분을 받았습니다.`,
  };
  return msgs[type] || `${prefix}처분을 받았습니다.`;
}

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
  if (name === 'users') { loadUsers(); loadBannedEmails(); }
  if (name === 'inquiries') loadInquiries();
  if (name === 'announcements') loadAdminAnnouncements();
  if (name === 'faq') loadAdminFAQs();
  if (name === 'activity') { document.getElementById('activity-result').innerHTML = ''; }
  if (name === 'guild-log') { document.getElementById('guild-log-result').innerHTML = ''; }
  if (name === 'user-list') loadUserList();
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
    <div class="report-actions" style="align-items:center;">
      ${r.status === 'pending' ? `
        <select class="punish-type-sel" style="background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:5px 8px;font-size:0.82rem;">
          <option value="warning">⚠️ 경고</option>
          <option value="chat_ban">💬 채팅금지</option>
          <option value="suspend">🔒 이용정지</option>
          <option value="permanent_ban">🚫 영구정지</option>
        </select>
        <div class="punish-days-wrap" style="display:none;align-items:center;gap:4px;">
          <input type="number" class="punish-days-inp" min="1" max="3650" placeholder="기간" style="width:72px;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:5px 8px;font-size:0.82rem;" />
          <span style="font-size:0.82rem;color:var(--text-muted);">일</span>
        </div>
        <button class="btn btn-warn btn-apply-punish" style="font-size:0.78rem;padding:5px 10px;">처벌 적용</button>
        <button class="btn btn-ghost btn-dismiss" style="font-size:0.78rem;padding:5px 10px;">기각</button>
      ` : ''}
    </div>
  `;

  if (r.status === 'pending') {
    const sel = card.querySelector('.punish-type-sel');
    const daysWrap = card.querySelector('.punish-days-wrap');
    const daysInp = card.querySelector('.punish-days-inp');

    sel.addEventListener('change', () => {
      const needsDays = sel.value === 'chat_ban' || sel.value === 'suspend';
      daysWrap.style.display = needsDays ? 'flex' : 'none';
      if (needsDays) daysInp.focus();
    });

    card.querySelector('.btn-apply-punish').addEventListener('click', () => {
      const type = sel.value;
      const needsDays = type === 'chat_ban' || type === 'suspend';
      const days = needsDays ? parseInt(daysInp.value) : null;
      if (needsDays && (!days || days < 1)) { alert('기간을 입력해주세요. (1일 이상)'); return; }
      applyPunishment(type, days, r.reported_user_id, r.id, reported);
    });

    card.querySelector('.btn-dismiss').addEventListener('click', () => dismissReport(r.id));
  }

  container.appendChild(card);
}

async function applyPunishment(type, days, userId, reportId, userName) {
  const daysLabel = days ? ` ${days}일` : '';
  const label = (PUNISHMENT_TYPE_LABELS[type] || type) + daysLabel;
  if (!confirm(`${userName}에게 [${label}] 처벌을 적용할까요?`)) return;

  const expiresAt = days ? new Date(Date.now() + days * 86400000).toISOString() : null;

  const { data: reportData } = await sb.from('reports').select('reason').eq('id', reportId).maybeSingle();
  const reason = reportData?.reason || null;

  await sb.from('punishments').update({ is_active: false })
    .eq('user_id', userId).eq('is_active', true);

  if (type !== 'warning') {
    const { error } = await sb.from('punishments').insert({
      user_id: userId,
      type,
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
    message: buildPunishmentMessage(type, expiresAt, reason),
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
document.getElementById('users-filter').addEventListener('change', loadUsers);

async function loadUsers() {
  const filter = document.getElementById('users-filter').value;
  const container = document.getElementById('users-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  let query = sb.from('punishments')
    .select('id, user_id, type, expires_at, created_at, is_active')
    .order('created_at', { ascending: false })
    .limit(200);
  if (filter === 'active') query = query.eq('is_active', true);

  const { data: punishments, error } = await query;

  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!punishments?.length) { container.innerHTML = '<div class="empty">처벌 내역이 없습니다.</div>'; return; }

  const ids = [...new Set(punishments.map(p => p.user_id))];
  const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', ids);
  const nameMap = {};
  (profiles || []).forEach(p => { nameMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

  const typeLabel = { warning: '경고', chat_ban: '채팅금지', suspend: '이용정지', permanent_ban: '영구정지' };

  container.innerHTML = '';
  punishments.forEach(p => {
    const name = nameMap[p.user_id] || '알 수 없음';
    const label = typeLabel[p.type] || p.type;
    const until = p.expires_at ? new Date(p.expires_at).toLocaleString('ko-KR') : '영구';
    const since = new Date(p.created_at).toLocaleString('ko-KR');
    const isActive = p.is_active;

    const card = document.createElement('div');
    card.className = `user-card${isActive ? '' : ' revoked'}`;
    card.innerHTML = `
      <div class="user-info">
        <b>${escHtml(name)}</b>${isActive ? '' : '<span class="badge-revoked">해지됨</span>'}
        <small>처벌: ${label} &nbsp;|&nbsp; 만료: ${until} &nbsp;|&nbsp; 적용일: ${since}</small>
      </div>
      ${isActive ? `
        <div style="display:flex;gap:6px;">
          <button class="btn btn-warn btn-change">처벌 변경</button>
          <button class="btn btn-success btn-revoke">처벌 해지</button>
        </div>` : ''}
    `;
    if (isActive) {
      card.querySelector('.btn-revoke').addEventListener('click', () => revokePunishment(p.id, p.user_id, name));
      card.querySelector('.btn-change').addEventListener('click', () => changePunishment(p.id, p.user_id, name, p.type));
    }
    container.appendChild(card);
  });
}

function revokePunishment(punishmentId, userId, userName) {
  document.getElementById('revoke-modal-msg').textContent = `${userName}의 처벌을 정말로 해지하시겠습니까?`;
  document.getElementById('revoke-modal').style.display = 'flex';

  document.getElementById('revoke-confirm-btn').onclick = async () => {
    document.getElementById('revoke-modal').style.display = 'none';
    const { error } = await sb.from('punishments').update({ is_active: false }).eq('id', punishmentId);
    if (error) { alert('해지 실패: ' + error.message); return; }
    await sb.from('notifications').insert({
      user_id: userId,
      type: 'punishment',
      message: '처벌이 해지되었습니다.',
      is_read: false,
    });
    loadUsers();
  };
}

document.getElementById('revoke-cancel-btn').addEventListener('click', () => {
  document.getElementById('revoke-modal').style.display = 'none';
});

function changePunishment(punishmentId, userId, userName, currentType) {
  const typeLabel = { warning: '경고', chat_ban: '채팅금지', suspend: '이용정지', permanent_ban: '영구정지' };
  document.getElementById('change-punish-target').textContent =
    `${userName} · 현재: ${typeLabel[currentType] || currentType}`;

  const sel = document.getElementById('change-punish-select');
  const daysWrap = document.getElementById('change-punish-days-wrap');
  const daysInp = document.getElementById('change-punish-days');

  // 현재 처벌과 같은 타입 비활성화, 첫 번째 활성 옵션 선택
  [...sel.options].forEach(opt => { opt.disabled = opt.value === currentType; opt.selected = false; });
  const firstEnabled = [...sel.options].find(o => !o.disabled);
  if (firstEnabled) firstEnabled.selected = true;

  daysInp.value = '';
  const updateDaysVis = () => {
    const needsDays = sel.value === 'chat_ban' || sel.value === 'suspend';
    daysWrap.style.display = needsDays ? 'flex' : 'none';
  };
  updateDaysVis();
  sel.onchange = updateDaysVis;

  document.getElementById('change-punish-modal').style.display = 'flex';

  document.getElementById('change-punish-confirm-btn').onclick = async () => {
    const type = sel.value;
    const needsDays = type === 'chat_ban' || type === 'suspend';
    const days = needsDays ? parseInt(daysInp.value) : null;
    if (needsDays && (!days || days < 1)) { alert('기간을 입력해주세요. (1일 이상)'); return; }

    document.getElementById('change-punish-modal').style.display = 'none';

    const expiresAt = days ? new Date(Date.now() + days * 86400000).toISOString() : null;

    await sb.from('punishments').update({ is_active: false }).eq('id', punishmentId);

    if (type !== 'warning') {
      const { error } = await sb.from('punishments').insert({
        user_id: userId, type, expires_at: expiresAt, admin_id: currentAdmin.id, is_active: true,
      });
      if (error) { alert('처벌 변경 실패: ' + error.message); return; }
    }

    await sb.from('notifications').insert({
      user_id: userId,
      type: 'punishment',
      message: buildPunishmentMessage(type, expiresAt, null),
      is_read: false,
    });

    loadUsers();
  };
}

document.getElementById('change-punish-cancel-btn').addEventListener('click', () => {
  document.getElementById('change-punish-modal').style.display = 'none';
});

// 문의 목록
document.getElementById('inquiry-status-filter').addEventListener('change', loadInquiries);

async function loadInquiries() {
  const status = document.getElementById('inquiry-status-filter').value;
  const container = document.getElementById('inquiries-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  let query = sb.from('inquiries')
    .select('id, user_id, contact_email, type, title, content, created_at, status, answer, answered_at')
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
    const isGuest = !item.user_id;
    const name = isGuest
      ? `비회원 (${escHtml(item.contact_email || '이메일 없음')})`
      : nameMap[item.user_id] || '알 수 없음';
    const time = new Date(item.created_at).toLocaleString('ko-KR');
    const badgeMap = { pending: 'badge-pending', answered: 'badge-answered', resolved: 'badge-resolved' };
    const labelMap = { pending: '대기중', answered: '답변완료', resolved: '처리됨' };
    const badgeClass = badgeMap[item.status] || 'badge-pending';
    const badgeLabel = labelMap[item.status] || item.status;

    const card = document.createElement('div');
    card.className = 'report-card';
    card.innerHTML = `
      <div class="report-meta">
        <span>문의자: <b>${isGuest ? escHtml(name) : escHtml(name)}</b>${isGuest ? ' <span class="badge badge-dismissed" style="font-size:0.7rem;">비회원</span>' : ''}</span>
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

// ---- FAQ 관리 ----
async function loadAdminFAQs() {
  const container = document.getElementById('faq-admin-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';
  const { data, error } = await sb.from('faqs')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!data?.length) { container.innerHTML = '<div class="empty">등록된 FAQ가 없습니다.</div>'; return; }
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'announce-card';
    card.innerHTML = `
      <div class="announce-card-header">
        <div>
          <div class="announce-card-title">${escHtml(item.question)}</div>
          <div class="announce-card-meta">순서: ${item.sort_order}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button class="btn btn-ghost btn-edit" data-id="${item.id}">✏️ 수정</button>
          <button class="btn btn-danger btn-del" data-id="${item.id}">🗑️ 삭제</button>
        </div>
      </div>
      <div class="announce-card-body">${escHtml(item.answer)}</div>
    `;
    card.querySelector('.btn-edit').addEventListener('click', () => startEditFAQ(item));
    card.querySelector('.btn-del').addEventListener('click', () => deleteFAQ(item.id, item.question));
    container.appendChild(card);
  });
}

function startEditFAQ(item) {
  document.getElementById('faq-edit-id').value = item.id;
  document.getElementById('faq-question-input').value = item.question;
  document.getElementById('faq-answer-input').value = item.answer;
  document.getElementById('faq-order-input').value = item.sort_order ?? 0;
  document.getElementById('faq-form-title').textContent = 'FAQ 수정';
  document.getElementById('faq-cancel-btn').style.display = '';
  document.getElementById('faq-question-input').focus();
  document.getElementById('tab-faq').scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetFAQForm() {
  document.getElementById('faq-edit-id').value = '';
  document.getElementById('faq-question-input').value = '';
  document.getElementById('faq-answer-input').value = '';
  document.getElementById('faq-order-input').value = '0';
  document.getElementById('faq-form-title').textContent = '새 FAQ 추가';
  document.getElementById('faq-cancel-btn').style.display = 'none';
}

document.getElementById('faq-cancel-btn').addEventListener('click', resetFAQForm);

document.getElementById('faq-save-btn').addEventListener('click', async () => {
  const id = document.getElementById('faq-edit-id').value;
  const question = document.getElementById('faq-question-input').value.trim();
  const answer = document.getElementById('faq-answer-input').value.trim();
  const sort_order = parseInt(document.getElementById('faq-order-input').value) || 0;
  if (!question || !answer) { alert('질문과 답변을 입력해주세요.'); return; }
  const btn = document.getElementById('faq-save-btn');
  btn.disabled = true;
  let error;
  if (id) {
    ({ error } = await sb.from('faqs').update({ question, answer, sort_order, updated_at: new Date().toISOString() }).eq('id', id));
  } else {
    ({ error } = await sb.from('faqs').insert({ question, answer, sort_order }));
  }
  btn.disabled = false;
  if (error) { alert('저장 실패: ' + error.message); return; }
  resetFAQForm();
  loadAdminFAQs();
});

async function deleteFAQ(id, question) {
  if (!confirm(`"${question}" FAQ를 삭제하시겠습니까?`)) return;
  const { error } = await sb.from('faqs').delete().eq('id', id);
  if (error) { alert('삭제 실패: ' + error.message); return; }
  loadAdminFAQs();
}

// ---- 활동 로그 ----
document.getElementById('activity-search-btn').addEventListener('click', loadActivityLog);
document.getElementById('activity-search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') loadActivityLog();
});

async function loadActivityLog() {
  const query = document.getElementById('activity-search-input').value.trim();
  const container = document.getElementById('activity-result');
  if (!query) { container.innerHTML = '<div class="empty">닉네임을 입력하세요.</div>'; return; }

  container.innerHTML = '<div class="empty">검색 중...</div>';

  const { data: profiles, error } = await sb.from('profiles')
    .select('id, nickname, display_name, email, created_at')
    .ilike('nickname', `%${query}%`)
    .limit(20);

  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!profiles?.length) { container.innerHTML = '<div class="empty">검색 결과가 없습니다.</div>'; return; }

  if (profiles.length === 1) {
    container.innerHTML = '';
    await renderActivityLog(profiles[0], container);
    return;
  }

  container.innerHTML = `
    <div class="activity-section">
      <div class="activity-section-title">검색 결과 <span class="activity-count">${profiles.length}명</span></div>
      <table class="activity-table">
        <thead><tr><th>닉네임</th><th>이메일</th><th>가입일</th></tr></thead>
        <tbody>
          ${profiles.map(p => `
            <tr class="activity-user-pick" data-id="${p.id}">
              <td>${escHtml(p.nickname || p.display_name || '알 수 없음')}</td>
              <td>${escHtml(p.email || '-')}</td>
              <td>${new Date(p.created_at).toLocaleDateString('ko-KR')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  container.querySelectorAll('.activity-user-pick').forEach(row => {
    row.addEventListener('click', async () => {
      const profile = profiles.find(p => p.id === row.dataset.id);
      if (profile) { container.innerHTML = ''; await renderActivityLog(profile, container); }
    });
  });
}

async function renderActivityLog(profile, container) {
  const name = escHtml(profile.nickname || profile.display_name || '알 수 없음');
  const since90 = new Date(Date.now() - 90 * 86400000).toISOString();
  const sLabel = { pending: '대기중', resolved: '처리됨', dismissed: '기각됨' };
  const sColor = { pending: 'var(--warn)', resolved: 'var(--success)', dismissed: 'var(--text-muted)' };

  // ① 유저 정보
  container.innerHTML = `
    <div class="activity-section">
      <div class="activity-section-title">👤 유저 정보</div>
      <div class="activity-info-grid">
        <div class="activity-info-item"><span class="activity-info-label">닉네임</span><span>${name}</span></div>
        <div class="activity-info-item"><span class="activity-info-label">이메일</span><span>${escHtml(profile.email || '-')}</span></div>
        <div class="activity-info-item"><span class="activity-info-label">가입일</span><span>${profile.created_at ? new Date(profile.created_at).toLocaleDateString('ko-KR') : '-'}</span></div>
      </div>
    </div>
  `;

  // ② 처벌 이력
  const { data: punishments } = await sb.from('punishments')
    .select('id, type, expires_at, created_at, is_active, admin_id')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false });

  if (punishments?.length) {
    const adminIds = [...new Set(punishments.map(p => p.admin_id).filter(Boolean))];
    const adminMap = {};
    if (adminIds.length) {
      const { data: admins } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', adminIds);
      (admins || []).forEach(a => { adminMap[a.id] = a.nickname || a.display_name || a.email?.split('@')[0] || '관리자'; });
    }
    const typeLabel = { warning: '⚠️ 경고', chat_ban: '💬 채팅금지', suspend: '🔒 이용정지', permanent_ban: '🚫 영구정지' };
    const rows = punishments.map(p => {
      const until = p.expires_at ? new Date(p.expires_at).toLocaleDateString('ko-KR') : (p.type === 'permanent_ban' ? '영구' : '-');
      const statusHtml = p.is_active
        ? `<span style="color:var(--danger);font-weight:600;">활성</span>`
        : `<span style="color:var(--text-muted);">해지됨</span>`;
      return `<tr>
        <td>${typeLabel[p.type] || p.type}</td>
        <td>${new Date(p.created_at).toLocaleDateString('ko-KR')}</td>
        <td>${until}</td>
        <td>${escHtml(adminMap[p.admin_id] || '-')}</td>
        <td>${statusHtml}</td>
      </tr>`;
    }).join('');
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">⚖️ 처벌 이력 <span class="activity-count">${punishments.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th>처벌 종류</th><th>처벌일</th><th>만료일</th><th>담당 관리자</th><th>상태</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">⚖️ 처벌 이력 <span class="activity-count">0건</span></div>
        <div class="activity-empty">처벌 이력이 없습니다.</div>
      </div>
    `);
  }

  // ③ 신고 당한 내역
  const { data: reportedList } = await sb.from('reports')
    .select('id, reporter_id, reason, detail, status, created_at')
    .eq('reported_user_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(100);

  if (reportedList?.length) {
    const rIds = [...new Set(reportedList.map(r => r.reporter_id).filter(Boolean))];
    const { data: rp } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', rIds);
    const rMap = {};
    (rp || []).forEach(p => { rMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

    const rResolved = reportedList.filter(r => r.status === 'resolved').length;
    const rDismissed = reportedList.filter(r => r.status === 'dismissed').length;
    const rPending = reportedList.filter(r => r.status === 'pending').length;

    const rows = reportedList.map(r => `<tr>
      <td>${escHtml(rMap[r.reporter_id] || '알 수 없음')}</td>
      <td>${escHtml(r.reason)}</td>
      <td>${r.detail ? escHtml(r.detail) : '-'}</td>
      <td style="color:${sColor[r.status] || 'inherit'};font-weight:600;">${sLabel[r.status] || r.status}</td>
      <td>${new Date(r.created_at).toLocaleDateString('ko-KR')}</td>
    </tr>`).join('');

    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🚨 신고 당한 내역 <span class="activity-count">${reportedList.length}건</span></div>
        <div style="display:flex;gap:16px;margin-bottom:12px;font-size:0.82rem;">
          <span>처리됨 <b style="color:var(--success)">${rResolved}</b></span>
          <span>기각됨 <b style="color:var(--text-muted)">${rDismissed}</b></span>
          <span>대기중 <b style="color:var(--warn)">${rPending}</b></span>
        </div>
        <table class="activity-table">
          <thead><tr><th>신고자</th><th>사유</th><th>상세</th><th>처리 결과</th><th>날짜</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🚨 신고 당한 내역 <span class="activity-count">0건</span></div>
        <div class="activity-empty">신고 당한 내역이 없습니다.</div>
      </div>
    `);
  }

  // ④ 신고 한 내역 (허위신고 반복 여부)
  const { data: reporterList } = await sb.from('reports')
    .select('id, reported_user_id, reason, detail, status, created_at')
    .eq('reporter_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(100);

  if (reporterList?.length) {
    const rdIds = [...new Set(reporterList.map(r => r.reported_user_id).filter(Boolean))];
    const { data: rdp } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', rdIds);
    const rdMap = {};
    (rdp || []).forEach(p => { rdMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음'; });

    const total = reporterList.length;
    const dismissed = reporterList.filter(r => r.status === 'dismissed').length;
    const resolved = reporterList.filter(r => r.status === 'resolved').length;
    const pending = reporterList.filter(r => r.status === 'pending').length;
    const dismissRate = total > 0 ? Math.round((dismissed / total) * 100) : 0;
    const isSuspicious = dismissed >= 3 && dismissRate >= 50;

    const rows = reporterList.map(r => `<tr>
      <td>${escHtml(rdMap[r.reported_user_id] || '알 수 없음')}</td>
      <td>${escHtml(r.reason)}</td>
      <td>${r.detail ? escHtml(r.detail) : '-'}</td>
      <td style="color:${sColor[r.status] || 'inherit'};font-weight:600;">${sLabel[r.status] || r.status}</td>
      <td>${new Date(r.created_at).toLocaleDateString('ko-KR')}</td>
    </tr>`).join('');

    const suspiciousBadge = isSuspicious
      ? `<span style="background:#e0525233;color:var(--danger);font-size:0.73rem;padding:2px 8px;border-radius:10px;font-weight:700;text-transform:none;">⚠️ 허위신고 의심</span>`
      : '';

    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">📢 신고 한 내역 <span class="activity-count">${total}건</span>${suspiciousBadge}</div>
        <div style="display:flex;gap:16px;margin-bottom:12px;font-size:0.82rem;align-items:center;flex-wrap:wrap;">
          <span>처리됨 <b style="color:var(--success)">${resolved}</b></span>
          <span>기각됨 <b style="color:var(--text-muted)">${dismissed}</b></span>
          <span>대기중 <b style="color:var(--warn)">${pending}</b></span>
          <span style="color:${dismissRate >= 50 ? 'var(--danger)' : 'var(--text-muted)'};">기각률 <b>${dismissRate}%</b></span>
        </div>
        <table class="activity-table">
          <thead><tr><th>피신고자</th><th>사유</th><th>상세</th><th>처리 결과</th><th>날짜</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">📢 신고 한 내역 <span class="activity-count">0건</span></div>
        <div class="activity-empty">신고한 내역이 없습니다.</div>
      </div>
    `);
  }

  // ⑤ 채팅 로그 (방 채팅만, DM 제외)
  const { data: chatLogs } = await sb.from('messages')
    .select('room_id, content, created_at')
    .eq('user_id', profile.id)
    .not('room_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(100);

  if (chatLogs?.length) {
    const chatRoomIds = [...new Set(chatLogs.map(m => m.room_id).filter(Boolean))];
    const { data: chatRooms } = await sb.from('rooms').select('id, title').in('id', chatRoomIds);
    const chatRoomMap = {};
    (chatRooms || []).forEach(r => { chatRoomMap[r.id] = r.title; });

    const rows = chatLogs.map(m => `<tr>
      <td style="white-space:nowrap;">${escHtml(chatRoomMap[m.room_id] || '(삭제된 방)')}</td>
      <td>${escHtml(m.content)}</td>
      <td style="white-space:nowrap;">${new Date(m.created_at).toLocaleString('ko-KR')}</td>
    </tr>`).join('');

    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">💬 채팅 로그 <span class="activity-count">최근 ${chatLogs.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th style="width:160px;">방</th><th>메시지</th><th style="width:150px;">시간</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">💬 채팅 로그 <span class="activity-count">0건</span></div>
        <div class="activity-empty">방 채팅 기록이 없습니다.</div>
      </div>
    `);
  }

  // ⑥ 방 입장 로그
  const { data: entryLogs } = await sb.from('room_entry_logs')
    .select('room_id, entered_at')
    .eq('user_id', profile.id)
    .gte('entered_at', since90)
    .order('entered_at', { ascending: false })
    .limit(100);

  if (entryLogs?.length) {
    const roomIds = [...new Set(entryLogs.map(e => e.room_id).filter(Boolean))];
    const { data: rooms } = await sb.from('rooms').select('id, title, game_name, category, location').in('id', roomIds);
    const roomMap = {};
    (rooms || []).forEach(r => { roomMap[r.id] = r; });

    const rows = entryLogs.map(e => {
      const room = roomMap[e.room_id] || {};
      const showLoc = room.category === '개인소유' || room.category === '보드게임방';
      return `<tr>
        <td>${escHtml(room.title || '(삭제된 방)')}</td>
        <td>${escHtml(room.game_name || '-')}</td>
        <td>${escHtml(room.category || '-')}</td>
        <td>${showLoc ? escHtml(room.location || '-') : '-'}</td>
        <td style="white-space:nowrap;">${new Date(e.entered_at).toLocaleString('ko-KR')}</td>
      </tr>`;
    }).join('');

    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🚪 방 입장 로그 <span class="activity-count">${entryLogs.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th>방 제목</th><th>게임</th><th>카테고리</th><th>장소</th><th>입장 시간</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🚪 방 입장 로그 <span class="activity-count">0건</span></div>
        <div class="activity-empty">최근 90일 입장 기록이 없습니다.</div>
      </div>
    `);
  }

  // ⑦ 만든 방 목록
  const { data: createdRooms } = await sb.from('rooms')
    .select('id, title, game_name, category, location, created_at')
    .eq('host_id', profile.id)
    .gte('created_at', since90)
    .order('created_at', { ascending: false })
    .limit(100);

  if (createdRooms?.length) {
    const rows = createdRooms.map(r => {
      const showLoc = r.category === '개인소유' || r.category === '보드게임방';
      return `<tr>
        <td>${escHtml(r.title)}</td>
        <td>${escHtml(r.game_name || '-')}</td>
        <td>${escHtml(r.category || '-')}</td>
        <td>${showLoc ? escHtml(r.location || '-') : '-'}</td>
        <td style="white-space:nowrap;">${new Date(r.created_at).toLocaleString('ko-KR')}</td>
      </tr>`;
    }).join('');

    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🏠 만든 방 목록 <span class="activity-count">${createdRooms.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th>방 제목</th><th>게임</th><th>카테고리</th><th>장소</th><th>생성 시간</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `);
  } else {
    container.insertAdjacentHTML('beforeend', `
      <div class="activity-section">
        <div class="activity-section-title">🏠 만든 방 목록 <span class="activity-count">0건</span></div>
        <div class="activity-empty">최근 90일 생성한 방이 없습니다.</div>
      </div>
    `);
  }
}

// ---- 이메일 블랙리스트 ----
async function loadBannedEmails() {
  const container = document.getElementById('banned-emails-list');
  container.innerHTML = '<div class="empty">로딩 중...</div>';

  const { data, error } = await sb.from('banned_emails')
    .select('id, email, reason, can_rejoin_at, banned_at')
    .order('banned_at', { ascending: false });

  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!data?.length) { container.innerHTML = '<div class="empty">블랙리스트 이메일이 없습니다.</div>'; return; }

  const reasonLabel = {
    punishment_evasion: '⚠️ 처벌 이력 (영구)',
    cooldown: '⏳ 탈퇴 후 재가입 대기',
  };

  container.innerHTML = '';
  data.forEach(item => {
    const bannedDate = new Date(item.banned_at).toLocaleDateString('ko-KR');
    const canRejoin = item.can_rejoin_at ? new Date(item.can_rejoin_at).toLocaleDateString('ko-KR') : '영구';
    const isExpired = item.can_rejoin_at && new Date(item.can_rejoin_at) <= new Date();

    const card = document.createElement('div');
    card.className = 'user-card';
    card.innerHTML = `
      <div class="user-info">
        <b>${escHtml(item.email)}</b>${isExpired ? '<span class="badge-revoked" style="margin-left:6px;">만료됨</span>' : ''}
        <small>${reasonLabel[item.reason] || item.reason} &nbsp;|&nbsp; 등록일: ${bannedDate} &nbsp;|&nbsp; 재가입 가능: ${canRejoin}</small>
      </div>
      <button class="btn btn-success" style="flex-shrink:0;font-size:0.82rem;">해제</button>
    `;
    card.querySelector('.btn-success').addEventListener('click', () => unbanEmail(item.id, item.email));
    container.appendChild(card);
  });
}

async function unbanEmail(id, email) {
  if (!confirm(`"${email}" 의 블랙리스트를 해제하시겠습니까?\n해제 시 즉시 재가입이 가능해집니다.`)) return;
  const { error } = await sb.from('banned_emails').delete().eq('id', id);
  if (error) { alert('해제 실패: ' + error.message); return; }
  loadBannedEmails();
}

function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── 길드 로그 ────────────────────────────────────────────────────────────

document.getElementById('guild-log-search-btn').addEventListener('click', loadGuildLog);
document.getElementById('guild-log-search-input').addEventListener('keydown', e => { if (e.key === 'Enter') loadGuildLog(); });

async function loadGuildLog() {
  const query = document.getElementById('guild-log-search-input').value.trim();
  const container = document.getElementById('guild-log-result');
  if (!query) { container.innerHTML = '<div class="empty">길드 이름을 입력하세요.</div>'; return; }
  container.innerHTML = '<div class="empty">검색 중...</div>';

  const { data: guilds, error } = await sb.from('guilds')
    .select('id, name, description')
    .ilike('name', `%${query}%`)
    .limit(20);
  if (error) { container.innerHTML = `<div class="empty">오류: ${error.message}</div>`; return; }
  if (!guilds?.length) { container.innerHTML = '<div class="empty">검색 결과가 없습니다.</div>'; return; }

  if (guilds.length === 1) {
    container.innerHTML = '';
    await renderGuildLog(guilds[0], container);
    return;
  }

  container.innerHTML = `
    <div class="activity-section">
      <div class="activity-section-title">검색 결과 <span class="activity-count">${guilds.length}개</span></div>
      <table class="activity-table">
        <thead><tr><th>길드명</th><th>설명</th></tr></thead>
        <tbody>
          ${guilds.map(g => `
            <tr class="activity-user-pick" data-id="${g.id}">
              <td>${escHtml(g.name)}</td>
              <td>${escHtml(g.description || '-')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  container.querySelectorAll('.activity-user-pick').forEach(row => {
    row.addEventListener('click', async () => {
      const guild = guilds.find(g => g.id === row.dataset.id);
      if (guild) { container.innerHTML = ''; await renderGuildLog(guild, container); }
    });
  });
}

const ACTION_LABEL = {
  yellow_card_issued: '🟡 옐로카드 부여',
  yellow_card_revoked: '⬜ 옐로카드 해지',
  red_card_issued: '🔴 레드카드 부여',
  kick: '🚫 강퇴',
  role_change: '🔧 등급 변경',
  join_approved: '✅ 가입 승인',
  join_rejected: '❌ 가입 거절',
};

function fmtDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

function fmtDateTime(iso) {
  const d = new Date(iso);
  return `${fmtDate(iso)} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}

async function renderGuildLog(guild, container) {
  const since90 = new Date(Date.now() - 90 * 86400000).toISOString();

  container.innerHTML = `
    <div class="activity-section">
      <div class="activity-section-title">🏰 ${escHtml(guild.name)}</div>
      <div class="activity-info-grid">
        <div class="activity-info-item"><span class="activity-info-label">설명</span><span>${escHtml(guild.description || '-')}</span></div>
        <div class="activity-info-item"><span class="activity-info-label">조회 기간</span><span>최근 90일</span></div>
      </div>
    </div>
    <div id="guild-action-log-section"></div>
    <div id="guild-chat-log-section"></div>
  `;

  // ① 액션 로그
  const { data: logs } = await sb.from('guild_logs')
    .select('id, actor_id, target_id, action_type, detail, created_at')
    .eq('guild_id', guild.id)
    .gte('created_at', since90)
    .order('created_at', { ascending: false })
    .limit(500);

  const actionSection = container.querySelector('#guild-action-log-section');
  if (logs?.length) {
    const actorIds = [...new Set([...logs.map(l => l.actor_id), ...logs.map(l => l.target_id)].filter(Boolean))];
    const { data: profiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', actorIds);
    const pMap = {};
    (profiles || []).forEach(p => { pMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '?'; });

    actionSection.innerHTML = `
      <div class="activity-section">
        <div class="activity-section-title">⚙️ 운영 로그 <span class="activity-count">${logs.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th>날짜</th><th>구분</th><th>집행자</th><th>대상</th><th>내용</th></tr></thead>
          <tbody>
            ${logs.map(l => `
              <tr>
                <td style="white-space:nowrap;">${fmtDate(l.created_at)}</td>
                <td style="white-space:nowrap;">${ACTION_LABEL[l.action_type] || l.action_type}</td>
                <td>${escHtml(pMap[l.actor_id] || '-')}</td>
                <td>${escHtml(pMap[l.target_id] || '-')}</td>
                <td>${escHtml(l.detail || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else {
    actionSection.innerHTML = `
      <div class="activity-section">
        <div class="activity-section-title">⚙️ 운영 로그 <span class="activity-count">0건</span></div>
        <div class="empty" style="padding:12px 0;">최근 90일간 운영 로그가 없습니다.</div>
      </div>
    `;
  }

  // ② 채팅 로그
  const { data: chats } = await sb.from('guild_messages')
    .select('id, user_id, content, created_at')
    .eq('guild_id', guild.id)
    .gte('created_at', since90)
    .order('created_at', { ascending: false })
    .limit(500);

  const chatSection = container.querySelector('#guild-chat-log-section');
  if (chats?.length) {
    const chatUserIds = [...new Set(chats.map(c => c.user_id).filter(Boolean))];
    const { data: chatProfiles } = await sb.from('profiles').select('id, nickname, display_name, email').in('id', chatUserIds);
    const cpMap = {};
    (chatProfiles || []).forEach(p => { cpMap[p.id] = p.nickname || p.display_name || p.email?.split('@')[0] || '?'; });

    chatSection.innerHTML = `
      <div class="activity-section">
        <div class="activity-section-title">💬 채팅 로그 <span class="activity-count">${chats.length}건</span></div>
        <table class="activity-table">
          <thead><tr><th>날짜·시간</th><th>닉네임</th><th>내용</th></tr></thead>
          <tbody>
            ${chats.map(c => `
              <tr>
                <td style="white-space:nowrap;">${fmtDateTime(c.created_at)}</td>
                <td style="white-space:nowrap;">${escHtml(cpMap[c.user_id] || '-')}</td>
                <td style="word-break:break-all;">${escHtml(c.content)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } else {
    chatSection.innerHTML = `
      <div class="activity-section">
        <div class="activity-section-title">💬 채팅 로그 <span class="activity-count">0건</span></div>
        <div class="empty" style="padding:12px 0;">최근 90일간 채팅 기록이 없습니다.</div>
      </div>
    `;
  }
}

// ── 전체 유저 목록 ────────────────────────────────────────────────────────

document.getElementById('user-list-search-btn').addEventListener('click', loadUserList);
document.getElementById('user-list-search').addEventListener('keydown', e => { if (e.key === 'Enter') loadUserList(); });
document.getElementById('user-list-sort').addEventListener('change', loadUserList);

async function loadUserList() {
  const container = document.getElementById('user-list-table');
  const countEl = document.getElementById('user-list-count');
  const search = document.getElementById('user-list-search').value.trim();
  const sort = document.getElementById('user-list-sort').value;

  container.innerHTML = '<div class="empty">로딩 중...</div>';
  countEl.textContent = '';

  const sortOpts = {
    created_at: { ascending: false },
    last_seen:  { ascending: false, nullsFirst: false },
    nickname:   { ascending: true },
  };
  const { ascending, nullsFirst } = sortOpts[sort] ?? { ascending: false };

  let baseQuery = sb.from('profiles').select('id, nickname, display_name, email, provider, created_at, last_seen, online_status');
  if (search) baseQuery = baseQuery.ilike('nickname', `%${search}%`);

  let countQuery = sb.from('profiles').select('id', { count: 'exact', head: true });
  if (search) countQuery = countQuery.ilike('nickname', `%${search}%`);

  const [{ data: profiles, error }, { count }] = await Promise.all([
    baseQuery.order(sort, { ascending, nullsFirst }).limit(200),
    countQuery,
  ]);

  if (error) {
    // Retry without potentially missing columns
    const { data: fallback, error: err2 } = await sb.from('profiles')
      .select('id, nickname, display_name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(200);
    if (err2) { container.innerHTML = `<div class="empty">오류: ${err2.message}</div>`; return; }
    renderUserListTable(fallback, count, container, countEl);
    return;
  }

  renderUserListTable(profiles, count, container, countEl);
}

function renderUserListTable(profiles, count, container, countEl) {
  const total = count ?? profiles?.length ?? 0;
  const shown = profiles?.length ?? 0;
  countEl.textContent = `총 ${total}명${shown < total ? ` (상위 ${shown}명 표시)` : ''}`;

  if (!profiles?.length) { container.innerHTML = '<div class="empty">유저가 없습니다.</div>'; return; }

  const providerLabel = { google: '🔵 Google', discord: '🟣 Discord' };
  const statusLabel   = { online: '🟢 온라인', away: '🟡 자리비움', offline: '⚫ 오프라인' };

  const rows = profiles.map((p, i) => {
    const name     = p.nickname || p.display_name || p.email?.split('@')[0] || '알 수 없음';
    const provider = providerLabel[p.provider] ?? (p.provider ? escHtml(p.provider) : '-');
    const joined   = p.created_at ? new Date(p.created_at).toLocaleDateString('ko-KR') : '-';
    const lastSeen = p.last_seen  ? new Date(p.last_seen).toLocaleString('ko-KR')       : '-';
    const status   = statusLabel[p.online_status] ?? '⚫ 오프라인';
    return `<tr class="activity-user-pick" data-idx="${i}">
      <td>${escHtml(name)}</td>
      <td>${escHtml(p.email || '-')}</td>
      <td>${provider}</td>
      <td>${joined}</td>
      <td>${lastSeen}</td>
      <td>${status}</td>
    </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="activity-section">
      <table class="activity-table">
        <thead><tr><th>닉네임</th><th>이메일</th><th>로그인 방식</th><th>가입일</th><th>마지막 접속</th><th>상태</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  container.querySelectorAll('.activity-user-pick').forEach(row => {
    row.addEventListener('click', () => {
      const profile = profiles[parseInt(row.dataset.idx)];
      if (!profile) return;
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelector('.tab[data-tab="activity"]').classList.add('active');
      showTab('activity');
      const actContainer = document.getElementById('activity-result');
      actContainer.innerHTML = '';
      renderActivityLog(profile, actContainer);
    });
  });
}

init();
