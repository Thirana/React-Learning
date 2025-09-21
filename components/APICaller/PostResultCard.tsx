import React from 'react'

interface PostResultCardProps {
    data: unknown
    error: Error | null
}

export function PostResultCard({ data, error }: PostResultCardProps) {
    if (error) {
        return (
            <div className="p-4 border rounded bg-red-100 text-red-700">
                Error: {error.message}
            </div>
        )
    }

    if (!data) return null

    return (
        <div className="p-4 border rounded shadow bg-gray-50 mt-4">
            <h2 className="font-bold mb-2">Response:</h2>
            <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}
