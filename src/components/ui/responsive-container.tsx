import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' | '6xl' | '7xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = '4xl',
  padding = 'md',
  centered = true,
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-2 sm:px-4',
    md: 'px-3 sm:px-4 md:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 md:px-8 lg:px-12',
    xl: 'px-6 sm:px-8 md:px-12 lg:px-16',
  };

  const containerClasses = `
    w-full
    ${maxWidthClasses[maxWidth]}
    ${paddingClasses[padding]}
    ${centered ? 'mx-auto' : ''}
    ${className}
  `.trim();

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default ResponsiveContainer; 