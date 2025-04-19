import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";
import { CATEGORY_LIST } from "@/constants/rule";
import { useDetectionStore } from "@/stores/useDetectionStore";
import { useState } from "react";
import { RuleTabs } from "./RuleTabs";
import { CategoryResultTable } from "./CategoryResultTable";
import { cn } from "@/utils/cn";

type Detection = {
  label: string;
  confidence: number;
  bbox: number[];
};

type CategoryResult = {
  label: string;
  confidence: number;
} | null;

export const MatchRule = ({ file }: { file: File | null }) => {
  const { isLoading, isLoadingRule, setIsLoadingRule } = useDetectionStore();
  const [selectedValue, setSelectedValue] = useState("cat1");
  const [categoryResults, setCategoryResults] = useState<
    Record<string, CategoryResult>
  >({});

  function getTopDetectionsByCategory(detections: Detection[]) {
    const result: Record<string, CategoryResult> = {};

    for (const [category, labels] of Object.entries(CATEGORY_LIST)) {
      // Filter detections that belong to the current category
      const filtered = detections.filter((det) => labels.includes(det.label));

      if (filtered.length === 0) {
        result[category] = null;
      } else {
        // Find the one with the highest confidence
        const top = filtered.reduce((prev, current) =>
          current.confidence > prev.confidence ? current : prev
        );
        result[category] = {
          label: top.label,
          confidence: top.confidence,
        };
      }
    }

    return result;
  }

  const handleDetectBoxes = async () => {
    if (!file || isLoading || isLoadingRule) return;

    const formData = new FormData();
    formData.append("file", file);
    setCategoryResults({});
    setIsLoadingRule(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_YOLO_SERVICE_HOST}/detect`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image detection failed");
      }

      const data = await response.json();
      const boxes = data?.boxes;
      setCategoryResults(getTopDetectionsByCategory(boxes));
      console.log("box>>>", getTopDetectionsByCategory(boxes));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingRule(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full">
        <InteractiveHoverButton
          text="Run Rule Matching"
          onClick={handleDetectBoxes}
          disabled={!!!file}
          isLoading={isLoadingRule}
        />
      </div>

      <div
        className={cn("hidden w-full flex-col gap-5", isLoadingRule && "flex")}
      >
        <div className="w-full sm:w-68 rounded h-10 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="w-full rounded h-60 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </div>

      {(categoryResults?.category1?.label ||
        categoryResults?.category2?.label ||
        categoryResults?.category3?.label ||
        categoryResults?.category4?.label ||
        categoryResults?.category5?.label) && (
        <>
          <RuleTabs
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <div className="w-full flex justify-start">
            {selectedValue === "cat1" && (
              <CategoryResultTable categoryResults={categoryResults} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
