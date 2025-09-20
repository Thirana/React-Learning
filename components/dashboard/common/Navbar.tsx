import { ModeToggle } from '@/components/mode-toggler'
import Link from 'next/link'
import UserProfileIcon from '@/components/dashboard/UserProfileIcon'

const Navbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between">
            {/*LEFT*/}
            collapsbutton
            {/*LEFT*/}
            <div className="flex items-center gap-8">
                <Link href="/">Dashboard</Link>

                <ModeToggle />

                <UserProfileIcon />
            </div>
        </nav>
    )
}

export default Navbar
