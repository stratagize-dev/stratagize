import MessageBlock from '@/components/MessageBlock';
import { ReactNode } from 'react';

interface Props {
  messageBlocks: { id: string; header: string; message: string }[];
  children?: ReactNode;
}
export const StatsRow = ({ messageBlocks, children }: Props) => {
  return (
    <>
      <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-16 my-12">
        <div className="lg:col-span-6 relative lg:before:absolute lg:before:top-0 lg:before:-left-12 lg:before:w-px lg:before:h-full lg:before:bg-gray-200 lg:before:dark:bg-gray-700">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8 mb-4">
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
      <div className="flex flex-row w-full gap-10 items-center">{children}</div>
    </>
  );
};
