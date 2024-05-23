"use client"
import { deleteCookie, setCookie } from 'cookies-next';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { redirect, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';

type Inputs = {
    password: string;
    login: string
};

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [ISpandding, setISpandding] = useState(false);
    const { push } = useRouter()
    const [role, setRole] = useState("");
    console.log(role);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setISpandding(true)
        axios.post(`http://localhost:3030/authentication/${role}`, { ...data, strategy: 'local' })
            .then((res) => {
                console.log(res);
                if (res.status === 200 || res.status === 201) {

                    setCookie('userToken', res.data.accessToken);
                    push("/dashboard")
                    setISpandding(true)
                }
            }).catch(err => {
                setISpandding(true)
                console.log(err)
            })
        // github_4             password
        // ozodbek_shukurov     log in
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <div className="mb-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="role" className="block text-gray-700 font-bold mb-2">Роль:</label>
                        {
                            role === "" ? "Выберите роль" : ""
                        }
                    </div>
                    <Select onValueChange={(e) => setRole(e)} >
                        <SelectTrigger id='role'>
                            <SelectValue placeholder="Роль" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admins">Admin</SelectItem>
                            <SelectItem value="operators">Operator</SelectItem>
                        </SelectContent>
                    </Select>
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2 mt-4">Пароль:</label>
                    <Input
                        disabled={ISpandding || role ? false : true}
                        type="password"
                        placeholder='Пароль'
                        id="password"
                        {...register('password', { required: 'Password is required' })}
                        className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                    <label htmlFor="login" className="block text-gray-700 font-bold mb-2 mt-4">Логин:</label>
                    <Input
                        disabled={ISpandding || role ? false : true}
                        type="text"
                        placeholder='Логин'
                        id="login"
                        {...register('login', { required: 'log in is required' })}
                        className={`border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${errors.login ? 'border-red-500' : ''}`}
                    />
                    {errors.login && <p className="text-red-500 text-xs italic">{errors.login.message}</p>}
                </div>
                <Button
                    disabled={ISpandding}
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
