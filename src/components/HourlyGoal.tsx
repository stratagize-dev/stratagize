'use client';

interface Props {
  value: number;
  onYearGoalChange?: (value: number) => void;
}
const HourlyGoal = ({ value, onYearGoalChange }: Props) => {
  return (
    <input
      min="0"
      max="1000"
      value={value}
      step={1}
      className="range range-primary"
      onChange={event => onYearGoalChange?.(Number(event.target.value))}
    />
  );
};
export default HourlyGoal;
