'use client';

import { YearlySummaryChartData } from '@/components/charts/bar/types';
import React from 'react';
import { YearlySummaryChart } from '@/components/charts/bar/index';
import { numberFormat } from '@/shared/formatting';

const TotalElevationsSummary = ({
  data
}: {
  data: YearlySummaryChartData[];
}) => (
  <YearlySummaryChart
    title="Total elevation"
    tickFormatter={value => numberFormat(value).toString()}
    toolTipFormatter={value => `${numberFormat(value)} m`}
    yAxisDataKey="total_elevation_gain"
    chartType="bar-chart"
    data={data}
  />
);
export { TotalElevationsSummary };
