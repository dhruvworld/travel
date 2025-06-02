import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function SectionHeading({ 
  title, 
  description, 
  className, 
  ...props 
}: SectionHeadingProps) {
  return (
    <div className={cn("text-center", className)} {...props}>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {description && (
        <p className="mt-4 text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
}
