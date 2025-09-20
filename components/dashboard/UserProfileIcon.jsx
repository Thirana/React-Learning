import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, Settings, User } from 'lucide-react'

const UserProfileIcon = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>TE</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10}>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfileIcon
