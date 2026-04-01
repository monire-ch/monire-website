import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router-dom';
import StarIcon from '@/components/StarIcon';
import { cn } from '@/lib/utils';

// BrandButton is for Monire marketing/product CTAs (primary/secondary/hero visuals).
// For shadcn/ui primitives and generic utility controls, use src/components/ui/button.tsx.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary: 'btn-gold',
        secondary: 'btn-outline-gold',
        hero: 'btn-teal !bg-dark-teal-surface hover:!bg-dark-teal-surface-lighter',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

type BrandButtonType = 'button' | 'submit' | 'link';

type BrandButtonBaseProps = VariantProps<typeof buttonVariants> & {
  showStar?: boolean;
  starClassName?: string;
  className?: string;
  children: React.ReactNode;
};

type BrandButtonLinkProps = BrandButtonBaseProps & {
  type: 'link';
  to: string;
} & Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>;

type BrandButtonActionProps = BrandButtonBaseProps & {
  type?: Exclude<BrandButtonType, 'link'>;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'children'>;

type BrandButtonProps = BrandButtonLinkProps | BrandButtonActionProps;

const BrandButton = ({
  className,
  variant,
  type = 'button',
  showStar = false,
  starClassName,
  children,
  ...props
}: BrandButtonProps) => {
  const buttonClassName = cn(buttonVariants({ variant }), className);
  const content = (
    <>
      {children}
      {showStar ? <StarIcon className={starClassName} /> : null}
    </>
  );

  if (type === 'link') {
    const { to, ...linkProps } = props as Omit<BrandButtonLinkProps, 'type' | 'children' | 'className' | 'showStar' | 'starClassName' | 'variant'> & { to: string };
    return (
      <Link to={to} className={buttonClassName} {...(linkProps as Omit<React.ComponentProps<typeof Link>, 'to' | 'className' | 'children'>)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClassName} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};

export default BrandButton;
