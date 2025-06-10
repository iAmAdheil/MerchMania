'use server'

import prisma from "@/lib/prisma"
import { signIn } from "@/auth"

type Response = {
	msg: string;
}

export const signupCreds = async () => {
	try {
		console.log('Hello World!')
		// throw new Error('Somehting went wrong!')
		await signIn('credentials', {
			email: 'adheilgupta@gmail.com',
			password: 'Ahana123'
		}, {
			redirectTo: '/signin'
		});
		const result: Response = {
			msg: 'Signin Page'
		}
		return result;
	} catch(e: any) {
		const result: Response = {
			msg: e.message || 'Somehting wetn wrong'
		}
		return result;
	}
}
