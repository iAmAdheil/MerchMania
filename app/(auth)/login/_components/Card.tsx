'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HStack, Separator, Stack, Text, Button, Field, Input } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from '@/auth/auth-client';

import { PasswordInput } from '@/components/ui/Password-Input';

export default function Card() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignin = async () => {
    await signIn.email(
      {
        email,
        password,
        callbackURL: '/',
        rememberMe: true,
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
          console.log(ctx);
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleGoogleSignin = async () => {
    try {
      const { data, error } = await signIn.social({
        provider: 'google',
        errorCallbackURL: '/signin',
        callbackURL: '/',
        requestSignUp: false,
      });
      console.log(data);
      console.log(error);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="px-6 w-full flex items-center justify-center py-16">
      <div className="w-full max-w-[30rem] px-6 md:px-8 py-8 flex flex-col gap-6 border border-solid border-gray-200 shadow-md rounded-md">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-3xl font-roboto font-bold">Login</h1>
            <h2 className="text-sm md:text-base text-gray-600 font-roboto font-light">
              Enter your email and password to access your account
            </h2>
          </div>
          <Button
            // onClick={async () => await handleGoogleSignin()}
            colorPalette="teal"
            variant="solid"
            className="py-2 flex flex-row items-center gap-4 border border-solid border-gray-300 hover:bg-slate-100"
          >
            <FcGoogle className="w-5 h-5 md:w-6 md:h-6" />
            <p className="text-sm md:text-base font-roboto font-semibold">Continue With Google</p>
          </Button>
        </div>
        <HStack>
          <Separator flex="1" className="border-[0.1px] border-solid border-gray-200 flex-1" />
          <Text flexShrink="0" className="font-roboto font-light text-[10px] text-gray-500">
            OR
          </Text>
          <Separator flex="1" className="border-[0.1px] border-solid border-gray-200 flex-1" />
        </HStack>
        <div className="flex flex-col gap-4">
          <Field.Root required className="flex flex-col gap-2">
            <Field.Label className="text-xs md:text-sm font-roboto">
              Email <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              name="email"
              onChange={handleEmailChange}
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
                  onChange={handlePasswordChange}
                  className="pl-3 text-sm sm:text-base border border-solid border-gray-200 rounded-sm"
                />
              </div>
            </Stack>
          </Field.Root>
        </div>
        <div className="mt-2 w-full flex flex-col gap-3 md:gap-4">
          <button
            className="py-2 w-full text-sm md:text-base font-roboto font-semibold text-white bg-purple-600 rounded-sm hover:opacity-80"
            onClick={handleSignin}
          >
            Proceed
          </button>
          <p className="text-center text-xs md:text-sm text-gray-600 font-roboto">
            Don&apos;t have an account?{' '}
            <Link href="/signup">
              <span className="text-sm md:text-base font-semibold text-purple-600 decoration-purple-600 cursor-pointer hover:underline">
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
