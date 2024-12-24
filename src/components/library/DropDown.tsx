import clsx from 'clsx';
import React, { PropsWithChildren, HTMLAttributes, useState } from 'react';

interface DropDownProps extends PropsWithChildren<HTMLAttributes<React.FC>> {
  buttonComponent: JSX.Element;
  isShownDefault?: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
  isShownDefault,
  className,
  buttonComponent,
  children,
}) => {
  const [isShown, setIsShown] = useState(isShownDefault ?? false);

  return (
    <div className={clsx(className)}>
      <div onClick={() => setIsShown((s) => !s)}>{buttonComponent}</div>
      <div
        className={clsx(
          'absolute transition-all',
          isShown ? 'opacity-1 visible' : 'opacity-0 invisible'
        )}
      >
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsShown(false);
          }}
          className="fixed inset-0 w-screen h-screen"
        ></div>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};
