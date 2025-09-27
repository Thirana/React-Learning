export const registrationFormFields = [
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Enter your username',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter a strong password',
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Re-enter password',
    },
    {
        name: 'age',
        label: 'Age',
        type: 'number',
        placeholder: 'Enter your age',
    },
    {
        name: 'country',
        label: 'Country',
        type: 'select',
        placeholder: 'Select country',
        options: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'lk', label: 'Sri Lanka' },
            { value: 'in', label: 'India' },
        ],
    },
]
