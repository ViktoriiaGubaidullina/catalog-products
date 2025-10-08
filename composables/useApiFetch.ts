import type {NitroFetchOptions} from "nitropack/types";

export function useApiFetch<T>(path: string, options: NitroFetchOptions<string> = {}): Promise<T> {
    const config = useRuntimeConfig();
    return $fetch<T>(path, { baseURL: config.public.apiBase, ...options });
}
