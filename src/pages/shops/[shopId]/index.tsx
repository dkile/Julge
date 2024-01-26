import EmptyShopCard from "@/components/shop/EmptyShopCard";

export default function Shop() {
  const hasShopsInfo = false; // 기능 구현 전 임시 설정

  return !hasShopsInfo && <EmptyShopCard />;
}
