'use client'

import { useApi } from '@/hooks/APICaller/useApi'
import { Post } from '@/types/APICaller/file'
import { postsService } from '@/services/APICaller/postsService'
import { PostForm } from '@/components/APICaller/PostForm'
import { PostResultCard } from '@/components/APICaller/PostResultCard'
import { useEffect, useState } from 'react'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export default function PostsPlayground() {
    const [requestConfig, setRequestConfig] = useState<{
        url: string
        method: Method
        body?: unknown
    } | null>(null)

    const { data, loading, error, refetch } = useApi<Post | Post[], unknown>(
        requestConfig?.url ?? '',
        {
            method: requestConfig?.method,
            body: requestConfig?.body,
            autoFetch: false,
        }
    )

    const handleSubmit = (
        selectedMethod: Method,
        postId: string,
        title: string,
        bodyText: string
    ) => {
        let config

        switch (selectedMethod) {
            case 'GET':
                config = postId
                    ? postsService.getById(Number(postId))
                    : postsService.getAll()
                break
            case 'POST':
                config = postsService.create({
                    userId: 1,
                    title,
                    body: bodyText,
                })
                break
            case 'PUT':
                config = postsService.update(Number(postId), {
                    id: Number(postId),
                    title,
                    body: bodyText,
                })
                break
            case 'PATCH':
                config = postsService.patch(Number(postId), {
                    title,
                    body: bodyText,
                })
                break
            case 'DELETE':
                config = postsService.delete(Number(postId))
                break
        }

        setRequestConfig(config!)
    }

    useEffect(() => {
        if (requestConfig) {
            refetch()
        }
    }, [requestConfig, refetch])

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Posts API Playground</h1>
            <PostForm onSubmit={handleSubmit} loading={loading} />
            <PostResultCard data={data} error={error} />
        </div>
    )
}
