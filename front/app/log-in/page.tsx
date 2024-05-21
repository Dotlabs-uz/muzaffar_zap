"use client"
import { deleteCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect, useRouter } from 'next/navigation';

type Inputs = {
    password: string;
    login: string
};

const Login: React.FC = () => {
    const { push } = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.post("http://localhost:3030/authentication", { ...data, strategy: 'local' })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    console.log(res.data);

                    setCookie('userToken', res.data.accessToken);
                    push("/dashboard")
                }
            }).catch(err => console.log(err))
        // github_4
        // ozodbek_shukurov

        // console.log('Submitted password:', { ...data, strategy: 'local' });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Пароль:</label>
                    <Input
                        type="password"
                        placeholder='Пароль'
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                        className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    <label htmlFor="login" className="block text-gray-700 font-bold mb-2 mt-4">Имя:</label>
                    <Input
                        type="text"
                        placeholder='Пароль'
                        id="login"
                        {...register('login', { required: 'Name is required' })}
                        className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.login ? 'border-red-500' : ''}`}
                    />
                    {errors.login && <p className="text-red-500 text-xs italic">{errors.login.message}</p>}
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
