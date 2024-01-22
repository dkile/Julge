import ky from "ky";

import { API_ROUTE } from "@/routes";

export const fetcher = ky.create({
  prefixUrl: API_ROUTE,
});
