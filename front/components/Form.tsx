"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Modal from '@/components/Modal';
import axios from 'axios';
import restClient from '@/feathers';
import { getCookie } from 'cookies-next';

type Inputs = {
    autoNumber: string;
    column: number
    volume: number
    price: number
};

const Form = ({ token }: any) => {
    const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();
    const [openModal, setOpenModal] = useState(false);
    const [cars, setCars] = useState<any>([]);
    const [search, setSearch] = useState<string>("");

    const onSubmit = async (data: any) => {
        data = {
            ...data, 
            volume: Number(data.volume),
            column: Number(data.column),
            price: Number(data.price)
        }
        console.log(data, "dede");

        axios.post("http://localhost:3030/purchases", data, {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                console.log(res);
            })
    };

    useEffect(() => {
        axios.get("http://localhost:3030/cars",
            {
                headers: {
                    Authorization: token,
                }
            }
        )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setCars(res.data.data);
                }
            })
    }, [])

    return (
        <div className="px-3 h-screen pt-3 pb-5 w-full flex flex-col bg-black">
            {
                openModal && (
                    <Modal setOpenModal={setOpenModal} />
                )
            }
            <form className='flex flex-col h-full' onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex items-center justify-center gap-5 pt-9 pb-5 rounded-lg bg-[#121212]">
                    <Input
                        type="text"
                        autoComplete='off'
                        onVolumeChange={(e: any) => setSearch(e.target.value)}
                        className={`max-w-3xl py-5 bg-[#242424] text-white ${errors.autoNumber && "border border-[red] outline-[red]"}`}
                        {...register("autoNumber", { pattern: /\d{2}\s?(?:[A-Za-z]\s\d{3}|\d{3})\s?[A-Za-z]{2,3}/g, required: true })}
                    />
                    <Button onClick={() => setOpenModal(true)} type='button' className="bg-green-700 hover:bg-green-600 text-2xl h-11">+</Button>
                </div>
                <ResizablePanelGroup direction="vertical" className="mt-3 text-white">
                    <ResizablePanel className='scroll h-fit p-4 mb-4 rounded-lg bg-[#121212]'>
                        <Table>
                            <TableHeader>
                                <TableRow className='border-b hover:bg-transparent select-none border-white/20'>
                                    <TableHead className="w-[100px] text-center">numbers</TableHead>
                                    <TableHead className="w-[180px]">Номер машины</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Тип</TableHead>
                                    <TableHead>Номер</TableHead>
                                    <TableHead className="text-right">Имя</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='radius'>
                                {
                                    cars.map((i: any, idx: number) => (
                                        <TableRow key={idx} className='border-none cursor-pointer'>
                                            <TableCell className="font-medium text-center rounded-l-lg">{idx + 1}</TableCell>
                                            <TableCell className="font-medium">{i.autoNumber}</TableCell>
                                            <TableCell>{i.batteryPercent}</TableCell>
                                            <TableCell>{i.bonus}</TableCell>
                                            <TableCell>{i.phoneNumber}</TableCell>
                                            <TableCell className="text-right rounded-r-lg">{i.fullName}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className='h-full pb-8 px-5 mt-4 rounded-lg bg-[#121212]'>
                        <div className="h-full grid grid-cols-3 gap-5 mt-5">
                            <ul className="grid grid-cols-2 gap-2">
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7].map((i: number) => (
                                        <li key={i}>
                                            <label className={`radio-btn cursor-pointer ${errors.column && "animate-pulse"}`}>
                                                <input type="radio" {...register("column", { required: true })} name="column" value={i + 1} className="hidden-radio" />
                                                <span>{i + 1}</span>
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="grid grid-cols-1 gap-2">
                                <label className={`radio-btn cursor-pointer ${errors.volume && "animate-pulse"}`}>
                                    <input value={1} type="radio" {...register("volume", { required: true })} className={`hidden-radio ${errors.volume && "animate-pulse"}`} />
                                    <span>Такси</span>
                                </label>
                                <label className={`radio-btn cursor-pointer ${errors.volume && "animate-pulse"}`}>
                                    <input value={2} type="radio" {...register("volume", { required: true })} className={`hidden-radio ${errors.volume && "animate-pulse"}`} />
                                    <span>Грузовые</span>
                                </label>
                                <label className={`radio-btn cursor-pointer ${errors.volume && "animate-pulse"}`}>
                                    <input value={0} type="radio" {...register("volume", { required: true })} className={`hidden-radio ${errors.volume && "animate-pulse"}`} />
                                    <span>Обычная</span>
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2 h-[55%]">
                                    <Input
                                        type="number"
                                        {...register("price", { required: true })}
                                        className={`w-full h-full text-2xl px-5 bg-[#242424] text-white ${errors.price && "border-[red] outline-[red]"}`}
                                        placeholder="Kub"
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5 bg-[#242424] text-white"
                                        type="number"
                                        defaultValue={"10 000"}
                                        placeholder="Sum"
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5 bg-[#242424] text-white"
                                        type="number"
                                        placeholder="Sum"
                                    />
                                </div>
                                <div className="h-[45%] w-full">
                                    <div className="flex items-center justify-between mt-5">
                                        <p className="text-nowrap text-lg font-medium">Цена:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-white" />
                                        <p className="text-nowrap">100 000 Sum</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-nowrap text-lg font-medium">Количество:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-white" />
                                        <p>10 шт</p>
                                    </div>

                                    <Button type='submit' className="bg-green-700 hover:bg-green-600 text-lg h-11 mt-5">Submit</Button>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </form >
        </div >
    )
}

export default Form
