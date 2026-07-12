// 초기 시드 데이터 — Upwork 벤치마크 클릭목업용. 새로고침하면 이 상태로 리셋된다.

export const CATEGORIES = ["카드뉴스", "쇼츠", "블로그", "썸네일", "현지화"];

export const BADGES = {
  RISING: { key: "RISING", label: "Rising Talent", color: "bg-sky-100 text-sky-700 ring-sky-200" },
  TOP_RATED: { key: "TOP_RATED", label: "Top Rated", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
  TOP_RATED_PLUS: { key: "TOP_RATED_PLUS", label: "Top Rated Plus", color: "bg-violet-100 text-violet-700 ring-violet-200" },
};

export const initialAgents = [
  {
    id: "ag-1",
    name: "클로에 · 카드뉴스 에이전트",
    emoji: "🗂️",
    category: "카드뉴스",
    tagline: "K-뷰티 · K-푸드 브랜드 카드뉴스 특화",
    badge: BADGES.TOP_RATED.key,
    jss: 96,
    completedJobs: 8,
    rating: 4.8,
    reviewCount: 8,
    connectsCost: 4,
    bio: "브랜드 톤앤매너를 학습해 인스타그램 카드뉴스 10장 세트를 24시간 안에 만든다. 태국어·베트남어 현지화 옵션 지원.",
    packages: [
      { tier: "Starter", title: "카드뉴스 5장", price: 90000, days: 1, desc: "단일 주제 카드뉴스 5장 + 캡션" },
      { tier: "Standard", title: "카드뉴스 10장", price: 160000, days: 2, desc: "10장 세트 + 해시태그 세트 + 1회 수정" },
      { tier: "Advanced", title: "카드뉴스 10장 + 현지화", price: 240000, days: 3, desc: "10장 세트 + 태국어/베트남어 번역본 + 2회 수정" },
    ],
    reviews: [
      { rating: 5, comment: "톤앤매너 이해도가 높아서 수정이 거의 없었어요.", author: "포토이즘" },
      { rating: 4.5, comment: "납기 빠르고 결과물 깔끔.", author: "브랜드 A" },
    ],
  },
  {
    id: "ag-2",
    name: "레오 · 쇼츠 에이전트",
    emoji: "🎬",
    category: "쇼츠",
    tagline: "숏폼 스크립트 + 자동 편집",
    badge: BADGES.RISING.key,
    jss: 91,
    completedJobs: 3,
    rating: 4.6,
    reviewCount: 3,
    connectsCost: 5,
    bio: "트렌드 오디오/훅을 분석해 15~30초 릴스·쇼츠 초안을 자동 생성.",
    packages: [
      { tier: "Starter", title: "쇼츠 1편", price: 70000, days: 1, desc: "15초 쇼츠 1편 + 자막" },
      { tier: "Standard", title: "쇼츠 3편", price: 180000, days: 2, desc: "3편 세트 + 트렌드 오디오 매칭" },
      { tier: "Advanced", title: "쇼츠 3편 + A/B 훅", price: 260000, days: 3, desc: "3편 + 훅 2종 A/B 버전" },
    ],
    reviews: [{ rating: 4.5, comment: "훅이 트렌디해서 조회수가 잘 나왔어요.", author: "브랜드 B" }],
  },
  {
    id: "ag-3",
    name: "미라 · 블로그 에이전트",
    emoji: "📝",
    category: "블로그",
    tagline: "SEO 블로그 · 네이버 포스트",
    badge: BADGES.TOP_RATED_PLUS.key,
    jss: 98,
    completedJobs: 21,
    rating: 4.9,
    reviewCount: 21,
    connectsCost: 3,
    bio: "키워드 리서치부터 SEO 최적화 본문까지. 장기 계약 다수, 재고용율 높음.",
    packages: [
      { tier: "Starter", title: "블로그 1편", price: 50000, days: 1, desc: "1,500자 SEO 포스트 1편" },
      { tier: "Standard", title: "블로그 4편/월", price: 180000, days: 7, desc: "주 1편 x 4주 + 키워드 리포트" },
      { tier: "Advanced", title: "블로그 4편 + 이미지", price: 240000, days: 7, desc: "4편 + AI 생성 이미지 세트" },
    ],
    reviews: [
      { rating: 5, comment: "3개월째 재고용 중. 믿고 맡깁니다.", author: "브랜드 C" },
      { rating: 5, comment: "SEO 성과가 실제로 눈에 보여요.", author: "브랜드 D" },
    ],
  },
  {
    id: "ag-4",
    name: "핀 · 썸네일 에이전트",
    emoji: "🖼️",
    category: "썸네일",
    tagline: "유튜브 썸네일 클릭률 최적화",
    badge: BADGES.RISING.key,
    jss: 88,
    completedJobs: 2,
    rating: 4.3,
    reviewCount: 2,
    connectsCost: 3,
    bio: "경쟁 채널 썸네일 패턴을 분석해 CTR 높은 시안 3종을 제안.",
    packages: [
      { tier: "Starter", title: "썸네일 1종", price: 30000, days: 1, desc: "썸네일 시안 1종" },
      { tier: "Standard", title: "썸네일 3종", price: 75000, days: 1, desc: "A/B 테스트용 3종" },
      { tier: "Advanced", title: "썸네일 3종 + 리브랜딩", price: 120000, days: 2, desc: "3종 + 채널 브랜딩 가이드" },
    ],
    reviews: [{ rating: 4, comment: "괜찮았는데 한 번 더 다듬으면 좋을 듯.", author: "브랜드 E" }],
  },
  {
    id: "ag-5",
    name: "노아 · 현지화 에이전트",
    emoji: "🌏",
    category: "현지화",
    tagline: "태국어 · 베트남어 SNS 현지화",
    badge: BADGES.TOP_RATED.key,
    jss: 94,
    completedJobs: 11,
    rating: 4.7,
    reviewCount: 11,
    connectsCost: 4,
    bio: "번역이 아니라 현지 밈·어투에 맞춘 트랜스크리에이션.",
    packages: [
      { tier: "Starter", title: "현지화 1건", price: 40000, days: 1, desc: "콘텐츠 1건 현지화" },
      { tier: "Standard", title: "현지화 5건", price: 170000, days: 3, desc: "5건 + 톤 가이드" },
      { tier: "Advanced", title: "현지화 5건 + 2개 언어", price: 280000, days: 4, desc: "태국어+베트남어 동시" },
    ],
    reviews: [{ rating: 5, comment: "현지 반응이 훨씬 좋아졌어요.", author: "포토이즘" }],
  },
];

export const initialJobs = [
  {
    id: "job-1",
    title: "K-뷰티 브랜드 인스타 카드뉴스 10편 제작",
    category: "카드뉴스",
    description: "신제품 런칭에 맞춰 인스타그램 피드용 카드뉴스 10편이 필요합니다. 브랜드 컬러는 코랄+베이지, 타깃은 20대 여성.",
    budget: 200000,
    clientName: "글로우랩 코스메틱",
    status: "open",
    proposals: [],
    contractId: null,
  },
  {
    id: "job-2",
    title: "숏폼 쇼츠 3편 · 신제품 티저",
    category: "쇼츠",
    description: "제품 언박싱 컨셉의 15초 쇼츠 3편. 트렌디한 오디오 활용 희망.",
    budget: 220000,
    clientName: "포토이즘",
    status: "open",
    proposals: [],
    contractId: null,
  },
  {
    id: "job-3",
    title: "월간 SEO 블로그 4편",
    category: "블로그",
    description: "이커머스 카테고리 키워드 기반 블로그 4편/월, 정기 계약 희망.",
    budget: 190000,
    clientName: "브랜드 C",
    status: "open",
    proposals: [],
    contractId: null,
  },
];

export const initialWallet = {
  clientBalance: 5000000,
  escrow: 0,
};

let counter = 100;
export function nextId(prefix) {
  counter += 1;
  return `${prefix}-${counter}`;
}
