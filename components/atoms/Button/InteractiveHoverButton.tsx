import React from "react";
import { ArrowRight, Loader, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", isLoading, className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-full sm:w-60 cursor-pointer overflow-hidden rounded border border-primary dark:border-dark-primary bg-dark-primary dark:bg-primary p-2 text-center font-semibold",
        disabled && "opacity-10 cursor-default",
        isLoading && "bg-primary dark:bg-dark-primary ",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="w-full flex justify-center items-center gap-2">
          <Loader2 className="w-6 h-5 flex-none text-dark-primary dark:text-primary animate-spin" />
        </div>
      ) : (
        <>
          <span className="inline-block translate-x-1 text-primary dark:text-dark-primary transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {text}
          </span>
          <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-dark-primary dark:text-primary opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
            <span>{text}</span>
            <ArrowRight />
          </div>
          <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary dark:bg-dark-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary dark:group-hover:bg-dark-primary" />
        </>
      )}
    </button>
  );
});
