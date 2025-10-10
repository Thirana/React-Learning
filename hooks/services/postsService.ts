import useFetch from '../useFetch'
import { API_URLS } from '@/lib/apiUrls'
import { Post } from '@/types/posts'

// (GET) all posts
export function useFetchPosts() {
    return useFetch<Post[]>(API_URLS.POSTS)
}

// (GET) single post by ID
export function useFetchPostById(id?: string | number) {
    return useFetch(id ? `${API_URLS.POSTS}/${id}` : null)
}
