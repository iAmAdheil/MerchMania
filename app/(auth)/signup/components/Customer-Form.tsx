'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

import * as z from 'zod/v4';
import { authClient } from '@/auth/auth-client';
import { Stack, Field, Input } from '@chakra-ui/react';
import { Display } from '@/app/(auth)/signup/components/Main';

import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/Password-Input';
import Loader from '@/components/Loader';

type Details = {
  role: "customer";
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const DetailsParser = z.object({
  role: z.literal('customer'),
  username: z.string().min(4).max(30),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

export default function CustomerSignup({
  setDisplay,
}: {
  setDisplay: Dispatch<SetStateAction<Display>>;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<Details>({
    role: 'customer',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleBack = () => {
    setDisplay('options');
  };

  const handleCredSignup = async () => {
    try {
      setLoading(true);
      const details = {
        role: 'customer',
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
        confirmPassword: userDetails.confirmPassword,
      };
      const result = DetailsParser.safeParse(details);
      if (!result.success) {
        alert(result.error.message);
        return;
      }
      if (result.data.password !== result.data.confirmPassword) {
        alert('Password fields must match');
        return;
      }

      const { data, error } = await authClient.signUp.email(
        {
          role: details.role,
          isOnboarded: false,
          name: details.username,
          email: details.email,
          password: details.password,
          callbackURL: '/',
        },
        {
          onRequest: ctx => {
            console.log(ctx);
          },
          onSuccess: ctx => {
            console.log(ctx);
            router.replace('/');
          },
          onError: ctx => {
            alert(ctx.error.message);
          },
        }
      );
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[30rem] w-full px-6 py-8 bg-white flex flex-col items-center justify-center gap-6 rounded-md shadow-xl">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold">Customer Signup</h2>
        <p className="text-base text-gray-600 font-roboto">
          Start shopping unique creator merchandise
        </p>
      </div>
      <div className="w-full flex flex-col gap-5">
        <Field.Root required className="flex flex-col gap-1">
          <Field.Label className="text-sm font-roboto">
            Username <Field.RequiredIndicator color={'purple.500'} />
          </Field.Label>
          <Input
            name="username"
            onChange={handleInputChange}
            placeholder="John Doe"
            className="pl-3 text-sm sm:text-base border border-solid border-gray-200 rounded-sm"
          />
        </Field.Root>
        <Field.Root required className="flex flex-col gap-2">
          <Field.Label className="text-xs md:text-sm font-roboto">
            Email <Field.RequiredIndicator color={'purple.500'} />
          </Field.Label>
          <Input
            name="email"
            onChange={handleInputChange}
            placeholder="you@example.com"
            className="pl-3 text-sm sm:text-base border border-solid border-gray-200 rounded-sm"
          />
        </Field.Root>
        <Field.Root required className="flex flex-col gap-2 w-full">
          <Field.Label className="flex flex-row justify-between w-full">
            <div className="text-xs md:text-sm font-roboto">
              Password <Field.RequiredIndicator color={'purple.500'} />
            </div>
            <a href="" className="hover:text-purple-500 duration-200">
              <p className="font-light text-xs">Forgot Password</p>
            </a>
          </Field.Label>
          <Stack className="w-full">
            <div className="flex flex-col gap-4">
              <PasswordInput
                name="password"
                onChange={handleInputChange}
                className="pl-3 text-sm sm:text-base border border-solid border-gray-200 rounded-sm"
              />
              <PasswordStrengthMeter value={userDetails.password.length} />
            </div>
          </Stack>
        </Field.Root>
        <Field.Root required className="flex flex-col gap-2 w-full">
          <Field.Label className="flex flex-row justify-between w-full">
            <div className="text-xs md:text-sm font-roboto">
              Confirm Password <Field.RequiredIndicator color={'purple.500'} />
            </div>
          </Field.Label>
          <Stack className="w-full">
            <div className="flex flex-col gap-4">
              <PasswordInput
                name="confirmPassword"
                onChange={handleInputChange}
                className="pl-3 text-sm sm:text-base border border-solid border-gray-200 rounded-sm"
              />
            </div>
          </Stack>
        </Field.Root>
      </div>
      <div className="w-full flex flex-col gap-4 md:gap-6 md:mt-2">
        <div className="w-full flex flex-row justify-between items-center gap-4">
          <button
            onClick={handleBack}
            className="w-full py-2 rounded-md text-xs md:text-sm font-roboto font-semibold border border-solid border-gray-200 hover:bg-slate-100 duration-200"
          >
            Back
          </button>
          <button
            onClick={handleCredSignup}
            className="w-full py-2 rounded-md bg-purple-500 text-white text-xs md:text-sm font-roboto font-semibold border border-solid border-gray-200 hover:opacity-80 duration-200"
          >
            Create Account
          </button>
        </div>
        <p className="flex flex-row justify-center items-end gap-1 text-xs md:text-sm font-roboto text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-sm md:text-base decoration-purple-500 hover:underline">
            <span className="font-semibold text-purple-500">Sign in</span>
          </a>
        </p>
      </div>
    </div>
  );
}
