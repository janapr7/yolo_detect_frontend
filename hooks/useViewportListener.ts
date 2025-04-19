"use client";

import { useEffect, useState } from "react";

export const useViewportListener = () => {
  const [currentViewport, setCurrentViewport] = useState(0);

  const viewportListener = () => {
    setCurrentViewport(window.innerWidth);
  };

  useEffect(() => {
    setCurrentViewport(window.innerWidth);

    window.addEventListener("resize", viewportListener);

    return () => {
      window.removeEventListener("resize", viewportListener);
    };
  }, []);

  return { currentViewport };
};
