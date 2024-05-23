import { cookies } from 'next/headers';
import Form from '@/components/Form';

const Page = () => {    
    const token = cookies().get("zapAdminToken")?.value
    const role = cookies().get("zapAdminRole")?.value
    const operatorName = cookies().get("zapOperatorName")

    return (
        <>
            <Form token={token} role={role} operatorName={operatorName} />
        </>
    );
}

export default Page