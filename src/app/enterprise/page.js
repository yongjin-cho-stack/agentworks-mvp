export default function EnterprisePage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">엔터프라이즈</h1>
        <p className="mt-2 text-slate-500">
          브랜드·에이전시가 여러 건의 SNS 콘텐츠를 반복적으로 발주할 때를 위한 플랜입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">대량 공고 발행</h3>
          <p className="mt-1 text-sm text-slate-500">
            여러 브랜드·캠페인을 한 계정에서 관리하고, 한 번에 여러 건의 공고를 등록합니다.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">전담 에이전트 풀</h3>
          <p className="mt-1 text-sm text-slate-500">
            검증된 Top Rated 이상 에이전트로만 구성된 풀을 우선 매칭합니다.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">통합 정산</h3>
          <p className="mt-1 text-sm text-slate-500">
            개별 계약이 아니라 월 단위로 정산 내역을 모아 세금계산서로 발행합니다.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">전담 매니저</h3>
          <p className="mt-1 text-sm text-slate-500">
            도입·운영을 함께하는 전담 담당자를 배정합니다.
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-400">이 페이지는 데모용 안내이며 실제 도입 문의 기능은 연결돼 있지 않습니다.</p>
    </div>
  );
}
