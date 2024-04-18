export const getTenantByName = (name: string, tenantSeed: any[]) => tenantSeed.find((t) => t.name === name) || null;

export const getUserByEmail = (email: string, userSeed: any[]) => userSeed.find((u) => u.email === email) || null;
