import ky, { Input, KyInstance, Options } from "ky";

import { API_ROUTE } from "@/routes";

interface Fetcher extends Omit<KyInstance, "extend" | "create" | "stop"> {}

class KyAdapter implements Fetcher {
  #fetcher: KyInstance;

  constructor(fetcher: KyInstance) {
    this.#fetcher = fetcher;
  }

  get(url: Input, options?: Options) {
    return this.#fetcher.get(url, options);
  }

  post(url: Input, options?: Options) {
    return this.#fetcher.post(url, options);
  }

  put(url: Input, options?: Options) {
    return this.#fetcher.put(url, options);
  }

  delete(url: Input, options?: Options) {
    return this.#fetcher.delete(url, options);
  }

  patch(url: Input, options?: Options) {
    return this.#fetcher.patch(url, options);
  }

  head(url: Input, options?: Options) {
    return this.#fetcher.head(url, options);
  }

  setAccessToken(token?: string | null) {
    if (!token) return;

    this.#extend({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  removeAccessToken() {
    this.#extend({
      headers: {
        Authorization: undefined,
      },
    });
  }

  #extend(options: Options) {
    this.#fetcher = this.#fetcher.extend(options);
  }
}

export const fetcher = new KyAdapter(ky.create({ prefixUrl: API_ROUTE }));
