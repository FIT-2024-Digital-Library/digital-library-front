import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="bg-1-8 text-1-1 flex vstack center p-1">
        <p>
          <code>2024</code>, Kozlov Kirill
        </p>
        <a className="underline" href="https://github.com/KozlovKV">
          Github
        </a>
      </div>
    </footer>
  );
};
