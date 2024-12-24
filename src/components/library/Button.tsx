import React, { PropsWithChildren } from 'react';
import { Icon, IconType } from './Icon';

interface IconButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  icon?: IconType;
  loading?: boolean;
  variant?: keyof typeof variants | false;
}

const variants = {
  inline: `text-1-1 hover:bg-1-6/25`,
  'plate-black': `bg-1-2 text-white hover:bg-1-4 rounded-full`,
  'plate-grey': `bg-1-11 text-black hover:bg-1-9 rounded-full`,
  search: `bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium`,
};
export const Button: React.FC<IconButtonProps> = ({
  variant,
  loading,
  icon,
  className,
  children,
  ...rest
}) => (
  <button
    type={'button'}
    className={
      `${
        variants[variant || 'inline']
      } center h-10 min-w-[40px] space-x-2 p-2 transition-colors` +
      ' ' +
      className
    }
    disabled={loading}
    {...rest}
  >
    {icon && !loading && (
      <Icon icon={icon} className={children ? 'mr-2' : ''} />
    )}
    {loading && (
      <Icon
        icon={'loader'}
        className={`${children ? 'mr-2' : ''} animate-spin`}
      />
    )}
    {children}
  </button>
);
