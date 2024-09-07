import { SportType } from '@/shared/types/Activity';

const metresToKilometresRounded = (value: number | null): number | null =>
  value ? Math.round(value / 1000) : null;

function metersToKilometers(value: number | null): number | null {
  if (value === null) return null;

  const kilometers = value / 1000;
  return Math.round(kilometers * 100) / 100; // Rounds to two decimal places
}

const numberFormat = (num: number) => Intl.NumberFormat().format(num);

function splitPascalCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

/**
 *
 * @param converter
 * @param defaultValue
 * @param postModifier
 */
const formatter = (
  converter: (value: number | null) => number | null = x => x,
  defaultValue: string = '-',
  postModifier?: string
) => {
  return (input: number | null): string => {
    const convertedValue = converter(input);

    if (convertedValue) {
      if (postModifier) {
        return `${numberFormat(convertedValue)} ${postModifier}`;
      } else {
        return numberFormat(convertedValue);
      }
    } else {
      return defaultValue;
    }
  };
};

const formatSportsTypeName = (sportsType: SportType) =>
  splitPascalCase(sportsType);

export {
  formatter,
  numberFormat,
  metresToKilometresRounded,
  metersToKilometers,
  formatSportsTypeName
};
