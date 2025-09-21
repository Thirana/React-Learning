import { useState, useCallback, useEffect } from 'react'

// --- Options for the hook ---
interface UseApiOptions<TBody> {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    body?: TBody
    headers?: HeadersInit
    autoFetch?: boolean
}

// --- Response shape returned by the hook ---
interface ApiResponse<TData> {
    data: TData | null
    loading: boolean
    error: Error | null
    refetch: () => Promise<void>
}

// --- The custom hook ---
export function useApi<Tdata, TBody = unknown>(
    url: string,
    options: UseApiOptions<TBody> = {}
): ApiResponse<Tdata> {
    const { method = 'GET', body, headers, autoFetch = true } = options

    // State for API lifecycle
    const [data, setData] = useState<Tdata | null>(null)
    const [loading, setLoading] = useState(autoFetch)
    const [error, setError] = useState<Error | null>(null)

    // Core fetching logic
    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            // merge headers separately
            const mergedHeaders: HeadersInit = {
                'Content-Type': 'application/json',
                ...(headers ?? {}),
            }

            const response = await fetch(url, {
                method,
                headers: mergedHeaders,
                body: body ? JSON.stringify(body) : undefined,
            })

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }

            const json = (await response.json()) as Tdata
            setData(json)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }, [url, method, body, headers])

    // Auto-fetch if enabled
    useEffect(() => {
        if (autoFetch) {
            fetchData()
        }
    }, [fetchData, autoFetch])

    // Return API state + manual refetch function
    return { data, loading, error, refetch: fetchData }
}
