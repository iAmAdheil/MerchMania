import { getSession } from "@/lib/auth";

import Main from './_components/Main';

async function Page() {
  const session = await getSession();
  return (
    <Main userId={session?.user?.id || ''} />
  );
};

export default Page;
