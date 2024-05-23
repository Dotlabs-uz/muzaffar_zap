import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import { parseJwt } from "@/lib/utils";
import { Button } from '@/components/ui/button'
import AddedOperator from '@/components/AddedOperator';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';

const page = async () => {
    const token = cookies().get("zapAdminToken")?.value
    const operators = await axios.get(`${process.env.NEXT_PRODUTION_API_URL}/operators`, { headers: { Authorization: token } })

    const role = cookies().get("zapAdminRole")?.value
    if (!token) redirect("/dashboard");
    if (role !== "admin") redirect("/dashboard");

    const jwt = parseJwt(token);

    if (jwt.exp < Date.now() / 1000) {
        redirect("/log-in");
    }

    return (
        <div className='bg-black text-white h-screen overflow-auto px-3 py-5'>
            <AddedOperator token={token} />

            <div className="mt-10 grid grid-cols-3 gap-3">
                {
                    operators.data.data.map((operator: any) => (
                        <Link href={`/admin/${operator.login}`} key={operator._id} className="bg-[#09090b] border border-[#27272a] rounded-xl px-6 py-4">
                            <p className='text-lg'>{operator.fullName}</p>
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                    <p className='text-base text-gray-500'>от {moment(operator.createdAt).format('MM.HH.DD')}</p>
                                    <p className='text-base text-gray-500'>{moment(operator.createdAt).format('MM.YY')}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className='text-base text-gray-500'>до {moment(operator.updatedAt).format('MM.HH.DD')}</p>
                                    <p className='text-base text-gray-500'>{moment(operator.updatedAt).format('MM.YY')}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default page
