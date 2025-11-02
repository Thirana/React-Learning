import { useState } from 'react'

export const MODAL_TYPES = {
    VIEW: 'view',
    DELETE: 'delete',
    EDIT: 'edit',
} as const

export type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES]

type ModalState<TData> = {
    isOpen: boolean
    data: TData | null
}

type ModalStates<TData> = Record<ModalType, ModalState<TData>>

const createInitialState = <TData>(): ModalStates<TData> => ({
    [MODAL_TYPES.VIEW]: { isOpen: false, data: null },
    [MODAL_TYPES.DELETE]: { isOpen: false, data: null },
    [MODAL_TYPES.EDIT]: { isOpen: false, data: null },
})

export const useModalManagement = <TData,>() => {
    const [modalStates, setModalStates] = useState<ModalStates<TData>>(
        () => createInitialState<TData>(),
    )

    const openModal = (modalType: ModalType, data?: TData) => {
        setModalStates((prev) => ({
            ...prev,
            [modalType]: { isOpen: true, data: data ?? null },
        }))
    }

    const closeModal = () => setModalStates(createInitialState<TData>())

    return {
        modalStates,
        openModal,
        closeModal,
    }
}
