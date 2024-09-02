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
import { time } from '@/shared/types/time';
import { tailwindConfig } from '@/shared/tailwindConfig';
import { AthleteYearlySummary } from '@/shared/services/statistics/types';

const formatNumber = (num: number) =>
  new Intl.NumberFormat().format(Math.round(num));

const TotalMovingSummary = ({ data }: { data: AthleteYearlySummary[] }) => (
  <YearlySummaryBarChart
    title="Total moving time"
    tickFormatter={value => time(value)().duration.hours.toString()}
    toolTipFormatter={value => time(value as number)().human}
    yAxisDataKey="total_moving_time"
    chartType="bar-chart"
    data={data}
  />
);

const TotalDistanceSummary = ({ data }: { data: AthleteYearlySummary[] }) => (
  <YearlySummaryBarChart
    title="Total distance"
    tickFormatter={value => (value / 1000).toString()}
    toolTipFormatter={value => `${Math.round((value as number) / 1000)} km`}
    yAxisDataKey="total_distance"
    chartType="bar-chart"
    data={data}
  />
);

const TotalElevationsSummary = ({ data }: { data: AthleteYearlySummary[] }) => (
  <YearlySummaryBarChart
    title="Total elevation"
    tickFormatter={value => formatNumber(value).toString()}
    toolTipFormatter={value => `${formatNumber(value)} m`}
    yAxisDataKey="total_elevation_gain"
    chartType="bar-chart"
    data={data}
  />
);

const TotalKudosSummary = ({ data }: { data: AthleteYearlySummary[] }) => (
  <YearlySummaryBarChart
    title="Total kudos"
    tickFormatter={value => formatNumber(value).toString()}
    toolTipFormatter={value => `${formatNumber(value)}`}
    yAxisDataKey="sum"
    chartType="line-chart"
    data={data}
  />
);

const TotalAchievementsSummary = ({
  data
}: {
  data: AthleteYearlySummary[];
}) => (
  <YearlySummaryBarChart
    title="Total achievements"
    tickFormatter={value => formatNumber(value).toString()}
    toolTipFormatter={value => `${formatNumber(value)}`}
    yAxisDataKey="total_achievements"
    chartType="line-chart"
    data={data}
  />
);

function YearlySummaryBarChart({
  title,
  yAxisDataKey,
  toolTipFormatter,
  tickFormatter,
  chartType,
  data
}: {
  title: string;
  yAxisDataKey: string;
  tickFormatter: (value: any, index: number) => string;
  toolTipFormatter: (value: any) => string;
  chartType: 'bar-chart' | 'line-chart';
  data: AthleteYearlySummary[];
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

export {
  TotalDistanceSummary,
  TotalMovingSummary,
  TotalElevationsSummary,
  TotalKudosSummary,
  TotalAchievementsSummary
};
