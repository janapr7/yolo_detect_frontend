import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table/Table";
import { DETECTION_RULE } from "@/constants/rule";
import {
  BORDER_CLASS,
  TABLE_CELL_CLASS,
  TABLE_CELL_CLASS_HEAD,
  TABLE_ROW_CLASS,
  TABLE_ROW_CLASS_HEAD,
} from "@/constants/style";
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

  const getLevel = (category: string, type: string, trait: Trait) => {
    if (categoryResults?.[category]?.label !== type) return "";
    if (DETECTION_RULE?.[category]?.[type]) {
      if (DETECTION_RULE?.[category]?.[type]?.[trait]) {
        if (DETECTION_RULE?.[category]?.[type]?.[trait] === "+") {
          return "High";
        } else if (DETECTION_RULE?.[category]?.[type]?.[trait] === "-") {
          return "Low";
        } else return "";
      }
      return "";
    }
    return "No data";
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-120 rounded border border-dark-secondary/80 dark:border-secondary/80">
        <Table>
          <TableHeader>
            <TableRow className={cn(TABLE_ROW_CLASS_HEAD, BORDER_CLASS)}>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>Type</TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Openness
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Conscientiousness
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Extraversion
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Agreeableness
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Neuroticism
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>Fire</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Fire", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Fire", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Fire", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Fire", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Fire", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>Water</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Water", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Water", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Water", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Water", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Water", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>Earth</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Earth", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Earth", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Earth", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Earth", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Earth", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS, BORDER_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>Air</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Air", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Air", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Air", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Air", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category1", "Air", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                High_LineFreq
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "High_FLine", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "High_FLine", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "High_FLine", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "High_FLine", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Medium_LineFreq
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Medium_FLine", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Medium_FLine", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Medium_FLine", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Medium_FLine", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Medium_FLine", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS, BORDER_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Low_LineFreq
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Low_FLine", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Low_FLine", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Low_FLine", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Low_FLine", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category2", "Low_FLine", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Long_MercuryF
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Long_MercuryF", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Long_MercuryF", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Long_MercuryF", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Long_MercuryF", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Long_MercuryF", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS, BORDER_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Short_MercuryF
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Short_MercuryF", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Short_MercuryF", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Short_MercuryF", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Short_MercuryF", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category3", "Short_MercuryF", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>High_LMars</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "High_LMars", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "High_LMars", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "High_LMars", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "High_LMars", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "High_LMars", "neuroticism")}
              </TableCell>
            </TableRow>

            <TableRow className={cn(TABLE_ROW_CLASS, BORDER_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>Low_LMars</TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "Low_LMars", "openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "Low_LMars", "conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "Low_LMars", "extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "Low_LMars", "agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {getLevel("category4", "Low_LMars", "neuroticism")}
              </TableCell>
            </TableRow>

            {/* <TableRow className={cn(TABLE_ROW_CLASS, BORDER_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Saturnus_Line
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}></TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {isSaturnus ? "High" : ""}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}></TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}></TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}></TableCell>
            </TableRow> */}

            <TableRow className={cn(TABLE_ROW_CLASS_HEAD)}>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                Result
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                {handleTraitLevel("openness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                {handleTraitLevel("conscientiousness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                {handleTraitLevel("extraversion")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                {handleTraitLevel("agreeableness")}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS_HEAD)}>
                {handleTraitLevel("neuroticism")}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
