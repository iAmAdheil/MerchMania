import { getSession } from "@/lib/auth";
import { fetchCart } from "@/actions/fetch";

import Main from './components/Main';

async function Page() {
  const session = await getSession();
  const cart = await fetchCart(session?.user.id || '');

  return <Main items={cart} />
}

export default Page;