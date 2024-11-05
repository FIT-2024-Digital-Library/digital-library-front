import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="vstack center text-1-1 p-1 w-full">
        <p>
          <code>2024</code>, NSU
        </p>
        <a
          className="underline"
          href="https://github.com/FIT-2024-Digital-Library"
        >
          Github
        </a>
      </div>
    </footer>
  );
};
