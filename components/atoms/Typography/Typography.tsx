import { cn } from "@/utils/cn";
import React from "react";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
}

const variantMap: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  body1: "text-base text-gray-800",
  body2: "text-sm text-gray-700",
  caption: "text-xs text-gray-500",
};

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  as: Component = "p",
  className,
  children,
  ...props
}) => {
  const baseClasses = variantMap[variant];

  return (
    <Component
      className={cn(
        baseClasses,
        "text-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
