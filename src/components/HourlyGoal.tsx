'use client';

interface Props {
  defaultValue?: number;
  onYearGoalChange?: (value: number) => void;
}
const HourlyGoal = ({ defaultValue = 100, onYearGoalChange }: Props) => {
  return (
    <input
      type="range"
      min="0"
      max="1000"
      value={defaultValue}
      className="range range-primary"
      onChange={event => onYearGoalChange?.(Number(event.target.value))}
    />
  );
};
export default HourlyGoal;
