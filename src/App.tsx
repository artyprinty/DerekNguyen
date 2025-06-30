import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import CurrencyConverter from './components/CurrencyConverter'
import RatioCalculator from './components/RatioCalculator'
import PercentageIncreaseCalculator from './components/PercentageIncreaseCalculator'
import RatioCalcPage from './components/RatioCalcPage'
import DifferenceCalculatorPage from './components/DifferenceCalculatorPage'
import PercentChangePage from './components/PercentChangePage'
import PercentOfTotalPage from './components/PercentOfTotalPage'
import MarkupMarginPage from './components/MarkupMarginPage'
import ProportionSolverPage from './components/ProportionSolverPage'
import ReversePercentPage from './components/ReversePercentPage'
import BreakdownPercentPage from './components/BreakdownPercentPage'
import SimplifyRatioPage from './components/SimplifyRatioPage'
import WeightedAveragePage from './components/WeightedAveragePage'
import RuleOfThreePage from './components/RuleOfThreePage'
import UnitRatePage from './components/UnitRatePage'
import WorkingDaysPage from './components/WorkingDaysPage'
import SpeedRatePage from './components/SpeedRatePage'
import WhatIfCostCPIPage from './components/WhatIfCostCPIPage'
import WhatIfTimelinePage from './components/WhatIfTimelinePage'
import WhatIfQuoteBreakdownPage from './components/WhatIfQuoteBreakdownPage'
import WhatIfSoftLaunchPage from './components/WhatIfSoftLaunchPage'
import WhatIfQuotaPage from './components/WhatIfQuotaPage'
import WhatIfMarketingMathPage from './components/WhatIfMarketingMathPage'
import RevenueForecastPage from './components/RevenueForecastPage'
import RevenueForecastsPage from './components/RevenueForecastsPage'
import ABTestDashboard from './components/ABTestDashboard'
import CorrelationMatrixDashboard from './components/CorrelationMatrixDashboard'
import GroupComparisonBoxplotDashboard from './components/GroupComparisonBoxplotDashboard'
import TwoNumberCalculator from './components/TwoNumberCalculator'
import ExtrapolationDashboard from './components/ExtrapolationDashboard'
import ExtrapolationPage from './components/ExtrapolationPage'
// import ArticlesCharts2025 from '@articles/App'
import AllCalculatorsPage from './components/AllCalculatorsPage'
import WhatIfCalculatorsPage from './components/WhatIfCalculatorsPage'
import LiveMarketingMathPage from './components/LiveMarketingMathPage'
import StatisticalAnalysisPage from './components/StatisticalAnalysisPage'

function App() {
  return (
    <Router basename="/DerekNguyen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/currency" replace />} />
          <Route path="currency" element={<CurrencyConverter />} />
          <Route path="ratio" element={<RatioCalculator />} />
          <Route path="increase" element={<PercentageIncreaseCalculator />} />
          <Route path="all-calculators" element={<AllCalculatorsPage />}>
            <Route index element={<Navigate to="ratio-calc" replace />} />
            <Route path="ratio-calc" element={<RatioCalcPage />} />
            <Route path="difference" element={<DifferenceCalculatorPage />} />
            <Route path="percent-change" element={<PercentChangePage />} />
            <Route path="percent-of-total" element={<PercentOfTotalPage />} />
            <Route path="markup-margin" element={<MarkupMarginPage />} />
            <Route path="proportion-solver" element={<ProportionSolverPage />} />
            <Route path="reverse-percent" element={<ReversePercentPage />} />
            <Route path="breakdown-percent" element={<BreakdownPercentPage />} />
            <Route path="simplify-ratio" element={<SimplifyRatioPage />} />
            <Route path="weighted-average" element={<WeightedAveragePage />} />
            <Route path="rule-of-3" element={<RuleOfThreePage />} />
            <Route path="unit-rate" element={<UnitRatePage />} />
            <Route path="working-days" element={<WorkingDaysPage />} />
          </Route>
          <Route path="speed-rate" element={<SpeedRatePage />} />
          <Route path="what-if" element={<WhatIfCalculatorsPage />}>
            <Route index element={<Navigate to="whatif-cost-cpi" replace />} />
            <Route path="whatif-cost-cpi" element={<WhatIfCostCPIPage />} />
            <Route path="whatif-timeline" element={<WhatIfTimelinePage />} />
            <Route path="whatif-quote-breakdown" element={<WhatIfQuoteBreakdownPage />} />
            <Route path="whatif-soft-launch" element={<WhatIfSoftLaunchPage />} />
            <Route path="whatif-quota" element={<WhatIfQuotaPage />} />
            <Route path="whatif-marketing-math" element={<WhatIfMarketingMathPage />} />
          </Route>
          <Route path="revenue-forecasts" element={<RevenueForecastsPage />}>
            <Route index element={<Navigate to="revenue-forecast" replace />} />
            <Route path="revenue-forecast" element={<RevenueForecastPage />} />
          </Route>
          <Route path="statistical-analysis" element={<StatisticalAnalysisPage />}>
            <Route index element={<Navigate to="ab-test" replace />} />
            <Route path="ab-test" element={<ABTestDashboard />} />
            <Route path="correlation-matrix" element={<CorrelationMatrixDashboard />} />
            <Route path="group-boxplot" element={<GroupComparisonBoxplotDashboard />} />
          </Route>
          <Route path="two-number-calculator" element={<TwoNumberCalculator />} />
          <Route path="extrapolation" element={<ExtrapolationPage />}>
            <Route index element={<Navigate to="extrapolation-calculator" replace />} />
            <Route path="extrapolation-calculator" element={<ExtrapolationDashboard />} />
          </Route>
          {/* <Route path="articles/*" element={<ArticlesCharts2025 />} /> */}
          <Route path="live-marketing-math" element={<LiveMarketingMathPage />}>
            <Route index element={<Navigate to="whatif-marketing-math" replace />} />
            <Route path="whatif-marketing-math" element={<WhatIfMarketingMathPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App 