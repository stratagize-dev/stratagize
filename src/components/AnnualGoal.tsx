'use client';

interface Props {
  value: number;
  onYearGoalChange?: (value: number) => void;
}
const AnnualGoal = ({ value, onYearGoalChange }: Props) => {
  return (
    <>
      <div className="grid grid-cols-6 gap-4 place-items-center max-w-4xl text-5xl font-bold  text-orange-500 ">
        <p className="col-span-6 md:col-span-3">Goal for year :</p>
        <div className="col-span-3 md:col-span-2 text-gray-500 ">
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
        <div className="col-span-3 md:col-span-1 ">Hours</div>
      </div>
    </>
  );
};
export default AnnualGoal;
