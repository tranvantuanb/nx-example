import React from 'react';

export * from './websocket';
export * from './appSettings';

export interface ApiResponse {
  data: any;
  success?: {
    message: string | null;
  };
  error?: {
    message: string | null;
  };
}

export interface ModuleServiceInjection {
  /**
   * The target name that the injection will be inserted to
   */
  target: string;
  /**
   * Render method, allow to add additional props for the components
   */
  render: (props) => React.ReactNode;
}

export interface ModuleServiceConfig {
  /**
   * Service name
   */
  name: string;
  /**
   * Array of components for injection
   */
  injections: ModuleServiceInjection[];
}

export interface ServiceMap {
  [service: string]: Omit<ModuleServiceConfig, 'name'>;
}
