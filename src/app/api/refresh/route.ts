import { refreshCacheTag } from "@/utils/db";

export async function GET() {
  await refreshCacheTag();

  return Response.json(true);
}
