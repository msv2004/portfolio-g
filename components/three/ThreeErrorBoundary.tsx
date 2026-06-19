'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ThreeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Three.js component error (non-critical):', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-indigo-600/25 to-purple-600/15 border border-indigo-500/20 animate-pulse" />
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-purple-500/10" />
            <div className="absolute w-20 h-20 rounded-full bg-indigo-500/30" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
