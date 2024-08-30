import { SportsStatistic } from '@/shared/services/statistics/types';

const SportsBreakdown = ({
  sportStatistics
}: {
  sportStatistics: SportsStatistic[];
}) => (
  <table className="table-auto border-separate rounded-2xl border-spacing-4 border border-slate-400 p-4">
    <thead className="text-left">
      <tr>
        <th>Sport</th>
        <th>Total Moving Time</th>
        <th>Activity Count</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      {sportStatistics
        .filter(statistic => statistic.activityCount > 0)
        .sort((a, b) => b.percentage - a.percentage)
        .map(statistic => (
          <tr key={statistic.sportType} className="my-3">
            <td>
              {statistic.sportType
                .toString()
                .replace(/([a-z])([A-Z])/g, '$1 $2')}
            </td>
            <td>{statistic.totalMovingTime().human}</td>
            <td>{statistic.activityCount}</td>
            <td>{Math.round(statistic.percentage)}%</td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default SportsBreakdown;
