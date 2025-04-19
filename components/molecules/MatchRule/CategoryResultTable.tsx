import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/atoms/Table/Table";
import { cn } from "@/utils/cn";

export const CategoryResultTable = ({
  categoryResults,
}: {
  categoryResults: any;
}) => {
  const tableRowClass =
    "*:border-secondary/20 dark:*:border-dark-secondary/20 hover:bg-transparent [&>:not(:last-child)]:border-r text-primary dark:text-dark-primary";
  const tableCellClass = " py-2 font-medium";
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-full min-w-96 rounded border border-dark-secondary/80 dark:border-secondary/80">
        <Table>
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
