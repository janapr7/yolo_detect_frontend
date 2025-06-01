import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";
import { CATEGORY_LIST } from "@/constants/rule";
import { useDetectionStore } from "@/stores/useDetectionStore";
import { useState } from "react";
import { RuleTabs } from "./RuleTabs";
import { CategoryResultTable } from "./CategoryResultTable";
import { cn } from "@/utils/cn";
import { RuleTable } from "./RuleTable";
import { CategoryResult, Detection } from "@/types/detection";
import { Typography } from "@/components/atoms/Typography/Typography";

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
        <div className="w-full sm:w-68 rounded h-9 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="w-full rounded h-69 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      </div>

      {(categoryResults?.category1?.label ||
        categoryResults?.category2?.label ||
        categoryResults?.category3?.label ||
        categoryResults?.category4?.label ||
        categoryResults?.category5?.label) && (
        <>
          {/* <RuleTabs
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
          <div className="w-full flex justify-start">
            {selectedValue === "cat1" && (
              <CategoryResultTable categoryResults={categoryResults} />
            )}
            {selectedValue === "cat2" && (
              <RuleTable categoryResults={categoryResults} />
            )}
          </div> */}
          <Typography variant="h3" className="mt-10">
            Result
          </Typography>
          <div className="w-full flex flex-col gap-5 justify-start">
            <CategoryResultTable categoryResults={categoryResults} />
            <RuleTable categoryResults={categoryResults} />
          </div>
        </>
      )}
    </div>
  );
};
