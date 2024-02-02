export function colorCalculate(num: number) {
  let color = "";

  if (num >= 50) color = "text-red-40";
  else color = "text-red-30";

  return color;
}

export function riseRate(hourlyPay: number, originalHourlyPay: number) {
  return Math.floor((hourlyPay / originalHourlyPay - 1) * 100);
}
