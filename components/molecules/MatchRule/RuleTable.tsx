import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table/Table";
import { DETECTION_RULE } from "@/constants/rule";
import { CategoryResult, RuleValue, Trait } from "@/types/detection";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

export const RuleTable = ({ categoryResults }: { categoryResults: any }) => {
  const initialValue = {
    openness: { positive: 0, negative: 0 },
    conscientiousness: { positive: 0, negative: 0 },
    extraversion: { positive: 0, negative: 0 },
    agreeableness: { positive: 0, negative: 0 },
    neuroticism: { positive: 0, negative: 0 },
  };
  const [ruleValue, setRuleValue] = useState(initialValue);
  const [isSaturnus, setIsSaturnus] = useState(false);

  const applyDetectionRules = (data: Record<string, CategoryResult>) => {
    setIsSaturnus(!!categoryResults.category5);
    const updatedValue: RuleValue = JSON.parse(JSON.stringify(initialValue)); // deep copy

    Object.entries(data).forEach(([categoryKey, categoryData]) => {
      if (categoryData && categoryData.label && DETECTION_RULE[categoryKey]) {
        const label = categoryData.label;
        const rules = DETECTION_RULE[categoryKey][label];

        if (rules) {
          Object.entries(rules).forEach(([trait, value]) => {
            if (value === "+") {
              updatedValue[trait as Trait].positive += 1;
            } else if (value === "-") {
              updatedValue[trait as Trait].negative += 1;
            }
          });
        }
      }
    });

    setRuleValue(updatedValue);
  };

  useEffect(() => {
    applyDetectionRules(categoryResults);
  }, [categoryResults]);

  const handleTraitLevel = (trait: Trait) => {
    if (ruleValue?.[trait].positive > 0 && ruleValue?.[trait].negative > 0)
      return "Medium";
    if (ruleValue?.[trait].positive > 0 && ruleValue?.[trait].negative === 0) {
      if (trait === "conscientiousness" && isSaturnus) return "High";
      return "High";
    }
    if (ruleValue?.[trait].positive === 0 && ruleValue?.[trait].negative > 0) {
      if (trait === "conscientiousness" && isSaturnus) return "High";
      return "Low";
    }
    return "-";
  };

  const tableRowClassHead =
    "*:border-dark-secondary/80 dark:*:border-secondary/80 hover:bg-dark-secondary/50 dark:hover:bg-secondary/50 [&>:not(:last-child)]:border-r text-primary dark:text-dark-primary bg-dark-secondary/40 dark:bg-secondary/40";
  const tableRowClass =
    "*:border-dark-secondary/80 dark:*:border-secondary/80 hover:bg-dark-secondary/50 dark:hover:bg-secondary/50 [&>:not(:last-child)]:border-r text-primary dark:text-dark-primary";
  const tableCellClass = " py-2";
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-120 rounded border border-dark-secondary/80 dark:border-secondary/80">
        <Table>
          <TableHeader>
            <TableRow className={cn(tableRowClassHead)}>
              <TableHead className={cn(tableCellClass, "")}>Trait</TableHead>
              <TableHead className="py-2">Total (+)</TableHead>
              <TableHead className="py-2">Total (-)</TableHead>
              <TableHead className="py-2">is Saturnus?</TableHead>
              <TableHead className="py-2">Level</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>Openness</TableCell>
              <TableCell className="py-2">
                {ruleValue.openness.positive}
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.openness.negative}
              </TableCell>
              <TableCell className="py-2">
                {isSaturnus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2">
                {handleTraitLevel("openness")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                Conscientiousness
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.conscientiousness.positive}
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.conscientiousness.negative}
              </TableCell>
              <TableCell className="py-2">
                {isSaturnus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2">
                {handleTraitLevel("conscientiousness")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>Extraversion</TableCell>
              <TableCell className="py-2">
                {ruleValue.extraversion.positive}
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.extraversion.negative}
              </TableCell>
              <TableCell className="py-2">
                {isSaturnus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2">
                {handleTraitLevel("extraversion")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                Agreeableness
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.agreeableness.positive}
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.agreeableness.negative}
              </TableCell>
              <TableCell className="py-2">
                {isSaturnus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2">
                {handleTraitLevel("agreeableness")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>Neuroticism</TableCell>
              <TableCell className="py-2">
                {ruleValue.neuroticism.positive}
              </TableCell>
              <TableCell className="py-2">
                {ruleValue.neuroticism.negative}
              </TableCell>
              <TableCell className="py-2">
                {isSaturnus ? "Yes" : "No"}
              </TableCell>
              <TableCell className="py-2">
                {handleTraitLevel("neuroticism")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
