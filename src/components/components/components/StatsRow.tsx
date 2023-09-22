import MessageBlock from '@/components/components/components/MessageBlock';
import ArrowDownRightCircleFill from '@/components/Icons/ArrowDownRightCircleFill';
import ArrowUpRightCircleFill from '@/components/Icons/ArrowUpRightCircleFill';
import HorizontalSpacer from '@/components/components/components/HorizontalSpacer';
import LoadingDiv from '@/components/LoadingDiv';

interface Props {
  title: string;
  subTitle: string;
  percentage?: number;
  period: 'year' | 'month' | 'day';
  messageBlocks: { id: string; header: string; message: string }[];
}
export const StatsRow = ({
  title,
  subTitle,
  percentage,
  period,
  messageBlocks
}: Props) => {
  const symbol = (value: number) => (value > 0 ? '+' : '');

  return (
    <>
      <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-16 my-12">
        <div className="lg:col-span-4">
          <div className="lg:pr-6 xl:pr-12">
            <p className="text-6xl font-bold leading-10 text-orange-500">
              {title}
              {percentage && (
                <span className="ml-4 inline-flex items-center gap-x-1 bg-gray-200 font-medium text-gray-800 text-xs leading-4 rounded-full py-0.5 px-2 dark:bg-gray-800 dark:text-gray-300">
                  {percentage >= 0 ? (
                    <ArrowUpRightCircleFill />
                  ) : (
                    <ArrowDownRightCircleFill />
                  )}
                  {symbol(percentage)}
                  {percentage}% this {period}
                </span>
              )}
            </p>
            <p className="mt-2 sm:mt-3 text-gray-500">{subTitle}</p>
          </div>
        </div>
        <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-left-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:dark:bg-gray-700">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
            {messageBlocks.map(value => (
              <MessageBlock
                key={value.id}
                header={value.header}
                message={value.message}
              />
            ))}
          </div>
        </div>
      </div>
      <HorizontalSpacer />
    </>
  );
};
