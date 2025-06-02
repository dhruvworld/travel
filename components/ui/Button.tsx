import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  target?: string;
}

export function Button({
  children,
  className,
  variant = 'primary',
  href,
  target,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md";
  
  const variantStyles = {
    primary: "text-white bg-blue-600 hover:bg-blue-700",
    secondary: "text-white bg-gray-600 hover:bg-gray-700",
    outline: "text-blue-600 border-blue-600 hover:bg-blue-50"
  };
  
  const classes = cn(baseStyles, variantStyles[variant], className);
  
  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
