'use client';

import { YearlySummaryChartData } from '@/components/charts/bar/types';
import React from 'react';
import { YearlySummaryChart } from '@/components/charts/bar/index';
import { numberFormat } from '@/shared/formatting';

const TotalAchievementsSummary = ({
  data
}: {
  data: YearlySummaryChartData[];
}) => (
  <YearlySummaryChart
    title="Total achievements"
    tickFormatter={value => numberFormat(value).toString()}
    toolTipFormatter={value => `${numberFormat(value)}`}
    yAxisDataKey="total_achievements"
    chartType="line-chart"
    data={data}
  />
);
export { TotalAchievementsSummary };
