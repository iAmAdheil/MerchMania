import { redirect } from 'next/navigation';
import { headers } from "next/headers";

import { auth } from "@/auth/auth";

import Main from './components/Main';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/');
  }

  return (
    <Main />
  );
}

export default Page;