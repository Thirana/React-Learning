import { z } from 'zod'

//Zod schema for validation
export const registrationSchema = z
    .object({
        username: z.string().min(3, 'Username must be at least 3 characters '),
        email: z.email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 3 characters'),
        confirmPassword: z.string(),
        age: z.coerce.number().min(18, 'You must be at least 18'),
        country: z.string().nonempty('Country is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['ConfirmPassword'],
    })

// initial form value object
export const initialRegistrationValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 18,
    country: '',
}

export interface FormFieldWrapperProps {
    control: any
    fieldConfig: {
        name: string
        label: string
        type: string
        placeholder?: string
        options?: { value: string; label: string }[]
    }
    error?: string
}
