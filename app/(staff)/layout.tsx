import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (session) {
    redirect('/');
  }

  return (
    <>{children}</>
  );
}

export default Layout;