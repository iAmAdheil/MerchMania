import { getSession } from "@/lib/auth";

import Form from './components/form';

async function Page() {
  const session = await getSession();
  return (
    <Form userId={session?.user?.id || ''} />
  );
};

export default Page;
