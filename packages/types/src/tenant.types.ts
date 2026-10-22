import { Role } from './auth.types';

export enum PlanTier {
  FREE = 'FREE',
  STARTER = 'STARTER',
  ENTERPRISE = 'ENTERPRISE',
}

export interface TenantContext {
  id: string;
  name: string;
  slug: string;
  plan: PlanTier;
  role: Role;
}
