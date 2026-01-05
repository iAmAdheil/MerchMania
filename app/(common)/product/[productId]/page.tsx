import { Roles } from '@/types';
import { getSession } from '@/lib/auth';

import Main from './components/Main';

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

async function Page({ params }: Props) {
  const Aparams = await params;
  const session = await getSession();

  return (
    <Main
      productId={Aparams.productId}
      role={(session?.user?.role as Roles) || 'anonymous'}
      userId={session?.user?.id || ''}
    />
  );
};

export default Page;
