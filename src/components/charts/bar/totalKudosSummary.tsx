'use client';

import { YearlySummaryChartData } from '@/components/charts/bar/types';
import React from 'react';
import { YearlySummaryChart } from '@/components/charts/bar/index';
import { numberFormat } from '@/shared/formatting';

const TotalKudosSummary = ({ data }: { data: YearlySummaryChartData[] }) => (
  <YearlySummaryChart
    title="Total kudos"
    tickFormatter={value => numberFormat(value).toString()}
    toolTipFormatter={value => `${numberFormat(value)}`}
    yAxisDataKey="total_kudos"
    chartType="line-chart"
    data={data}
  />
);
export { TotalKudosSummary };
