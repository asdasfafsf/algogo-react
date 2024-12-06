import React from 'react';

interface BreadCrumbsProps {
  children: React.ReactNode;
  separator?: React.ReactNode;
  className?: string;
}

export default function BreadCrumbs({ className = '', children, separator = '/' }: BreadCrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className={`w-max ${className}`}>
      <ol className="flex flex-wrap items-center w-full px-4 py-2 rounded-md bg-slate-50">
        {React.Children.map(children, (child, index) => (
          <li
            key={index}
            className="flex items-center text-sm transition-colors duration-300 cursor-pointer text-slate-500 hover:text-slate-800"
          >
            {child}
            {index < React.Children.count(children) - 1 && (
              <span className="mx-2 pointer-events-none text-slate-800">
                {separator}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
