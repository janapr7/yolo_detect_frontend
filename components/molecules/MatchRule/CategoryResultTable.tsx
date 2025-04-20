import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atoms/Table/Table";
import { cn } from "@/utils/cn";

export const CategoryResultTable = ({
  categoryResults,
}: {
  categoryResults: any;
}) => {
  const tableRowClassHead =
    "*:border-dark-secondary/80 dark:*:border-secondary/80 hover:bg-dark-secondary/50 dark:hover:bg-secondary/50 [&>:not(:last-child)]:border-r text-primary dark:text-dark-primary bg-dark-secondary/40 dark:bg-secondary/40";
  const tableRowClass =
    "*:border-dark-secondary/80 dark:*:border-secondary/80 hover:bg-dark-secondary/50 dark:hover:bg-secondary/50 [&>:not(:last-child)]:border-r text-primary dark:text-dark-primary";
  const tableCellClass = "py-2";
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-120 rounded border border-dark-secondary/80 dark:border-secondary/80">
        <Table>
          <TableHeader>
            <TableRow className={cn(tableRowClassHead)}>
              <TableHead className={cn(tableCellClass, "")}>Category</TableHead>
              <TableHead className="py-2">Detected</TableHead>
              <TableHead className="py-2">Confidence</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                Water/Fire/Earth/Air
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category1?.label || "-"}
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category1?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                FLine (Short/Medium/High)
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category2?.label || "-"}
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category2?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                MercuryF (Short/Long)
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category3?.label || "-"}
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category3?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                LMars (Low/High)
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category4?.label || "-"}
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category4?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
            <TableRow className={cn(tableRowClass)}>
              <TableCell className={cn(tableCellClass)}>
                Saturnus_Line
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category5?.label || "-"}
              </TableCell>
              <TableCell className="py-2">
                {categoryResults?.category5?.confidence?.toFixed(2) || "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
