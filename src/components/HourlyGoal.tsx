'use client';

interface Props {
  value: number;
  onYearGoalChange?: (value: number) => void;
}
const HourlyGoal = ({ value, onYearGoalChange }: Props) => {
  return (
    <div className="flex justify-items-start items-center w-full  p-3  border-b-2 border-solid border-gray-50 text-6xl font-bold  text-orange-500">
      <p>Goal for year : </p>
      <div className="mx-5 pl-5 text-gray-500 border-2 border-solid border-gray-200">
        <input
          min="0"
          type={'number'}
          max="1000"
          value={value}
          step={1}
          className="focus:outline-none hover:cursor-text"
          onChange={event => onYearGoalChange?.(Number(event.target.value))}
        />
      </div>
      <p>Hours</p>
    </div>
  );
};
export default HourlyGoal;
