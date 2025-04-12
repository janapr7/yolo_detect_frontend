"use client";

import { useState } from "react";
import { ImageUpload } from "../molecules/Form/ImageUpload";

export const LandingPage = () => {
  return (
    <div className="w-full h-full min-h-[100dvh] bg-white dark:bg-black">
      <div className="w-full h-full flex justify-center py-20 gap-10">
        <div className="w-full max-w-4xl flex flex-col gap-10">
          <div className="w-full min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <ImageUpload />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
