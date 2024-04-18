import { z } from 'zod';

export default {
  isAuthenticated: z.object({
    body: z.object({
      accessToken: z
        .string({ required_error: 'accessToken is required' })
        .min(1, { message: 'You must enter a accessToken' }),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  assignRole: z.object({
    body: z.object({
      userId: z.string({ required_error: 'userId is required' }).min(1, { message: 'You must enter a userId' }),
      roleId: z.string({ required_error: 'roleId is required' }).min(1, { message: 'You must enter a roleId' }),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  unAssignRole: z.object({
    body: z.object({
      userId: z.string({ required_error: 'userId is required' }).min(1, { message: 'You must enter a userId' }),
      roleId: z.string({ required_error: 'roleId is required' }).min(1, { message: 'You must enter a roleId' }),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
};
