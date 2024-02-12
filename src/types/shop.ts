export type NoticeRegistFormField = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export type Shop = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: string;
};
