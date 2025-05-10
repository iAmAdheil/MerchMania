import Navbar from '@/components/app/navbar/main';
import CustomerSigninCard from '@/components/app/pages/signin/customerSignin';

export default function SignIn() {
    return (
        <div>
            <div className="flex flex-col items-center w-full">
                <CustomerSigninCard />
            </div>
        </div>
    );
}
