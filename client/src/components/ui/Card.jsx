import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  isLoading = false
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {isLoading ? (
        <div className="p-4 animate-pulse">
          {title && <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>}
          {subtitle && <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>}
          <div className="h-24 bg-gray-200 rounded mb-4"></div>
          {footer && <div className="h-10 bg-gray-200 rounded mt-4"></div>}
        </div>
      ) : (
        <>
          {(title || subtitle) && (
            <div className={`px-6 py-4 border-b border-gray-100 ${headerClassName}`}>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
          )}
          <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
          {footer && (
            <div className={`px-6 py-3 bg-gray-50 border-t border-gray-100 ${footerClassName}`}>
              {footer}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
