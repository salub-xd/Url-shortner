import { prisma } from "@/lib/prisma";

interface GraphData {
  id: string;
  urlId: string;
  userId: string | null;
  country: string | null;
  city: string | null;
  postalcode: string | null;
  device: string | null;
  browser: string | null;
  referer: string | null;
  clickAt: Date | null;
}

export const getGraphClicks = async (userId: string): Promise<GraphData[]> => {
  const clicks = await prisma.click.findMany({
    where: {
      userId: userId
    },
  });

  return clicks;
}