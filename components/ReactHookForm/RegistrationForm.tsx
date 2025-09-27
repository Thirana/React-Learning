'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
    registrationSchema,
    initialRegistrationValues,
} from '@/types/ReactHookForm/formSchema'
import { registrationFormFields } from '@/configs/forms/registrationFormFields'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormFieldWrapper } from '@/components/ReactHookForm/FormFildWrapper'
import { Button } from '@/components/ui/button'

export function RegistrationForm() {
    // registering React Hook form
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        // adding initial values to form
        defaultValues: initialRegistrationValues,
        // adding validation for form
        resolver: zodResolver(registrationSchema),
    })

    // simulating async API call
    const onSubmit = async (data: any) => {
        await new Promise((r) => setTimeout(r, 5500))
        console.log('Form data submitted', JSON.stringify(data, null, 2))
    }

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg p-6">
            <CardHeader>
                <CardTitle className="text-3xl text-center">
                    Registration
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/*    rendering all fields dynamically from registrationFormFields config*/}
                    {registrationFormFields.map((field) => (
                        <FormFieldWrapper
                            key={field.name}
                            control={control}
                            fieldConfig={field}
                            error={
                                errors[field.name as keyof typeof errors]
                                    ?.message
                            }
                        />
                    ))}

                    {/* submit button with loading state*/}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : isSubmitSuccessful
                              ? 'Submitted'
                              : 'Register'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
