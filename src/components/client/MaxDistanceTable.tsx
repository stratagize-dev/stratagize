import { MaxActivityDistance } from '@/shared/types/Activity';
import { formatter, metersToKilometers } from '@/shared/formatting';

interface Props {
  maxActivityDistances: MaxActivityDistance[];
}

function sortByDistanceDescending() {
  return (a: { distance: number | null }, b: { distance: number | null }) => {
    if (a.distance === null && b.distance === null) return 0; // Both are null
    if (a.distance === null) return 1; // Null values go last
    if (b.distance === null) return -1; // Null values go last
    return b.distance - a.distance; // Standard descending order for numbers
  };
}

function MaxDistanceTable({ maxActivityDistances }: Props) {
  return (
    <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-b-md border border-neutral-300 bg-white">
      <tbody className="divide-y divide-neutral-300">
        {maxActivityDistances
          .sort(sortByDistanceDescending())
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
                {formatter(metersToKilometers, '-', 'km')(value.distance)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export { MaxDistanceTable };
