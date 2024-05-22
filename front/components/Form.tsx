"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Modal from '@/components/Modal';
import axios from 'axios';
import ReactInputMask from 'react-input-mask';

type Inputs = {
    autoNumber: string;
    column: string
    volume: string
    price: string
    isTaxi: string
};

const formSchema = z.object({
    volume: z.string(),
    price: z.string(),
    autoNumber: z.string().min(8).max(8),
    column: z.string(),
    isTaxi: z.string()
})

const Form = ({ token }: any) => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>();
    const [isPending, setIsPending] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [cars, setCars] = useState<any>([]);
    const [search, setSearch] = useState<string>("");
    const [bonus, setBonus] = useState(0);
    const [changeKub, setChangeKub] = useState(0);
    const [changePrice, setChangePrice] = useState(0);
    const [payWithBonus, setPayWithBonus] = useState(false);

    // const carNumberRegex = /\b(\d{1,2}[A-Z]\d{3}[A-Z]{2}|\d{5}[A-Z]{3})\b/g;

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         volume: "",
    //         price: "",
    //         autoNumber: "",
    //         column: "",
    //         isTaxi: ""
    //     },
    // })

    function onSubmit(data: z.infer<typeof formSchema>) {
        setIsPending(true)
        const sendData = {
            ...data,
            volume: Number(data.volume),
            column: Number(data.column),
            price: changePrice,
            isTaxi: data.isTaxi === "1",
            useBonus: payWithBonus
        }

        axios.post("http://localhost:3030/purchases", sendData, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setSearch("")
                reset()
                reset({
                    autoNumber: ""
                })
                setChangeKub(0)
                setChangePrice(0)
                setBonus(0)
                setIsPending(false)
            }
        })
    };

    useEffect(() => {
        axios.get("http://localhost:3030/cars",
            {
                headers: {
                    Authorization: token
                },
                params: {
                    autoNumber: {
                        $regex: search,
                        $options: 'i'
                    }
                }
            }
        ).then((res) => {
            if (res.status === 200 || res.status === 201) {
                setCars(res.data.data);
                console.log(res);
            }
        })
    }, [search])

    function changeKubFn(v: number) {
        setChangeKub(v)
        setChangePrice((v * 5000))
    }

    return (
        <div className="px-3 h-screen pt-3 pb-5 w-full flex flex-col bg-black">
            {
                openModal && (
                    <Modal setOpenModal={setOpenModal} token={token} />
                )
            }
            <form className='flex flex-col h-full' onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex items-center justify-center gap-5 pt-9 pb-5 rounded-lg bg-[#121212]">
                    <Input
                        autoComplete='off'
                        maxLength={8}
                        disabled={isPending}
                        onKeyUp={(e: any) => setSearch(e.target.value)}
                        className={`max-w-3xl py-5 text-xl bg-[#242424] text-white ${errors.autoNumber && "border border-[red] outline-[red]"}`}
                        {...register("autoNumber", { required: true })}
                    />
                    {
                        !cars[0] ?
                            <Button
                                onClick={() => setOpenModal(true)}
                                type='button'
                                className="bg-green-700 hover:bg-green-600 text-2xl h-11"
                            >+</Button>
                            :
                            null
                    }
                </div>
                <ResizablePanelGroup direction="vertical" className="mt-3 text-white">
                    <ResizablePanel className='scroll h-fit p-4 mb-4 rounded-lg bg-[#121212]'>
                        <Table>
                            <TableHeader>
                                <TableRow className='border-b hover:bg-transparent select-none border-white/20'>
                                    <TableHead className="w-[100px] text-center">numbers</TableHead>
                                    <TableHead className="w-[180px]">Номер машины</TableHead>
                                    <TableHead>Status</TableHead>
                                    {/* <TableHead>Bonus</TableHead> */}
                                    <TableHead>Сумма бонуса</TableHead>
                                    <TableHead>Номер</TableHead>
                                    <TableHead className="text-right">Имя</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='radius'>
                                {
                                    cars.map((i: any, idx: number) => (
                                        <TableRow key={idx} onClick={() => { reset({ autoNumber: i.autoNumber }), setBonus(i.boughtInWeek) }} className='border-none cursor-pointer'>
                                            <TableCell className="font-medium text-center rounded-l-lg">{idx + 1}</TableCell>
                                            <TableCell className="font-medium">{i.autoNumber}</TableCell>
                                            <TableCell>{i.batteryPercent}</TableCell>
                                            <TableCell>{i.bonus}</TableCell>
                                            {/* <TableCell>{i.boughtInWeek}</TableCell> */}
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
                                                <input disabled={isPending} type="radio" {...register("column", { required: true })} name="column" value={i + 1} className="hidden-radio" />
                                                <span>{i + 1}</span>
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="grid grid-cols-1 gap-2">
                                <label className={`radio-btn cursor-pointer ${errors.isTaxi && "animate-pulse"}`}>
                                    <input disabled={isPending} value={"1"} type="radio" {...register("isTaxi", { required: true })} className={`hidden-radio ${errors.isTaxi && "animate-pulse"}`} />
                                    <span>Такси</span>
                                </label>
                                <label className={`radio-btn cursor-pointer ${errors.volume && "animate-pulse"}`}>
                                    <input disabled={isPending} value={"1"} type="radio" {...register("isTaxi", { required: true })} className={`hidden-radio ${errors.isTaxi && "animate-pulse"}`} />
                                    <span>Грузовые</span>
                                </label>
                                <label className={`radio-btn cursor-pointer ${errors.volume && "animate-pulse"}`}>
                                    <input disabled={isPending} value={"0"} type="radio" {...register("isTaxi", { required: true })} className={`hidden-radio ${errors.isTaxi && "animate-pulse"}`} />
                                    <span>Обычная</span>
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2 h-[55%]">
                                    <Input
                                        type="number"
                                        onKeyUpCapture={(e: any) => changeKubFn(+e.target.value)}
                                        {...register("volume", { required: true })}
                                        className={`w-full h-full text-2xl px-5 bg-[#242424] text-white ${errors.price && "border-[red] outline-[red]"}`}
                                        placeholder="Kub"
                                        disabled={isPending}
                                        defaultValue={changeKub}
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5 bg-[#242424] text-white"
                                        type="text"
                                        // onKeyUpCapture={(e: any) => changePriceFn(+e.target.value)}
                                        defaultValue={"5 000"}
                                        placeholder="Sum"
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5 bg-[#242424] text-white"
                                        type="number"
                                        disabled={isPending}
                                        // onKeyUpCapture={(e: any) => changePriceFn(+e.target.value)}
                                        {...register("price", { required: true })}
                                        placeholder="Sum"
                                        value={changePrice}
                                    />
                                </div>
                                <div className="h-fit w-full flex gap-3 items-center justify-between mt-5">
                                    {/* <div className="flex items-center justify-between mt-5">
                                        <p className="text-nowrap text-lg font-medium">Цена:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-white" />
                                        <p className="text-nowrap">100 000 Sum</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-nowrap text-lg font-medium">Количество:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-white" />
                                        <p>10 шт</p>
                                    </div> */}

                                    <Button disabled={isPending} onClick={() => setPayWithBonus(false)} type='submit' className="bg-green-700 hover:bg-green-600 w-full text-lg h-11">{changePrice.toLocaleString()}</Button>
                                    <Button disabled={isPending || bonus == 0} onClick={() => setPayWithBonus(true)} type='submit' className="bg-green-700 hover:bg-green-600 w-full text-lg h-11">{changeKub ? bonus > changePrice ? changePrice : changePrice - bonus : "0"}</Button>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </form>
        </div>
    )
}

export default Form
