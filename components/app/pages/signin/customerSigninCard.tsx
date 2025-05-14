import { HStack, Separator, Stack, Text, Button, Field, Input } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from '@/components/ui/password-input';
import { FcGoogle } from 'react-icons/fc';

export default function CustomerSigninCard() {
	return (
		<div className="w-[25rem] flex flex-col gap-3 border border-solid border-gray-500 px-10 py-6">
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-roboto font-bold">Customer Login</h1>
					<h2 className="text-xs font-roboto font-light text-gray-300">
						Enter your email and password to access your account
					</h2>
				</div>
				<Button
					colorPalette="teal"
					variant="solid"
					className="py-2 border border-solid border-gray-600 text-xs font-roboto font-semibold"
				>
					<FcGoogle /> Continue With Google
				</Button>
			</div>
			<HStack>
				<Separator
					flex="1"
					className="border-[0.1px] border-solid border-gray-500 flex-1"
				/>
				<Text flexShrink="0" className="font-roboto font-light text-[10px] text-gray-500">
					OR
				</Text>
				<Separator
					flex="1"
					className="border-[0.1px] border-solid border-gray-500 flex-1"
				/>
			</HStack>
			<div className="flex flex-col gap-4">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Email <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						placeholder="you@example.com"
						className="border border-solid border-gray-500 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<Field.Root required className="flex flex-col gap-2 w-full">
					<Field.Label className="flex flex-row justify-between w-full">
						<div className="text-xs font-roboto">
							Password <Field.RequiredIndicator color={'purple.500'} />
						</div>
						<a href="" className="hover:underline">
							<p className="font-light text-xs">Forgot Password</p>
						</a>
					</Field.Label>
					<Stack className="w-full">
						<div className="flex flex-col gap-4">
							<PasswordInput className="border border-solid border-gray-500 text-xs font-light rounded-sm px-3 py-1" />
							<PasswordStrengthMeter value={2} />
						</div>
					</Stack>
				</Field.Root>
				<Button className="text-xs font-semibold text-white bg-purple-600">Sign In</Button>
				<p className="flex flex-row justify-center items-end gap-1 text-xs font-roboto text-gray-300">
					Don't have an account?{' '}
					<a href="" className="text-sm hover:underline">
						<span className="font-semibold text-purple-400">Sign up</span>
					</a>
				</p>
			</div>
		</div>
	);
}
