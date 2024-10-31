import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface PopUpProps extends PropsWithChildren<React.HTMLAttributes<React.FC>> {
  isShown: boolean;
  close: () => void;
}

/**
 * Pop-up window wrapper FC.
 *
 * - `isShown` - should content be rendered
 * - `close` - callback for closing
 * - `className` - extenstion for pop-up css-classes
 *   - Pop-up wrapper doesn't have any visible styles for itself by default so you can add them manually
 *   - Css-parameters like "display: hidden" may cause animtation to be broken
 * - `children` - pop-up window's content
 * - other parameters will be forwarded to the wrapper div tag
 */
export const PopUp: React.FC<PopUpProps> = (
  { isShown, close, className, children },
  ...props
) => {
  return (
    <div
      className={clsx(
        'transition-all fixed',
        isShown ? 'inset-0 full opacity-1' : 'inset-1/2 w-0 h-0 opacity-0',
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      {...props}
    >
      {isShown && children}
    </div>
  );
};
