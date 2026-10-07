import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';
import { UserStatus, Role } from '../../generated/prisma/enums';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "sqlite", ..etc
  }),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      status: {
        type: 'string',
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },

      role: {
        type: 'string',
        required: true,
        defaultValue: Role.PATIENT,
      },

      needPasswordChange: {
        type: 'boolean',
        required: true,
        defaultValue: false,
      },

      isDeleted: {
        type: 'boolean',
        required: true,
        defaultValue: false,
      },

      deletedAt: {
        type: 'date',
        required: false,
        defaultValue: null,
      },
    },
  },
});
