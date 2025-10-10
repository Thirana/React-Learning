import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = 'http://localhost:3010'

export async function GET(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params, 'GET')
}

export async function POST(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params, 'POST')
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params, 'PUT')
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params, 'DELETE')
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { path: string[] } }
) {
    return handleRequest(request, params, 'PATCH')
}

async function handleRequest(
    request: NextRequest,
    params: { path: string[] },
    method: string
) {
    try {
        // Reconstruct the path from the dynamic route
        const path = params.path.join('/')
        const url = `${BACKEND_URL}/${path}`

        // Get query parameters from the request
        const searchParams = request.nextUrl.searchParams
        const queryString = searchParams.toString()
        const fullUrl = queryString ? `${url}?${queryString}` : url

        // Get request body for POST, PUT, PATCH requests
        let body = undefined
        if (['POST', 'PUT', 'PATCH'].includes(method)) {
            try {
                body = await request.text()
            } catch {
                body = undefined
            }
        }

        // Forward headers (excluding host and other Next.js specific headers)
        const headers: Record<string, string> = {}
        request.headers.forEach((value, key) => {
            if (
                !['host', 'connection', 'upgrade'].includes(key.toLowerCase())
            ) {
                headers[key] = value
            }
        })

        const response = await fetch(fullUrl, {
            method,
            headers,
            body: body || undefined,
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Forward response headers
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
