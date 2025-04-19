"use client";

import { useState } from "react";
import { ImageUpload } from "../../molecules/Form/ImageUpload";
import { useDetectionStore } from "@/stores/useDetectionStore";
import { NavBar } from "@/components/molecules/NavBar/NavBar";
import { MatchRule } from "@/components/molecules/MatchRule/MatchRule";
import { cn } from "@/utils/cn";

export const LandingPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const { imageUrl, isLoading } = useDetectionStore();
  return (
    <div className="w-full h-full min-h-[100dvh] bg-dark-background dark:bg-background flex flex-col">
      <NavBar />
      <div className="w-full h-full flex justify-center gap-10 px-5 py-10">
        <div className="w-full max-w-4xl flex flex-col gap-18">
          <div className="w-full flex flex-col gap-5">
            <ImageUpload file={file} setFile={setFile} />

            <div
              className={cn(
                "hidden w-full rounded h-72 bg-zinc-200 dark:bg-zinc-800 animate-pulse",
                isLoading && "block"
              )}
            />

            {imageUrl && (
              <img
                src={imageUrl}
                alt="detected image"
                className="w-full border border-primary dark:border-dark-primary rounded"
              />
            )}
          </div>

          {imageUrl && <MatchRule file={file} />}
        </div>
      </div>
    </div>
  );
};
