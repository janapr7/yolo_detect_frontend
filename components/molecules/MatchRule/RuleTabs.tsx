"use client";

import { RadioGroup, RadioGroupItem } from "@/components/atoms/Tabs/RadioGroup";
import { useId, useState } from "react";

export const RuleTabs = () => {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState("on");

  return (
    <div className="inline-flex h-9 rounded-lg p-0.5 w-full sm:w-fit bg-dark-secondary dark:bg-secondary">
      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="group w-full relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-dark-background dark:after:bg-background after:shadow-sm after:shadow-black/5 dark:after:shadow-white/5 after:outline-offset-2 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] has-[:focus-visible]:after:outline-2 has-[:focus-visible]:after:outline-ring/70 data-[state=off]:after:translate-x-0 data-[state=on]:after:translate-x-full"
        data-state={selectedValue}
      >
        <label className="relative text-primary dark:text-dark-primary z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-primary dark:group-data-[state=on]:text-dark-primary">
          Category Result
          <RadioGroupItem id={`${id}-1`} value="off" className="sr-only" />
        </label>
        <label className="relative text-primary dark:text-dark-primary z-10 inline-flex h-full min-w-8 cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=on]:text-primary dark:group-data-[state=on]:text-dark-primary">
          Rule Match
          <RadioGroupItem id={`${id}-2`} value="on" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  );
};
