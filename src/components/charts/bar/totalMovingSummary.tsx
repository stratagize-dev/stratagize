'use client';

import { YearlySummaryChartData } from '@/components/charts/bar/types';
import { time } from '@/shared/types/time';
import React from 'react';
import { YearlySummaryChart } from '@/components/charts/bar/index';

const TotalMovingSummary = ({ data }: { data: YearlySummaryChartData[] }) => (
  <YearlySummaryChart
    title="Total moving time"
    tickFormatter={value => time(value)().duration.hours.toString()}
    toolTipFormatter={value => time(value as number)().human}
    yAxisDataKey="total_moving_time"
    chartType="bar-chart"
    data={data}
  />
);
export { TotalMovingSummary };
