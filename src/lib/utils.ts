import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDiscountValid(discountEndsAt: Date | null): boolean {
  if (!discountEndsAt) return false;
  return new Date() < new Date(discountEndsAt);
}

export function getEffectiveDiscount(discount: number | null, discountEndsAt: Date | null): number {
  if (!discount || discount <= 0) return 0;
  if (!isDiscountValid(discountEndsAt)) return 0;
  return discount;
}

export function getDiscountedPrice(price: number | null, discount: number | null, discountEndsAt: Date | null): number {
  if (!price || price <= 0) return 0;
  const effectiveDiscount = getEffectiveDiscount(discount, discountEndsAt);
  return price - (price * effectiveDiscount) / 100;
}

export function toPersianDigits(input: number | string): string {
  const englishDigits = input.toString();
  const withThousandsSeparator = englishDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const persianDigits = withThousandsSeparator.replace(/\d/g, (digit) =>
    '۰۱۲۳۴۵۶۷۸۹'[parseInt(digit)]
  );
  return persianDigits;
}
