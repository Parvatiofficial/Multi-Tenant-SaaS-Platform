export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
}

export interface UserPayload {
  userId: string;
  email: string;
  name?: string;
  activeTenantId?: string;
  role?: Role;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  tokens: AuthTokens;
  tenants: Array<{
    id: string;
    name: string;
    slug: string;
    role: Role;
  }>;
}
