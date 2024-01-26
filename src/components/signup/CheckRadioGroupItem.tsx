import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

export const CheckRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "flex aspect-square h-[2rem] w-[2rem] items-center justify-center rounded-full border border-gray-30 text-gray-30 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-0",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Image
          src="/icons/check.svg"
          alt=""
          width={28}
          height={28}
          className="h-[2rem] w-[2rem]"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
CheckRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
