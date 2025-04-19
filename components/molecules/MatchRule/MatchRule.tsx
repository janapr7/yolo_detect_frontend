import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";
import { CATEGORY_LIST } from "@/constants/rule";
import { useDetectionStore } from "@/stores/useDetectionStore";
import { useState } from "react";
import { RuleTabs } from "./RuleTabs";
import { CategoryResultTable } from "./CategoryResultTable";

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
  const [categoryResults, setCategoryResults] = useState<
    Record<string, CategoryResult>
  >({});
  const [boxList, setBoxList] = useState([]);

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
    setIsLoadingRule(true);
    setBoxList([]);

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
      <RuleTabs />
      <div className="w-full flex justify-start">
        <CategoryResultTable />
      </div>
    </div>
  );
};
