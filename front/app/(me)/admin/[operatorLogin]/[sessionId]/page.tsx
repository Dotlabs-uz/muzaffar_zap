import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

const page = async ({ params: { operatorLogin }, searchParams: { createdAt, updatedAt } }: { params: { operatorLogin: string }, searchParams: { createdAt: string, updatedAt: string } }) => {
    const token = cookies().get("zapAdminToken")?.value
    const reports = await axios.get(`${process.env.NEXT_PRODUTION_API_URL}/reports`, {
        headers: { Authorization: token },
        params: {
            "operator.login": operatorLogin,
            createdAt: { $gte: createdAt, $lt: updatedAt }
        }
    })
    console.log(reports.data.data);

    return (
        <div className="h-screen bg-black overflow-auto px-3 py-5 text-white">
            <Table>
                <TableHeader>
                    <TableRow className='border-b hover:bg-transparent select-none border-black/20'>
                        <TableHead className="w-[100px] text-center"></TableHead>
                        <TableHead className="w-[180px]">Время</TableHead>
                        <TableHead>Колонка</TableHead>
                        <TableHead>Сумма продажи</TableHead>
                        <TableHead>Куб</TableHead>
                        <TableHead className="text-right">Время продажи</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='radius'>
                    <TableRow className='border-none cursor-pointer'>
                        <TableCell className="font-medium rounded-l-lg "></TableCell>
                        <TableCell className='flex items-center justify-start gap-2'>
                            {/* <p>{moment(i.createdAt).format('DD.MM.YY')}</p>
                            <p>{moment(i.createdAt).format('HH.MM')}</p> */}
                        </TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>
                            w
                        </TableCell>
                        <TableCell className="text-right rounded-r-lg">1</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default page
