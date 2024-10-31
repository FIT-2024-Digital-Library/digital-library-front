import clsx from 'clsx';
import React from 'react';

interface SliderCheckboxProps {
  checked: boolean;
  variant?: keyof typeof variantCheckedTransformers;
  onClick?: () => void;
}

const variantCheckedTransformers = {
  default: (checked: boolean) => checked,
  inverted: (checked: boolean) => !checked,
  dark: () => false,
  light: () => true,
};

export const SliderCheckbox: React.FC<SliderCheckboxProps> = ({
  checked,
  variant,
  onClick,
}) => {
  const checkedForStyle =
    variantCheckedTransformers[variant ?? 'default'](checked);
  return (
    <div
      className={clsx(
        'flex h-9 w-16 items-center rounded-full px-1',
        'shadow-inner transition-all hover:cursor-pointer',
        checkedForStyle ? 'bg-1-6 border-1-1' : 'bg-1-1 border-1-6'
      )}
      onClick={() => onClick?.()}
    >
      <div
        className={clsx(
          'h-7 w-7 rounded-full transition-all',
          checked && 'translate-x-7',
          checkedForStyle ? 'bg-1-1' : 'bg-1-6'
        )}
      />
    </div>
  );
};
