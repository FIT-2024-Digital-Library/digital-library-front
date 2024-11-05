import clsx from 'clsx';
import React, { PropsWithChildren, HTMLAttributes } from 'react';

interface FormItemProps extends PropsWithChildren<HTMLAttributes<React.FC>> {
  labelComponent?: JSX.Element;
  errorMessage?: string;
}

export const FormItem: React.FC<FormItemProps> = ({
  labelComponent,
  errorMessage,
  className,
  children,
}) => {
  return (
    <div className={clsx(className)}>
      {labelComponent}
      {children}
      {errorMessage && (
        <span className="text-red-400 font-bold mb-1 p-1">{errorMessage}</span>
      )}
    </div>
  );
};
