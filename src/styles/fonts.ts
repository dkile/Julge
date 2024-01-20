import localFont from "next/font/local";

export const fontSpoqaHanSansNeo = localFont({
  src: [
    {
      path: "../../static/fonts/SpoqaHanSansNeo-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../static/fonts/SpoqaHanSansNeo-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../static/fonts/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-spoqa",
});

export const fontPretendard = localFont({
  src: [
    {
      path: "../../static/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../static/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});
