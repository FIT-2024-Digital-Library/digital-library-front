import clsx from 'clsx';
import React, { HTMLAttributes } from 'react';

export interface ProgressBarProps extends HTMLAttributes<React.FC> {
  value: number;
  maxValue: number;
  fillClassName?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  maxValue,
  className,
  fillClassName,
}) => {
  return (
    <div
      className={clsx(
        'relative m-1 overflow-hidden',
        'border border-black rounded',
        className
      )}
    >
      <div
        className={clsx('absolute bg-yellow-300 h-full', fillClassName)}
        style={{ width: `${(value / maxValue) * 100}%` }}
      ></div>
      <div className="absolute h-full w-full text-center">
        <span>{value}</span>
        <span>{'/'}</span>
        <span>{maxValue}</span>
      </div>
      <span className="invisible">.</span>
    </div>
  );
};
