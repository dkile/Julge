import ky from "ky";

import { API_ROUTE } from "@/routes";

export const fetcher = ky.create({
  prefixUrl: API_ROUTE,
  hooks: {
    beforeError: [
      async (err) => {
        const { response } = err;
        if (response && response.body) {
          const { message } = await response.json();
          err.message = message;
        }

        return err;
      },
    ],
  },
});
