import axios from "axios";
import { cookies } from "next/headers";

export async function getData(path: string, body: any, withToken?: boolean) {
    try {

        if (withToken) {
            const token: any = cookies()?.get("zapAdminToken")?.value;

            if (!token) {
                return { token: false }
            }

            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + path, {
                method: "GET",
                data: body,
                headers: {
                    Authorization: token,
                },
            })
            
            return res;
        } else {

            const { data } = await axios(process.env.NEXT_PUBLIC_API_URL + path, {
                method: "GET"
            });

            return data;
        }


    } catch (e) {
        console.log("get error");

        return { e }
    }
}