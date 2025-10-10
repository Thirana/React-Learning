// components/sidebar/items.ts
import {
    Calendar,
    Search,
    Settings,
    PhoneCall,
    FormInput,
    GitPullRequestIcon,
} from 'lucide-react'

export const sidebarItems = [
    { title: 'API Caller', url: '/api-caller', icon: PhoneCall },
    { title: 'React Hook Form', url: '/react-hook-form', icon: FormInput },
    { title: 'SWR Fetch', url: '/posts', icon: GitPullRequestIcon },
    { title: 'Search', url: '#', icon: Search },
    { title: 'Settings', url: '#', icon: Settings },
]
