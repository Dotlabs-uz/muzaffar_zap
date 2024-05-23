import DashboardContainer from "@/components/containers/DashboardContainer";
import { Suspense } from "react";

const Page = async () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <DashboardContainer />
        </Suspense>
    );
};

export default Page;
