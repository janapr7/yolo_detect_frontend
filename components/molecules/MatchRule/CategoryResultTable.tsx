import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table/Table";
import {
  TABLE_CELL_CLASS_HEAD,
  TABLE_ROW_CLASS,
  TABLE_ROW_CLASS_HEAD,
} from "@/constants/style";
import { TABLE_CELL_CLASS } from "@/constants/style";
import { cn } from "@/utils/cn";

export const CategoryResultTable = ({
  categoryResults,
}: {
  categoryResults: any;
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-120 rounded border border-dark-secondary/80 dark:border-secondary/80">
        <Table>
          <TableHeader>
            <TableRow className={cn(TABLE_ROW_CLASS_HEAD)}>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD, "")}>
                Category
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Detected
              </TableHead>
              <TableHead className={cn(TABLE_CELL_CLASS_HEAD)}>
                Confidence
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Water/Fire/Earth/Air
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category1?.label || "-"}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category1?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                LineFreq (Short/Medium/High)
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category2?.label || "-"}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category2?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                MercuryF (Short/Long)
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category3?.label || "-"}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category3?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                LMars (Low/High)
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category4?.label || "-"}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category4?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(TABLE_ROW_CLASS)}>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                Saturnus_Line
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category5?.label || "-"}
              </TableCell>
              <TableCell className={cn(TABLE_CELL_CLASS)}>
                {categoryResults?.category5?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
