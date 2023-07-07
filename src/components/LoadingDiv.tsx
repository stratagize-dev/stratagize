import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  loading: boolean;
}
export default function LoadingDiv({
  loading,
  children,
  className,
  ...otherProps
}: Props) {
  return (
    <div className={`${className} ${loading ? 'blur-lg' : ''}`} {...otherProps}>
      {children}
    </div>
  );
}
