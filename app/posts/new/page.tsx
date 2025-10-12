'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { useCreatePost } from '@/hooks/services/postsService'
import { API_URLS } from '@/lib/apiUrls'

export default function CreatePostPage() {
    const { execute, loading, data, error } = useCreatePost()
    const [form, setForm] = useState({ title: '', content: '', authorName: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await execute({
                endpoint: API_URLS.POSTS,
                method: 'POST',
                body: form,
            })
            alert('Post created successfully!')
            setForm({ title: '', content: '', authorName: '' })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={form.title}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        title: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Input
                                id="content"
                                value={form.content}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        content: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <Label htmlFor="authorName">Author Name</Label>
                            <Input
                                id="authorName"
                                value={form.authorName}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        authorName: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Post'}
                        </Button>
                    </form>

                    {error && (
                        <p className="text-red-500 mt-3">
                            {error.details?.message || 'Something went wrong'}
                        </p>
                    )}
                    {data && (
                        <p className="text-green-600 mt-3">
                            ✅ Post created successfully!
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
