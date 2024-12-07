// Section.tsx
import React from 'react';

export default function Section(props: { children: React.ReactNode }) {
  return (
    <section className="flex items-center justify-center px-4 bg-gray-100">
      <div className="container max-w-screen-xl">
        <div className="max-w-full">
          {props.children}
        </div>
      </div>
    </section>
  );
}
