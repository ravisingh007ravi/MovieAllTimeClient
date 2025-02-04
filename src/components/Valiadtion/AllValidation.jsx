import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
    name: Yup.string() .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed').min(2).max(50).required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
});


