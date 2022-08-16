import React from 'react';

import { Spin } from '../Spin';

interface ComponentProps {
  className?: string;
  title?: string;
  content?: string;
}

export const Iframe: React.FC<ComponentProps> = ({
  title,
  content,
  className,
}) =>
  content ? (
    <iframe
      style={{ width: '100%', height: '100%' }}
      title={title}
      src={`data:text/html;charset=utf-8,${encodeURIComponent(content)}`}
      className={className}
    />
  ) : (
    <div className="text-center">
      <Spin />
    </div>
  );
