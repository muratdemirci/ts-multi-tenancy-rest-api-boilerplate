import { z } from 'zod';

export default {
  register: z.object({
    body: z.object({
      email: z.string().email().nonempty('Email is required'),
      password: z
        .string()
        .min(8, 'Password must be at least 6 characters')
        .max(30, 'Password must be at most 30 characters'),
      firstName: z
        .string()
        .min(3, 'First name must be at least 3 characters')
        .max(30, 'First name must be at most 30 characters'),
      lastName: z
        .string()
        .min(3, 'Last name must be at least 3 characters')
        .max(30, 'Last name must be at most 30 characters'),
      phone: z
        .string()
        .min(10, 'Phone number must be at least 10 characters')
        .max(15, 'Phone number must be at most 15 characters'),
      address: z
        .string()
        .min(3, 'Address must be at least 3 characters')
        .max(100, 'Address must be at most 100 characters'),
      timezone: z
        .string()
        .min(3, 'Timezone must be at least 3 characters')
        .max(100, 'Timezone must be at most 100 characters'),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  login: z.object({
    body: z.object({
      email: z.string().email().min(10, 'Email is required'),
      password: z.string().min(8, 'Password is required'),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  list: z.object({
    body: z.object({}),
    query: z.object({
      _start: z.string().optional(),
      _end: z.string().optional(),
      keyword: z.string().optional(),
    }),
    params: z.object({}),
  }),
  retrieveTenantsByUserId: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  gerUserRoles: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  remove: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  getProfile: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  updateProfile: z.object({
    body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      timezone: z.string().optional(),
    }),
    query: z.object({}),
    params: z.object({
      id: z.string().min(1, 'ID is required'),
    }),
  }),
};
