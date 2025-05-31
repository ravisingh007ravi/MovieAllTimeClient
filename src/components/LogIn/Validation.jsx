import * as Yup from 'yup';


export const LogInSchema = Yup.object().shape({
    email: Yup.string().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format').required('Email is required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,'Invalid password format').required('Password is required').min(8, 'Password must be at least 8 characters'),
});