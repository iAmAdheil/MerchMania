import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/app/generated/prisma';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { customSession } from 'better-auth/plugins';

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
	socialProviders: {
		google: {
			clientId: process.env.AUTH_GOOGLE_ID as string,
			clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['google'],
		},
	},
	plugins: [
		inferAdditionalFields({
			user: {
				role: {
					type: 'string',
					required: true,
				},
				isOnboarded: {
					type: 'boolean',
					required: true,
				},
			},
		}),
		customSession(async ({ user, session }, ctx) => {
			// now both user and session will infer the fields added by plugins and your custom fields
			return {
				user,
				session,
			};
		}),
	],
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: true,
			},
			isOnboarded: {
				type: 'boolean',
				required: true,
			},
		},
	},
});
