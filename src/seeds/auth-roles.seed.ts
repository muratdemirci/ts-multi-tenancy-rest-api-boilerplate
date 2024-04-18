import constants from '../constants';

export const authRolesSeed = [
  {
    id: 'b0c4561f-ff79-46aa-9961-b387074497f6',
    name: constants.ROLES.USER,
    slug: 'user',
    description: 'Standard user',
  },
  {
    id: 'e7fb7960-ad6d-42d4-b8a3-2ba71c2d339f',
    name: constants.ROLES.TENANTUSER,
    slug: 'tenant-user',
    description: 'Tenant user',
  },
  {
    id: 'ec0aede1-60bc-407c-8a8b-13fcea83cb13',
    name: constants.ROLES.TENANTADMIN,
    slug: 'tenant-admin',
    description: 'Tenant admin',
  },
  {
    id: '317c7358-4624-47be-a9c5-0ca2358a561f',
    name: constants.ROLES.SUPERADMIN,
    slug: 'super-admin',
    description: 'Admin with full permissions',
  },
];
