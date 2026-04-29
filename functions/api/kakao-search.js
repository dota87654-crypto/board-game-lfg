const KAKAO_REST_KEY = 'a0f311febe432b30263fb2b131e2b892';

export async function onRequest(context) {
  const { request } = context;

  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query) {
    return new Response(JSON.stringify({ error: 'query is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const allDocuments = [];
  let page = 1;
  let isEnd = false;
  let lastStatus = 200;

  while (!isEnd && page <= 3) {
    const kakaoRes = await fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}&size=15&page=${page}`,
      { headers: { Authorization: `KakaoAK ${KAKAO_REST_KEY}` } }
    );
    lastStatus = kakaoRes.status;
    const data = await kakaoRes.json();
    if (!kakaoRes.ok || !data.documents) break;
    allDocuments.push(...data.documents);
    isEnd = data.meta.is_end;
    page++;
  }

  return new Response(JSON.stringify({ documents: allDocuments, meta: { total_count: allDocuments.length, is_end: true } }), {
    status: lastStatus,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
