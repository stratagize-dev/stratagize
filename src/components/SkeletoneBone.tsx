import clsx from 'clsx';

type SkeletonBoneProps = {
  className?: string;
};

function SkeletonBone({ className, ...props }: SkeletonBoneProps) {
  return (
    <div
      className={clsx(
        'rounded bg-neutral-400 motion-safe:animate-pulse',
        className
      )}
      {...props}
    />
  );
}

export { SkeletonBone };
