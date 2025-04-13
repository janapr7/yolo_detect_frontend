"use client";

import { useState } from "react";
import { ImageUpload } from "../../molecules/Form/ImageUpload";
import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";
import { useDetectionStore } from "@/stores/useDetectionStore";

export const LandingPage = () => {
  const { imageUrl } = useDetectionStore();
  return (
    <div className="w-full h-full min-h-[100dvh] bg-white dark:bg-black py-20">
      <div className="w-full h-full flex justify-center gap-10 px-5">
        <div className="w-full max-w-4xl flex flex-col gap-10">
          <ImageUpload />

          {imageUrl && (
            <div>
              <img
                src={imageUrl}
                alt="detected image"
                style={{ maxWidth: "100%", border: "1px solid #ccc" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
