'use client'

import { useModalManagement, MODAL_TYPES } from '@/hooks/useModalManagement'
import { ViewUserDialog } from '@/components/modalManagement/ViewUserDialog'
import { DeleteUserDialog } from '@/components/modalManagement/DeleteUserDialog'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { User } from '@/types/user'

export default function UserManagementPage() {
    const { modalStates, openModal, closeModal } = useModalManagement<User>()

    const dummyUsers: User[] = [
        { id: 1, name: 'Thirana Ramuditha', email: 'thirana@example.com' },
        { id: 2, name: 'John Doe', email: 'john@example.com' },
    ]

    const handleDeleteUser = (user: User) => {
        console.log('User deleted:', user)
        closeModal()
    }

    const handleDialogOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            closeModal()
        }
    }

    const handleViewClick = (user: User) => openModal(MODAL_TYPES.VIEW, user)
    const handleDeleteClick = (user: User) =>
        openModal(MODAL_TYPES.DELETE, user)

    const viewModalState = modalStates[MODAL_TYPES.VIEW]
    const deleteModalState = modalStates[MODAL_TYPES.DELETE]

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">👥 User Management</h2>

            <div className="space-y-3">
                {dummyUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex justify-between items-center border p-3 rounded-md"
                    >
                        <span>{user.name}</span>
                        <div className="space-x-2">
                            <Button
                                onClick={() => handleViewClick(user)}
                                variant="secondary"
                            >
                                View
                            </Button>
                            <Button
                                onClick={() => handleDeleteClick(user)}
                                variant="destructive"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Suspense fallback={null}>
                {viewModalState.isOpen && viewModalState.data && (
                    <ViewUserDialog
                        isOpen={viewModalState.isOpen}
                        user={viewModalState.data}
                        onOpenChange={handleDialogOpenChange}
                    />
                )}

                {deleteModalState.isOpen && deleteModalState.data && (
                    <DeleteUserDialog
                        isOpen={deleteModalState.isOpen}
                        user={deleteModalState.data}
                        onConfirm={handleDeleteUser}
                        onOpenChange={handleDialogOpenChange}
                    />
                )}
            </Suspense>
        </div>
    )
}
