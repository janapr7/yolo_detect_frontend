"use client";

import { useViewportListener } from "@/hooks/useViewportListener";
import { useEffect } from "react";
import { Typography } from "../Typography/Typography";

export const MinWidthFallback = () => {
  const { currentViewport } = useViewportListener();

  useEffect(() => {
    if (currentViewport < 320) {
      // Add no-scroll class to the body
      document.body.classList.add("no-scroll");
    } else {
      // Remove no-scroll class from the body
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [currentViewport]);

  if (currentViewport > 0 && currentViewport < 320) {
    return (
      <div className="fixed inset-0 z-[99999999] flex items-center justify-center bg-dark-background dark:bg-background p-5">
        {currentViewport < 250 ? (
          "👋"
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <Typography variant="body1" className="font-bold">
              Palm Type Detection App
            </Typography>
            <Typography variant="body2">Using YOLOv8l Model</Typography>
          </div>
        )}
      </div>
    );
  }

  return <></>;
};
