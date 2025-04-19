import { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { GridPattern } from "../Background/GridPattern";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { MAX_SIZE_MB } from "@/constants/upload";
import { useDetectionStore } from "@/stores/useDetectionStore";
import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";

const mainVariant = {
  initial: { x: 0, y: 0 },
  animate: { x: 20, y: -20, opacity: 0.9 },
};

const secondaryVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const ImageUpload = ({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setImageUrl,
    isLoading,
    setIsLoading,
    isLoadingRule,
    setIsLoadingRule,
  } = useDetectionStore();

  const validateFile = (inputFile: File): File | null => {
    const isValidType =
      inputFile.type === "image/jpeg" || inputFile.type === "image/jpg";
    const isValidSize = inputFile.size <= MAX_SIZE_MB * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      console.warn(
        `File "${inputFile.name}" rejected. Must be .jpg/.jpeg and <= ${MAX_SIZE_MB}MB.`
      );
      return null;
    }

    return inputFile;
  };

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const validFile = validateFile(newFiles[0]);
      if (validFile) {
        setFile(validFile);
        setImageUrl("");
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setImageUrl("");
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log("Rejected:", error);
    },
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
    },
    maxSize: MAX_SIZE_MB * 1024 * 1024,
  });

  const handleDetectImage = async () => {
    if (!file || isLoading || isLoadingRule) return;

    const formData = new FormData();
    formData.append("file", file);
    setImageUrl("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_YOLO_SERVICE_HOST}/detect/image`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image detection failed");
      }

      const blob = await response.blob();
      const imageObjectURL = URL.createObjectURL(blob);
      setImageUrl(imageObjectURL);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5" {...getRootProps()}>
      <div className="w-full min-h-72 border border-dashed bg-dark-background dark:bg-background border-neutral-200 dark:border-neutral-800 rounded-lg">
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
        >
          <input
            ref={fileInputRef}
            id="file-upload-handle"
            type="file"
            accept=".jpg,.jpeg"
            multiple={false}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                handleFileChange([selectedFile]);
              }
            }}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
              Upload file
            </p>
            <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2 text-center">
              Drag or drop your <strong>JPG/JPEG</strong> file{" "}
              <span className="whitespace-nowrap">(max {MAX_SIZE_MB}</span>
              MB)
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {file ? (
                <motion.div
                  key={"file-preview"}
                  layoutId={"file-upload"}
                  className={cn(
                    "relative overflow-hidden z-40 bg-dark-background dark:bg-background flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <div className="flex gap-2 flex-none items-center">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-primary dark:bg-background bg-dark-background dark:text-dark-primary shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        onClick={handleRemoveFile}
                      >
                        <X className="text-primary dark:text-dark-primary w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className={cn(
                      "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                      "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                    )}
                  >
                    {isDragActive ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-neutral-600 flex flex-col items-center"
                      >
                        Drop it
                        <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                      </motion.p>
                    ) : (
                      <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                    )}
                  </motion.div>

                  <motion.div
                    variants={secondaryVariant}
                    className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                  ></motion.div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full">
        <InteractiveHoverButton
          text="Run Model Detection"
          onClick={handleDetectImage}
          disabled={!!!file}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
