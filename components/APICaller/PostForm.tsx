import React, { useState } from 'react'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface PostFormProps {
    onSubmit: (
        method: Method,
        postID: string,
        title: string,
        body: string
    ) => void
    loading: boolean
}

export function PostForm({ onSubmit, loading }: PostFormProps) {
    const [method, setMethod] = useState<Method>('GET')
    const [postId, setPostId] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(method, postId, title, body)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-4 border rounded shadow bg-white"
        >
            <div>
                <label className="block font-medium">HTTP Method</label>
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as Method)}
                    className="border rounded p-2 w-full"
                >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="PATCH">PATCH</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>

            {method !== 'POST' && (
                <div>
                    <label className="block font-medium">Post ID</label>
                    <input
                        type="number"
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Enter Post ID"
                    />
                </div>
            )}

            {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
                <>
                    <div>
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Enter title"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="border rounded p-2 w-full"
                            placeholder="Enter body"
                        />
                    </div>
                </>
            )}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
            >
                {loading ? 'Processing...' : 'Send Request'}
            </button>
        </form>
    )
}
