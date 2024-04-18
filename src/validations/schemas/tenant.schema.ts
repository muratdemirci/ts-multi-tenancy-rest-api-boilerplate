import { z } from 'zod';

export default {
  create: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      status: z.string().min(1, 'Status is required'),
      domains: z.array(z.string().min(1, 'Domain is required')),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  getById: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  update: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      status: z.string().min(1, 'Status is required'),
      domains: z.array(z.string().min(1, 'Domain is required')),
    }),
    query: z.object({}),
    params: z.object({
      id: z.string().min(1, 'ID is required'),
    }),
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
  remove: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(1, 'ID is required'),
    }),
  }),
  assignUsers: z.object({
    body: z.object({
      tenantId: z.string().min(1, 'Tenant ID is required'),
      userIds: z.array(z.string().min(1, 'User ID is required')),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  unassignUsers: z.object({
    body: z.object({
      tenantId: z.string().min(10, 'Tenant ID is required'),
      userIds: z.array(z.string().min(10, 'User ID is required')),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  retrieveUsers: z.object({
    body: z.object({}),
    query: z.object({
      _start: z.string().optional(),
      _end: z.string().optional(),
      keyword: z.string().optional(),
    }),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  userExists: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      tenantId: z.string().min(10, 'Tenant ID is required'),
      userId: z.string().min(10, 'User ID is required'),
    }),
  }),
};
