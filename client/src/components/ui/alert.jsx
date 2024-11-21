// src/components/ui/alert.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { cn } from '@/utils/classNames';

const Alert = ({ className, children }) => {
  return (
    <div
      className={cn(
        'flex items-start p-4 border-l-4 rounded-md shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};

const AlertTitle = ({ children, className }) => (
  <h3 className={`font-bold text-lg ${className}`}>{children}</h3>
);

const AlertDescription = ({ children, className }) => (
  <p className={`text-sm ${className}`}>{children}</p>
);

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AlertTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AlertDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { Alert, AlertTitle, AlertDescription };
