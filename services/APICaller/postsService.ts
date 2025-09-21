import { NewPost, UpdatePost } from '@/types/APICaller/file'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

export const postsService = {
    getAll: () => ({
        url: BASE_URL,
        method: 'GET' as const,
    }),

    getById: (id: number) => ({
        url: `${BASE_URL}/${id}`,
        method: 'GET' as const,
    }),

    create: (post: NewPost) => ({
        url: BASE_URL,
        method: 'POST' as const,
        body: post,
    }),

    update: (id: number, post: UpdatePost) => ({
        url: `${BASE_URL}/${id}`,
        method: 'PUT' as const,
        body: post,
    }),

    patch: (id: number, post: Partial<UpdatePost>) => ({
        url: `${BASE_URL}/${id}`,
        method: 'PATCH' as const,
        body: post,
    }),

    delete: (id: number) => ({
        url: `${BASE_URL}/${id}`,
        method: 'DELETE' as const,
    }),
}
