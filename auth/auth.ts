import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/app/generated/prisma';

const prisma = new PrismaClient();

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true,
	},
	accountLinking: {
		enabled: true,
		trustedProviders: ["google", "github"]
	},
	session: {
		disableSessionRefresh: true
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: true,
				defaultValue: "customer",
			},
			isOnboarded: {
				type: 'boolean',
				required: true,
				defaultValue: false,
			},
		},
	},
	// socialProviders: {
	// 	google: {
	// 		prompt: 'select_account',
	// 		disableSignUp: true,
	// 		clientId: process.env.AUTH_GOOGLE_ID as string,
	// 		clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
	// 		overrideUserInfoOnSignIn: false,
	// 	},
	// },
});
