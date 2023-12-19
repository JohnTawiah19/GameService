import React from "react";

type Props = {
  children: React.ReactNode;
};

export function PageLayout({ children }: Props) {
  return (
    <div className="page_layout mx-auto flex flex-col  shadow-neutral-600 ">
      {children}
    </div>
  );
}

export function Wrapper({ children }: Props) {
  return (
    <div className="max-w-full flex flex-col sm:mx-0 md:mx-auto sm:px-4 md:px-16 lg:px-24">
      {children}
    </div>
  );
}
