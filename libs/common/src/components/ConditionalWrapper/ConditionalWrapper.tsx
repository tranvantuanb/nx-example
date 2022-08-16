import React from 'react';

interface ComponentProps {
  condition: boolean;
  wrapper: (children: any) => any;
  children?: React.ReactNode;
}

// Use this to wrap your components if you need to
// conditionally render a wrapper component e.g. Link
export const ConditionalWrapper: React.FC<ComponentProps> = ({
  condition,
  wrapper,
  children,
}) => {
  return condition ? wrapper(children) : children;
};
