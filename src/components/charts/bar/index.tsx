'use client';
import React from 'react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { tailwindConfig } from '@/shared/tailwindConfig';
import { YearlySummaryChartData } from '@/components/charts/bar/types';

export function YearlySummaryChart({
  title,
  yAxisDataKey,
  toolTipFormatter,
  tickFormatter,
  chartType,
  data
}: {
  title: string;
  yAxisDataKey: keyof YearlySummaryChartData;
  tickFormatter: (value: any, index: number) => string;
  toolTipFormatter: (value: any) => string;
  chartType: 'bar-chart' | 'line-chart';
  data: YearlySummaryChartData[];
}) {
  return (
    <div className="w-full h-72">
      <h2 className="text-center">{title}</h2>
      <ResponsiveContainer>
        {chartType === 'bar-chart' ? (
          <BarChart data={data}>
            <Bar
              dataKey={yAxisDataKey}
              fill={tailwindConfig.theme.colors.purple['500']}
            />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={tickFormatter} />
            <Tooltip formatter={value => [toolTipFormatter(value), title]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <Line
              dataKey={yAxisDataKey}
              fill={tailwindConfig.theme.colors.purple['500']}
            />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={tickFormatter} />
            <Tooltip formatter={value => [toolTipFormatter(value), title]} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
