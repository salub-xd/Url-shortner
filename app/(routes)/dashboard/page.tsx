import { getGraphClicks } from "@/actions/dashboard/get-graph-clicks";
import { getUrlsCount } from "@/actions/dashboard/get-url-count";
import { auth } from "@/auth";
import { Dashboard } from "@/components/dashboard/Dashboard";
export default async function DashboardPage() {

    const session = await auth();

    const getChartData = await getGraphClicks(session?.user.id);
    const getUrlData = await getUrlsCount(session?.user.id);
  
    return (
        <>
            <Dashboard chartData={getChartData} urlData={getUrlData}  />
        </>
    );
}