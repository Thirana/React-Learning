'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { User } from '@/types/user'

type ViewUserDialogProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    user: User
}

export function ViewUserDialog({
    isOpen,
    onOpenChange,
    user,
}: ViewUserDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>👤 View User</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 mt-2">
                    <p>
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
