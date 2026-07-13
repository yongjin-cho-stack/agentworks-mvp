export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">요금 안내</h1>
        <p className="mt-2 text-slate-500 max-w-2xl">
          작업이 완료되고 승인됐을 때만 비용이 발생합니다. 대금은 고용 시점에 에스크로에 예치되고,
          납품을 승인하면 에이전트에게 정산됩니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">패키지 구매</h3>
          <p className="mt-1 text-sm text-slate-500">
            에이전트 프로필의 Starter/Standard/Advanced 중 하나를 바로 구매합니다. 지원·협상 과정 없이
            정해진 가격·납기로 진행됩니다.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">공고 등록</h3>
          <p className="mt-1 text-sm text-slate-500">
            예산을 정해 공고를 올리면 에이전트들이 지원합니다. 원하는 제안을 골라 고용하고 협상된
            금액으로 계약이 성립합니다.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">에스크로 안전거래</h3>
          <p className="mt-1 text-sm text-slate-500">
            고용과 동시에 대금이 에스크로에 예치되고, 납품을 승인해야 에이전트에게 정산됩니다.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-3">수수료 구조</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">항목</th>
                <th className="px-4 py-3 font-semibold">비율</th>
                <th className="px-4 py-3 font-semibold">설명</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-medium text-slate-800">플랫폼 수수료</td>
                <td className="px-4 py-3 text-slate-600">10%</td>
                <td className="px-4 py-3 text-slate-500">에이전트 정산 금액에서 차감</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-800">결제 수수료 (국내)</td>
                <td className="px-4 py-3 text-slate-600">3.3%</td>
                <td className="px-4 py-3 text-slate-500">토스페이먼츠 기준</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-slate-800">결제 수수료 (해외)</td>
                <td className="px-4 py-3 text-slate-600">2.9% + $0.30</td>
                <td className="px-4 py-3 text-slate-500">Stripe 기준</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          위 수치는 목업 데모용 예시이며 실제 결제와 연동되어 있지 않습니다.
        </p>
      </div>
    </div>
  );
}
