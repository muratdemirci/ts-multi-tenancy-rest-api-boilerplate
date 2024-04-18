// Seeds
import { tenantSeed } from './tenant.seed';
import { userSeed } from './user.seed';

import { getTenantByName, getUserByEmail } from '../utilities/seed.utility';

export const tenantUsersSeed = [
  // assign user murat to tenant DSMR Ventures
  {
    users_id: getUserByEmail('murat@deusmur.com', userSeed)?.id,
    tenants_id: getTenantByName('DSMR Ventures', tenantSeed)?.id,
  },
  // assign user john to tenant acme
  {
    users_id: getUserByEmail('john@acme.com', userSeed)?.id,
    tenants_id: getTenantByName('Acme', tenantSeed)?.id,
  },

  // assign user jane to tenant intel
  {
    users_id: getUserByEmail('jane@intel.com', userSeed)?.id,
    tenants_id: getTenantByName('Intel', tenantSeed)?.id,
  },

  // assign user julia to tenant nike
  {
    users_id: getUserByEmail('julia@nike.com', userSeed)?.id,
    tenants_id: getTenantByName('Nike', tenantSeed)?.id,
  },
];
