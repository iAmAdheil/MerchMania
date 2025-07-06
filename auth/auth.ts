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
			return {
				id: user.id,
				email: user.email,
				name: user.name,
				image: user.image,
				role: user.role,
				isOnboarded: user.isOnboarded,
			};
		}, options),
		{
			id: 'custom-user-fields',
			hooks: {
				before: [
					{
						matcher: () => true,
						handler: async ctx => {
							// Parse the state parameter to extract the role
							console.log('Custom user fields handler called');
							console.log(ctx);
							// let role = 'user'; // Default role
							// if (ctx.state) {
							// 	try {
							// 		const state = JSON.parse(ctx.state);
							// 		role = state.role || role; // Use role from state if available
							// 	} catch (e) {
							// 		console.error('Failed to parse state:', e);
							// 	}
							// }

							// return {
							// 	...(ctx.user ?? {}),
							// 	role, // Set dynamic role
							// 	createdAt: new Date().toISOString(),
							// 	customId: `custom_${Math.random().toString(36).substring(2)}`,
							// };
						},
					},
				],
				after: [
					{
						matcher: () => true,
						handler: async ctx => {
							// Parse the state parameter to extract the role
							console.log('Custom user fields handler called');
							// let role = 'user'; // Default role
							// if (ctx.state) {
							// 	try {
							// 		const state = JSON.parse(ctx.state);
							// 		role = state.role || role; // Use role from state if available
							// 	} catch (e) {
							// 		console.error('Failed to parse state:', e);
							// 	}
							// }

							// return {
							// 	...(ctx.user ?? {}),
							// 	role, // Set dynamic role
							// 	createdAt: new Date().toISOString(),
							// 	customId: `custom_${Math.random().toString(36).substring(2)}`,
							// };
						},
					},
				],
			},
		},
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
