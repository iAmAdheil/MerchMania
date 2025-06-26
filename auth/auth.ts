import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@/app/generated/prisma';
import { inferAdditionalFields } from 'better-auth/client/plugins';

const prisma = new PrismaClient();

export const auth = betterAuth({
	plugins: [
		inferAdditionalFields({
			user: {
				phone: {
					type: 'string',
					required: false,
				},
			},
		}),
	],
	database: prismaAdapter(prisma, {		
		provider: 'postgresql', // or "mysql", "postgresql", ...etc
	}),
	user: {
		additionalFields: {
			role: {
				type: 'string',
				required: true,
				default: 'CUSTOMER',
				input: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true,
	},
});
