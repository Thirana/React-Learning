// components/sidebar/AppSidebar.tsx
import {
    Sidebar,
    SidebarContent,
    SidebarSeparator,
} from '@/components/ui/sidebar'

import SidebarHeaderSection from './sections/SidebarHeaderSection'
import SidebarApplicationSection from './sections/SidebarApplicationSection'
import SidebarProjectsSection from './sections/SidebarProjectsSection'
import SidebarCollapsibleSection from './sections/SidebarCollapsibleSection'
import SidebarNestedSection from './sections/SidebarNestedSection'
import SidebarFooterSection from './sections/SidebarFooterSection'

export default function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeaderSection />
            <SidebarSeparator />
            <SidebarContent>
                <SidebarApplicationSection />
                <SidebarProjectsSection />
                <SidebarCollapsibleSection />
                <SidebarNestedSection />
            </SidebarContent>
            <SidebarFooterSection />
        </Sidebar>
    )
}
