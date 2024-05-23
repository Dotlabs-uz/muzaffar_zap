// "use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios"
import { cookies } from "next/headers";
import { useEffect } from "react"
import moment from 'moment';

const page = async ({ params: { id } }: { params: { id: string } }) => {
    const token = cookies().get("userToken")?.value
    const car: any = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`, { headers: { Authorization: token } })
    console.log(car.data);

    return (
        <div className="w-full h-screen px-3 pt-5 text-white bg-black">
            <Table>
                <TableHeader>
                    <TableRow className='border-b hover:bg-transparent select-none border-white/20'>
                        <TableHead className="w-[180px]">Номер машины</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Сумма бонуса</TableHead>
                        <TableHead>Номер</TableHead>
                        <TableHead className="text-right">Имя</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='radius'>
                    <TableRow className='border-none cursor-pointer'>
                        <TableCell className="font-medium uppercase rounded-l-lg">{car.data.autoNumber}</TableCell>
                        <TableCell>{car.data.batteryPercent}</TableCell>
                        <TableCell>{car.data.bonus}</TableCell>
                        <TableCell>{car.data.phoneNumber}</TableCell>
                        <TableCell className="text-right rounded-r-lg">{car.data.fullName}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Table className="mt-10">
                <TableHeader>
                    <TableRow className='border-b hover:bg-transparent select-none border-white/20'>
                        <TableHead className="w-[180px]">Дату</TableHead>
                        <TableHead>Куб.Метров</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Размер бонуса %</TableHead>
                        <TableHead>Сумма бонуса</TableHead>
                        <TableHead>Общие бонуса</TableHead>
                        <TableHead className="text-right">Покупка за последние 5 дней</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='radius'>
                    {
                        car.data.history.map((el: any) => (
                            <TableRow key={el._id} className='border-none cursor-pointer'>
                                <TableCell className="font-medium rounded-l-lg">{moment(car.data.history.createdAt).format('DD.MM.YY')}</TableCell>
                                <TableCell>{el.volume}</TableCell>
                                <TableCell>5 000</TableCell>
                                <TableCell>{el.price}</TableCell>
                                <TableCell>{el.volume}</TableCell>
                                <TableCell>{el.volume}</TableCell>
                                <TableCell>{el.volume}</TableCell>
                                <TableCell className="text-right rounded-r-lg">{el.volume}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default page
