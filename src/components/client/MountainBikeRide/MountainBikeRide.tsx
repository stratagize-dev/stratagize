'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import {
  SportsAllTimeStats,
  SportsYearlyStats
} from '@/components/server/SportLoader';
import { time } from '@/shared/types/time';
import { formatter, metresToKilometresRounded } from '@/shared/formatting';
import { TotalDistanceSummary } from '@/components/charts/bar/totalDistanceSummary';
import { TotalMovingSummary } from '@/components/charts/bar/totalMovingSummary';
import { TotalElevationsSummary } from '@/components/charts/bar/totalElevationsSummary';
import { TotalKudosSummary } from '@/components/charts/bar/totalKudosSummary';
import { TotalAchievementsSummary } from '@/components/charts/bar/totalAchievementsSummary';
import { TotalActivities } from '@/components/charts/bar/totalActivitiesChart';
import {
  MaxActivityDistance,
  MaxActivityElevation
} from '@/shared/types/Activity';
import { MaxDistanceTable } from '@/components/client/MaxDistanceTable';
import { StatsRow } from '@/components/server/MountainBikeRide/StatsRow';
import { MaxElevationTable } from '@/components/client/MaxElevationTable';

interface Props {
  displayDistance?: boolean;
  displayElevation?: boolean;
  displayAchievements?: boolean;
  allTimeStats: SportsAllTimeStats;
  yearlyStats: SportsYearlyStats[];
  maxActivityDistances: MaxActivityDistance[];
  maxActivityElevations: MaxActivityElevation[];
}

const toKilometers = formatter(metresToKilometresRounded, '-', 'km');
const toHumanTime = (value: number | null): string => time(value ?? 0)().human;
const toMeters = formatter(
  value => (value ? Math.round(value) : null),
  '-',
  'm'
);

export function MountainBikeRide({
  displayDistance = true,
  displayElevation = true,
  displayAchievements = true,
  allTimeStats,
  yearlyStats,
  maxActivityDistances,
  maxActivityElevations
}: Props) {
  return (
    <TabGroup>
      <TabList className="flex flex-row gap-2 mb-2">
        <Tab className="data-[selected]:bg-purple-500 data-[selected]:text-white data-[hover]:underline p-2">
          All Activities
        </Tab>
        {/*<Tab className="data-[selected]:bg-purple-500 data-[selected]:text-white data-[hover]:underline p-2">*/}
        {/*  2012*/}
        {/*</Tab>*/}
        {/*<Tab className="data-[selected]:bg-purple-500 data-[selected]:text-white data-[hover]:underline p-2">*/}
        {/*  2013*/}
        {/*</Tab>*/}
      </TabList>
      <TabPanels>
        <TabPanel>
          <StatsRow
            messageBlocks={[
              {
                id: 'total_activities',
                header: `${formatter()(allTimeStats.total_activities)}`,
                message: 'Total activities'
              }
            ]}
          >
            <div className="w-1/2">
              <TotalActivities data={yearlyStats} />
            </div>
          </StatsRow>

          {displayDistance && (
            <div>
              <StatsRow
                messageBlocks={[
                  {
                    id: 'total_distance',
                    header: `${toKilometers(allTimeStats.total_distance)}`,
                    message: 'Total distance'
                  },
                  {
                    id: 'avg_distance',
                    header: `${toKilometers(allTimeStats.avg_distance)}`,
                    message: 'Average distance'
                  },
                  {
                    id: 'max_distance',
                    header: `${toKilometers(allTimeStats.max_distance)}`,
                    message: 'Maximum distance'
                  }
                ]}
              >
                <div className="w-1/2">
                  <TotalDistanceSummary data={yearlyStats} />
                </div>
                <div className="w-1/2">
                  <MaxDistanceTable
                    maxActivityDistances={maxActivityDistances}
                  />
                </div>
              </StatsRow>
            </div>
          )}
          <StatsRow
            messageBlocks={[
              {
                id: 'total_moving_time',
                header: `${toHumanTime(allTimeStats.total_moving_time)}`,
                message: 'Total moving time'
              },
              {
                id: 'avg_moving_time',
                header: `${toHumanTime(allTimeStats.avg_moving_time)}`,
                message: 'Average moving time'
              },
              {
                id: 'max_moving_time',
                header: `${toHumanTime(allTimeStats.max_moving_time)}`,
                message: 'Longest moving time'
              }
            ]}
          >
            <div className="w-1/2">
              <TotalMovingSummary data={yearlyStats} />
            </div>
          </StatsRow>
          {displayElevation && (
            <>
              <StatsRow
                messageBlocks={[
                  {
                    id: 'total_elevation_gain',
                    header: `${toMeters(allTimeStats.total_elevation_gain)}`,
                    message: 'Total elevation gain'
                  },
                  {
                    id: 'avg_elevation_gain',
                    header: `${toMeters(allTimeStats.avg_elevation_gain)}`,
                    message: 'Average elevation'
                  },
                  {
                    id: 'max_elevation_gain',
                    header: `${toMeters(allTimeStats.max_elevation_gain)}`,
                    message: 'Biggest elevation gain'
                  }
                ]}
              >
                <div className="w-1/2">
                  <TotalElevationsSummary data={yearlyStats} />
                </div>
                <div className="w-1/2">
                  <MaxElevationTable
                    maxActivityElevations={maxActivityElevations}
                  />
                </div>
              </StatsRow>
            </>
          )}

          <StatsRow
            messageBlocks={[
              {
                id: 'total_kudos',
                header: `${formatter()(allTimeStats.total_kudos)}`,
                message: 'Kudos received'
              }
            ]}
          >
            <div className="w-1/2">
              <TotalKudosSummary data={yearlyStats} />
            </div>
          </StatsRow>
          {displayAchievements && (
            <StatsRow
              messageBlocks={[
                {
                  id: 'total_achievements',
                  header: `${formatter()(allTimeStats.total_achievements)}`,
                  message: 'Total achievements'
                }
              ]}
            >
              <div className="w-1/2">
                <TotalAchievementsSummary data={yearlyStats} />
              </div>
            </StatsRow>
          )}
        </TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
