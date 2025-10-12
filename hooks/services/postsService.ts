import useFetch from '../useFetch'
import useMutation from '../useMutation'
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

export function useCreatePost() {
    //"create-post" ia a key for SWR
    return useMutation('create-post')
}
