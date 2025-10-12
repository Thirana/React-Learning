'use client'

import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { useCallback } from 'react'

/**
 * Generic fetcher for useSWRMutation.
 * It expects the trigger to be called with:
 * trigger({ url, method, body })
 */
const fetcher = async (
    _key: string, // ignore SWR key
    { arg }: { arg: { url: string; method: string; body?: any } }
) => {
    const { url, method = 'POST', body } = arg

    const options: RequestInit = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    }

    const response = await fetch(url, options)

    if (!response.ok) {
        let errorBody
        try {
            errorBody = await response.json()
        } catch {
            errorBody = { message: 'Unexpected Error' }
        }

        const error: any = new Error(errorBody?.message ?? 'Request failed')
        error.status = response.status
        error.details = errorBody
        throw error
    }

    return response.json()
}

/**
 * Custom SWR Mutation hook (POST, PUT, PATCH, DELETE)
 * @param key Unique key for mutation (e.g. "posts" or "users")
 * @param swrConfig Optional SWRMutation config (onSuccess, onError, etc.)
 */
export default function useMutation<TResponse = any>(
    key: string,
    swrConfig: SWRMutationConfiguration<
        TResponse,
        any,
        string,
        { url: string; method: string; body?: any }
    > = {}
) {
    if (!key) throw new Error('A mutation key must be provided.')

    const { trigger, data, error, isMutating } = useSWRMutation<
        TResponse,
        any,
        string,
        { url: string; method: string; body?: any }
    >(key, fetcher, swrConfig)

    const execute = useCallback(
        async ({
            endpoint,
            method = 'POST',
            body,
        }: {
            endpoint: string
            method?: string
            body?: any
        }) => {
            if (!endpoint) throw new Error('Endpoint is required.')

            const url = endpoint
            return trigger({ url, method, body })
        },
        [trigger]
    )

    return {
        data,
        error,
        loading: isMutating,
        execute,
    }
}
