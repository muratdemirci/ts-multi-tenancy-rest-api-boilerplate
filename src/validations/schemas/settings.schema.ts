import { z } from 'zod';

export default {
  tenantSettingcreate: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      fields: z
        .array(
          z.object({
            name: z.string(),
            isRequired: z.boolean(),
            value: z.string(),
          }),
        )
        .nonempty('Fields is required'),
      tenantId: z.string().min(1, 'Tenant ID is required'),
    }),
    query: z.object({}),
    params: z.object({}),
  }),
  tenantSettinglist: z.object({
    body: z.object({}),
    query: z.object({
      _start: z.string().optional(),
      _end: z.string().optional(),
      keyword: z.string().optional(),
    }),
    params: z.object({}),
  }),
  tenantSettingGetById: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  tenantSettingUpdate: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      fields: z
        .array(
          z.object({
            name: z.string(),
            isRequired: z.boolean(),
            value: z.string(),
          }),
        )
        .nonempty('Fields is required'),
    }),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'Setting ID is required'),
    }),
  }),
  tenantSettingDelete: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'Setting ID is required'),
    }),
  }),

  getTenantSettingsById: z.object({
    body: z.object({}),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'ID is required'),
    }),
  }),
  updateTenantSettings: z.object({
    body: z.object({
      name: z.string().min(1, 'Name is required'),
      fields: z
        .array(
          z.object({
            name: z.string(),
            isRequired: z.boolean(),
            value: z.string(),
          }),
        )
        .nonempty('Fields is required'),
    }),
    query: z.object({}),
    params: z.object({
      id: z.string().min(10, 'Setting ID is required'),
    }),
  }),
};
