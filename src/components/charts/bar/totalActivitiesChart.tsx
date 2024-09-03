'use client';

import { YearlySummaryChartData } from '@/components/charts/bar/types';
import { time } from '@/shared/types/time';
import React from 'react';
import { YearlySummaryChart } from '@/components/charts/bar/index';
import { numberFormat } from '@/shared/formatting';

const TotalActivities = ({ data }: { data: YearlySummaryChartData[] }) => (
  <YearlySummaryChart
    title="Total activities"
    tickFormatter={value => numberFormat(value).toString()}
    toolTipFormatter={value => `${numberFormat(value)}`}
    yAxisDataKey="total_activities"
    chartType="line-chart"
    data={data}
  />
);
export { TotalActivities };
