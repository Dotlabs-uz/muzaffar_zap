"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    autoNumber: z.string().min(8).max(8),
    fullName: z.string().min(1),
    phoneNumber: z.string().min(17),
    type: z.string().min(1, {
        message: "ewew"

    }),
})

const Modal = ({ setOpenModal, token }: any) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            autoNumber: "",
            fullName: "",
            phoneNumber: "",
            type: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        axios.post("http://localhost:3030/cars", values, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                form.reset({
                    autoNumber: "",
                    fullName: "",
                    phoneNumber: "",
                    type: ""
                })
                setOpenModal(false)
                setLoading(false)
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div onClick={() => setOpenModal(false)} className='fixed top-0 left-0 h-screen w-full bg-black/30 backdrop-blur-sm z-50'>
            <div onClick={(e) => e.stopPropagation()} className="max-w-lg w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-9 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-5">
                    <p className='text-2xl font-medium'>Added Car</p>
                    <button onClick={() => setOpenModal(false)} type='button'>Закрыть</button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="autoNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="number car" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Имя и Фамилия" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        {/* <Input placeholder="Номер телефона"  /> */}
                                        <InputMask
                                            className='w-full py-2 px-2 text-base border rounded-md'
                                            mask="+\9\98(99)999-99-99"
                                            maskChar=""
                                            placeholder="Номер телефона"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            disabled={loading}
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified type to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">Другое</SelectItem>
                                            <SelectItem value="1">Такси</SelectItem>
                                            <SelectItem value="2">Грузовые</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} type='submit' className='w-full mt-3'>Создать</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Modal
