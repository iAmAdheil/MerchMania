import { betterAuth, BetterAuthOptions } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/app/generated/prisma';
import { inferAdditionalFields } from 'better-auth/client/plugins';
import { customSession } from 'better-auth/plugins';

const prisma = new PrismaClient();

const options = {
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
	],
} satisfies BetterAuthOptions;

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
			prompt: 'select_account',
			disableSignUp: true,
			clientId: process.env.AUTH_GOOGLE_ID as string,
			clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
			overrideUserInfoOnSignIn: false,
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
				id: user.id,
				email: user.email,
				name: user.name,
				image: user.image,
				role: user.role,
				isOnboarded: user.isOnboarded,
			};
		}, options),
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
