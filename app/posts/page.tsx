'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useFetchPosts } from '@/hooks/services/postsService'

export default function PostsPage() {
    const { data: posts, loading, error, refetch } = useFetchPosts()

    if (loading)
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                ))}
            </div>
        )

    if (error)
        return (
            <div className="p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Error fetching posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-500">
                            {error?.message || 'Something went wrong!'}
                        </p>
                        <Button onClick={refetch} className="mt-4">
                            Retry
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Posts</h1>
                <Button
                    onClick={refetch}
                    variant="outline"
                    className="hover:scale-105 transition-transform"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts?.length ? (
                    posts.map((post) => (
                        <Card
                            key={post.id}
                            className="hover:shadow-md transition flex flex-col h-full"
                        >
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg line-clamp-2">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <p className="text-sm text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
                                    {post.content}
                                </p>
                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            By {post.authorName}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <svg
                                            className="w-3 h-3 mr-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full flex justify-center">
                        <p className="text-muted-foreground">
                            No posts available.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
