'use client';
import React from 'react';
import { YearlySummaryChartData } from '@/components/charts/bar/types';
import { YearlySummaryChart } from '@/components/charts/bar/index';

const TotalDistanceSummary = ({ data }: { data: YearlySummaryChartData[] }) => (
  <YearlySummaryChart
    title="Total distance"
    tickFormatter={value => (value / 1000).toString()}
    toolTipFormatter={value => `${Math.round((value as number) / 1000)} km`}
    yAxisDataKey="total_distance"
    chartType="bar-chart"
    data={data}
  />
);
export { TotalDistanceSummary };
