// components/sidebar/items.ts
import {
    Settings,
    PhoneCall,
    FormInput,
    GitPullRequestIcon,
} from 'lucide-react'

export const sidebarItems = [
    { title: 'API Caller', url: '/api-caller', icon: PhoneCall },
    { title: 'React Hook Form', url: '/react-hook-form', icon: FormInput },
    { title: 'SWR Fetch', url: '/posts', icon: GitPullRequestIcon },
    { title: 'SWR Mutations', url: '/posts/new', icon: GitPullRequestIcon },
    { title: 'Settings', url: '#', icon: Settings },
]
