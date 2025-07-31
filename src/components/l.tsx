'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export default function ProductTableSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md mt-4">
      <div className="p-4 bg-gray-100">
        <Skeleton className="h-6 w-32" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {["Name", "Category", "Price", "Quantity", "Image", "Actions"].map((head) => (
              <TableHead key={head} className="text-center">{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {[...Array(6)].map((_, cellIndex) => (
                <TableCell key={cellIndex}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}