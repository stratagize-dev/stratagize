'use client';

import { ChangeEventHandler, useState } from 'react';

interface Props {
  value: number;
  onYearGoalChange?: (value: number) => void;
}
const HourlyGoal = ({ value, onYearGoalChange }: Props) => {
  // const [value, setValue] = useState(50);

  return (
    <input
      type="range"
      min="0"
      max="1000"
      value={value}
      step={1}
      className="range range-primary"
      // onChange={event => {
      //   setValue(Number(event?.target.value));
      // }}
      onChange={event => onYearGoalChange?.(Number(event.target.value))}
    />
  );
};
export default HourlyGoal;
