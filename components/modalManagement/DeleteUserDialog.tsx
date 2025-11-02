'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { User } from '@/types/user'

type DeleteUserDialogProps = {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    user: User
    onConfirm: (user: User) => void
}

export function DeleteUserDialog({
    isOpen,
    onOpenChange,
    user,
    onConfirm,
}: DeleteUserDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>🗑️ Delete User</DialogTitle>
                </DialogHeader>
                <p>
                    Are you sure you want to delete <strong>{user.name}</strong>
                    ?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onConfirm(user)}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
