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
        <span className="text-red-300 font-bold text-center mt-2 p-2 bg-1-1 rounded-md">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
