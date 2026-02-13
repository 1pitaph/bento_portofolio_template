import { getSiteData } from "@/lib/data";
import ClientLayout from "@/components/layouts/ClientLayout";

export default async function Home() {
  const siteData = await getSiteData();

  return <ClientLayout siteData={siteData} />;
}
