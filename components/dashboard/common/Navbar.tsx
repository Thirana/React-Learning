import { ModeToggle } from '@/components/mode-toggler'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="p-4 flex items-center justify-between">
            {/*LEFT*/}
            collapsbutton
            {/*LEFT*/}
            <div className="flex items-center gap-4">
                <Link href="/">Dashboard</Link>

                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar
