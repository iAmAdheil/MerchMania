import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/auth/auth";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) {
    redirect('/');
  }

  return (
    <>{children}</>
  );
}

export default Layout;