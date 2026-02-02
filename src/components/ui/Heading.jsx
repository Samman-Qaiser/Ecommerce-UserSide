import React from 'react';
import { cn } from '@/lib/utils';

const SectionHeading = ({ 
  title, 
  description, 
  align = 'left', // 'left', 'center', 'right'
  className,
  titleClassName,
  descriptionClassName,
  showLines = true,
  lineColor = 'gray-300',
  variant = 'default' // 'default', 'minimal', 'bold', 'elegant'
}) => {
  
  // Alignment classes
  const alignmentClasses = {
    left: 'text-left items-start justify-start',
    center: 'text-center items-center justify-center',
    right: 'text-right items-end justify-end',
  };

  // Variant styles
  const variantStyles = {
    default: {
      title: 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide uppercase',
      description: 'text-sm sm:text-base text-gray-600 mt-2',
    },
    minimal: {
      title: 'text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider uppercase',
      description: 'text-xs sm:text-sm text-gray-500 mt-1.5',
    },
    bold: {
      title: 'text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase',
      description: 'text-base sm:text-lg text-gray-700 mt-3 font-medium',
    },
    elegant: {
      title: 'text-2xl sm:text-3xl lg:text-4xl font-light tracking-[0.2em] uppercase',
      description: 'text-sm sm:text-base text-gray-500 mt-2 font-light',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.default;

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('flex flex-col', alignmentClasses[align])}>
        {/* Title with Lines */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full">
          {/* Left Line */}
          {showLines && align !== 'right' && (
            <div className="flex-shrink-0">
              <div className={cn('h-[2px] w-8 sm:w-12 lg:w-16', `bg-${lineColor}`)}></div>
            </div>
          )}

          {/* Title */}
          <h2 
            className={cn(
              'text-gray-900 transition-all duration-300',
              currentVariant.title,
              titleClassName
            )}
          >
            {title}
          </h2>

          {/* Right Line */}
          {showLines && align !== 'left' && (
            <div className="flex-grow">
              <div className={cn('h-[2px] w-full', `bg-${lineColor}`)}></div>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p 
            className={cn(
              'max-w-2xl leading-relaxed',
              currentVariant.description,
              descriptionClassName,
              align === 'center' && 'mx-auto',
              align === 'right' && 'ml-auto'
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;