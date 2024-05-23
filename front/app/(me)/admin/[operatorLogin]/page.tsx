import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import axios from 'axios'
import moment from 'moment'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

const page = async ({ params: { operatorLogin } }: { params: { operatorLogin: string } }) => {
    const token = cookies().get("zapAdminToke")?.value

    const sessions = await axios.get(`${process.env.NEXT_PRODUTION_API_URL}/sessions?operator.login=${operatorLogin}`, { headers: { Authorization: token } })

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
                    {
                        sessions.data.data.map((i: any) => (
                            <TableRow className='border-none cursor-pointer'>
                                <TableCell className="font-medium rounded-l-lg "></TableCell>
                                <TableCell className='flex items-center justify-start gap-2'>
                                    <p>{moment(i.createdAt).format('DD.MM.YY')}</p>
                                    <p>{moment(i.createdAt).format('HH.MM')}</p>

                                </TableCell>
                                <TableCell>
                                    <p>{moment(i.updatedAt).format('DD.MM.YY')}</p>
                                    <p>{moment(i.updatedAt).format('HH.MM')}</p></TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    <Link href={{
                                        pathname: `/admin/${operatorLogin}/${i._id}`,
                                        query: { createdAt: i.createdAt, updatedAt: i.updatedAt }
                                    }}>Посмотреть</Link>
                                </TableCell>
                                <TableCell className="text-right rounded-r-lg">1</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div >
    )
}

export default page
