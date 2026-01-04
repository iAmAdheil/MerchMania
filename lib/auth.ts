import { cache } from "react";
import { auth } from "@/auth/auth";
import { headers } from "next/headers";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  return session
})