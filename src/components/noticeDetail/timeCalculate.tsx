export const calculateTime = (time: string, workhour: number) => {
  if (!time) {
    // time이 유효하지 않은 경우 빈 배열을 반환합니다.
    return ["", "", "", ""];
  }

  const startDay = time.split("T")[0];
  const startTime = time.split("T")[1]?.split(":")[0] || "";
  const minute = time.split("T")[1]?.split(":")[1] || "";
  const endTimeCal =
    +startTime + +workhour >= 24
      ? +startTime + +workhour - 24
      : +startTime + +workhour;
  const endTime = 10 > endTimeCal ? "0" + endTimeCal : endTimeCal;

  return [startDay, startTime, minute, endTime];
};
