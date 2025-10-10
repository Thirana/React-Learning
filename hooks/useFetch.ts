import useSWR, { SWRConfiguration, Key } from 'swr'

const fetcher = async ([url, options]: [string, RequestInit?]) => {
    const opts: RequestInit = options ?? {}

    // Optional: add authorization here later (e.g., await addAuthorizationHeader(opts))

    const res = await fetch(url, opts)

    if (!res.ok) {
        const err: any = new Error('An Error occurred while fetching the data')

        //parsing error body safely
        try {
            err.details = await res.json()
        } catch {
            err.details = { message: await res.text() }
        }
        err.status = res.status
        throw err
    }

    return res.json()
}

type IUseFetchResult<T> = {
    data?: T | null
    error?: any | null
    loading: boolean
    refetch: () => Promise<T | undefined>
    mutate: (
        data?:
            | T
            | Promise<T | undefined>
            | ((curr?: T) => T | Promise<T | undefined>),
        shouldRevalidate?: boolean
    ) => Promise<T | undefined>
}

/**
 * Generic hook
 * - T: data type returned by the endpoint
 * - E: error type (not strictly used here, kept for future)
 */
export default function useFetch<T = any>(
    endpoint?: string | null,
    fetchOptions: RequestInit = {},
    swrConfig: SWRConfiguration = {}
): IUseFetchResult<T> {
    const url = endpoint ? endpoint : null

    /**
     * Important: we must keep the "key" stable between renders unless something
     * meaningful changed. Passing raw objects (like fetchOptions) directly as array
     * elements can cause identity changes each render and cause refetches.
     *
     * Strategies:
     *  - Prefer passing only serializable values in the key (strings/primitives).
     *  - Or memoize the options object (below).
     */
    const defaultFetchOptions = (() => {
        const isPost =
            (fetchOptions.method ?? 'GET').toString().toUpperCase() == 'POST'
        const headers = {
            ...(isPost && { 'Content-Type': 'application/json' }),
            ...(fetchOptions.headers ?? {}),
        }

        // create a shallow-cloned serializable options object (RequestInit can include functions, but avoid them)
        return {
            ...fetchOptions,
            method: fetchOptions.method ?? 'GET',
            headers,
            // explicitly set cache: 'no-store' to disable browser caching by default if desired
            cache: (fetchOptions as any).cache ?? 'no-store',
        } as RequestInit
    })()

    // Key pattern: [url, options]. If url is null => do not fetch.
    // If you run into refetches due to object identity, consider JSON.stringify(options)
    // into the key: [url, JSON.stringify(defaultFetchOptions)]
    const key: Key = url ? [url, defaultFetchOptions] : null

    const { data, error, isLoading, isValidating, mutate } = useSWR<T>(
        key,
        fetcher,
        {
            // sensible defaults for an app where we don't want automatic focus revalidate
            revalidateOnFocus: swrConfig.revalidateOnFocus ?? false,
            revalidateOnReconnect: swrConfig.revalidateOnReconnect ?? false,
            dedupingInterval: swrConfig.dedupingInterval ?? 0,
            // spread user config last to allow overriding
            ...swrConfig,
        }
    )

    // Optional: central error handling hook/side-effect could be placed here (ErrorInterceptor)
    // if (error) ErrorInterceptor(error?.details?.statusCode);

    const refetch = async () => {
        // bound mutate call with no arguments will revalidate
        // mutate() returns a Promise that resolves to the current data
        return mutate()
    }

    return {
        data: data ?? null,
        error: error ? (error.details ?? error) : null,
        loading: Boolean(isLoading || isValidating),
        refetch,
        mutate,
    }
}
