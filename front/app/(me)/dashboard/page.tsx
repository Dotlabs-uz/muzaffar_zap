"use client"
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
import { useState } from 'react';

const Page = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [openModal, setOpenModal] = useState(false);

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <main className="px-5 h-screen pt-10 pb-5 w-full flex flex-col">
            {
                openModal && (
                    <Modal setOpenModal={setOpenModal} />
                )
            }
            <form className='flex flex-col h-full' onSubmit={handleSubmit(onSubmit)}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel>
                        <div className="w-full flex items-center justify-center gap-5 py-5 border-b">
                            <Input
                                type="text"
                                autoComplete='off'
                                className={`max-w-3xl py-5 ${errors.numberCar && "border border-[red] outline-[red]"}`}
                                {...register("numberCar", { pattern: /\d{2}\s?(?:[A-Za-z]\s\d{3}|\d{3})\s?[A-Za-z]{2,3}/g, required: true })}
                            />
                            <Button onClick={() => setOpenModal(true)} type='button' className="bg-green-700 hover:bg-green-600 text-2xl h-11">+</Button>
                        </div>
                        <div className="mt-5 max-h-[260px] overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px] text-center">numbers</TableHead>
                                        <TableHead className="w-[100px]">Invoice</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        [0, 1, 2, 3, 4, 5, 6, 7].map((i: number) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-center">{i + 1}</TableCell>
                                                <TableCell className="font-medium">INV001</TableCell>
                                                <TableCell>Paid</TableCell>
                                                <TableCell>Credit Card</TableCell>
                                                <TableCell className="text-right">$250.00</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel className='h-full pb-5'>
                        <div className="h-full grid grid-cols-3 gap-5 mt-5">
                            <ul className="grid grid-cols-2 gap-2">
                                {
                                    [0, 1, 2, 3, 4, 5, 6, 7].map((i: number) => (
                                        <li key={i}>
                                            <label className={`radio-btn ${errors.column && "animate-pulse"}`}>
                                                <input type="radio" {...register("column", { required: true })} name="column" value={i + 1} className="hidden-radio" />
                                                <span>{i + 1}</span>
                                            </label>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="grid grid-cols-1 gap-2">
                                <label className={`radio-btn ${errors.type && "animate-pulse"}`}>
                                    <input value={"Такси"} type="radio" {...register("type", { required: true })} name="type" className={`hidden-radio ${errors.type && "animate-pulse"}`} />
                                    <span>Такси</span>
                                </label>
                                <label className={`radio-btn ${errors.type && "animate-pulse"}`}>
                                    <input value={"Грузовые"} type="radio" {...register("type", { required: true })} name="type" className={`hidden-radio ${errors.type && "animate-pulse"}`} />
                                    <span>Грузовые</span>
                                </label>
                                <label className={`radio-btn ${errors.type && "animate-pulse"}`}>
                                    <input value={"Продать"} type="radio" {...register("type", { required: true })} name="type" className={`hidden-radio ${errors.type && "animate-pulse"}`} />
                                    <span>Продать</span>
                                </label>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-col gap-2 h-[55%]">
                                    <Input
                                        type="number"
                                        {...register("kub", { required: true })}
                                        className={`w-full h-full text-2xl px-5 ${errors.kub && "border-[red] outline-[red]"}`}
                                        placeholder="Kub"
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5"
                                        type="number"
                                        defaultValue={"10 000"}
                                        placeholder="Sum"
                                    />

                                    <Input
                                        className="w-full h-full text-2xl px-5"
                                        type="number"
                                        placeholder="Sum"
                                    />
                                </div>
                                <div className="h-[45%] w-full">
                                    <div className="flex items-center justify-between mt-5">
                                        <p className="text-nowrap text-lg font-medium">Цена:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-black" />
                                        <p className="text-nowrap">100 000 Sum</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-nowrap text-lg font-medium">Количество:</p>
                                        <hr className="w-[55%] border-dashed border-1 border-black" />
                                        <p>10 шт</p>
                                    </div>

                                    <Button type='submit' className="bg-green-700 hover:bg-green-600 text-lg h-11 mt-5">Submit</Button>
                                </div>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </form >
        </main >
    );
}

export default Page