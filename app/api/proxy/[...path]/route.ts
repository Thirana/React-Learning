import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = 'http://localhost:3010'

//  Notice that `params` must now be awaited (it's a Promise)
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params
    return handleRequest(request, path, 'GET')
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params
    return handleRequest(request, path, 'POST')
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params
    return handleRequest(request, path, 'PUT')
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params
    return handleRequest(request, path, 'DELETE')
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params
    return handleRequest(request, path, 'PATCH')
}

// Now this helper receives plain `path` (string[])
async function handleRequest(
    request: NextRequest,
    path: string[],
    method: string
) {
    try {
        // Reconstruct full URL
        const url = `${BACKEND_URL}/${path.join('/')}`

        // Add query params if any
        const searchParams = request.nextUrl.searchParams
        const queryString = searchParams.toString()
        const fullUrl = queryString ? `${url}?${queryString}` : url

        // Read body if method allows it
        let body = undefined
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                body = await request.text()
            } catch {
                body = undefined
            }
        }

        // Forward headers (exclude internal)
        const headers: Record<string, string> = {}
        request.headers.forEach((value, key) => {
            if (
                !['host', 'connection', 'upgrade'].includes(key.toLowerCase())
            ) {
                headers[key] = value
            }
        })

        // 🔁 Forward the request to backend
        const response = await fetch(fullUrl, {
            method,
            headers,
            body: body || undefined,
        })

        // ✅ Return JSON response back to client
        const contentType = response.headers.get('content-type')
        let data
        if (contentType && contentType.includes('application/json')) {
            data = await response.json()
        } else {
            data = await response.text()
        }

        const responseHeaders = new Headers()
        response.headers.forEach((value, key) => {
            responseHeaders.set(key, value)
        })

        return NextResponse.json(data, {
            status: response.status,
            headers: responseHeaders,
        })
    } catch (error) {
        console.error(`Error proxying ${method} request:`, error)
        return NextResponse.json(
            { error: `Failed to ${method.toLowerCase()} resource` },
            { status: 500 }
        )
    }
}
