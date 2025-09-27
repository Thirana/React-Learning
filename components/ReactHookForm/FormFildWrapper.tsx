'use client'

import { Controller } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { FormFieldWrapperProps } from '@/types/ReactHookForm/formSchema'

export function FormFieldWrapper({
    control,
    fieldConfig,
    error,
}: FormFieldWrapperProps) {
    return (
        <div className="mb-6">
            <Label className="mb-2" htmlFor={fieldConfig.name}>
                {fieldConfig.label}
            </Label>

            <Controller
                name={fieldConfig.name}
                control={control}
                render={({ field }) => {
                    // Render Select dropdown
                    if (fieldConfig.type === 'select') {
                        return (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={fieldConfig.placeholder}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {fieldConfig.options?.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )
                    }

                    // 🔹 Render default Input (text, email, password, number)
                    return (
                        <Input
                            {...field}
                            type={fieldConfig.type}
                            placeholder={fieldConfig.placeholder}
                            className="mt-1"
                        />
                    )
                }}
            />

            {/* Display validation error */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
