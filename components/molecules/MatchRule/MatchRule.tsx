import { InteractiveHoverButton } from "@/components/atoms/Button/InteractiveHoverButton";
import { useDetectionStore } from "@/stores/useDetectionStore";

export const MatchRule = ({ file }: { file: File | null }) => {
  const { isLoading, isLoadingRule, setIsLoadingRule } = useDetectionStore();

  const handleDetectBoxes = async () => {
    if (!file || isLoading || isLoadingRule) return;

    const formData = new FormData();
    formData.append("file", file);
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingRule(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full">
        <InteractiveHoverButton
          text="Run Match Rule"
          onClick={handleDetectBoxes}
          disabled={!!!file}
          isLoading={isLoadingRule}
        />
      </div>
    </div>
  );
};
