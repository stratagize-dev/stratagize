import { MaxActivityElevation } from '@/shared/types/Activity';
import { formatter } from '@/shared/formatting';

interface Props {
  maxActivityElevations: MaxActivityElevation[];
}

function sortByElevationDescending() {
  return (
    a: { total_elevation_gain: number | null },
    b: { total_elevation_gain: number | null }
  ) => {
    if (a.total_elevation_gain === null && b.total_elevation_gain === null)
      return 0; // Both are null
    if (a.total_elevation_gain === null) return 1; // Null values go last
    if (b.total_elevation_gain === null) return -1; // Null values go last
    return b.total_elevation_gain - a.total_elevation_gain; // Standard descending order for numbers
  };
}

function MaxElevationTable({ maxActivityElevations }: Props) {
  return (
    <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-b-md border border-neutral-300 bg-white">
      <tbody className="divide-y divide-neutral-300">
        {maxActivityElevations
          .sort(sortByElevationDescending())
          .map((value, index) => (
            <tr
              key={value.id}
              className="border-neutral-300 text-sm leading-5 [&:not(:last-child)>td]:border-b "
            >
              <td className="px-1">{index + 1}</td>
              <td>{value.year}</td>
              <td>
                <a
                  href={`https://www.strava.com/activities/${value.id}`}
                  target="_blank"
                >
                  {value.name}
                </a>
              </td>
              <td>
                {formatter(
                  value => value,
                  '-',
                  'm'
                )(value.total_elevation_gain)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export { MaxElevationTable };
