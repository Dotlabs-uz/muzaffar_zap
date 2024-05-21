import { cookies } from 'next/headers';
import Form from '@/components/Form';

const Page = () => {
    const token = cookies().get("userToken")?.value

    return (
        <>
            <Form token={token} />
        </>
    );
}

export default Page