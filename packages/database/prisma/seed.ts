import { PrismaClient, PlanTier, Role, DocumentStatus } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// Simple standard SHA-256 / PBKDF2 hash for deterministic seed passwords
function hashPassword(password: string): string {
  const salt = 'documind_static_seed_salt';
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Tenants
  const acmeTenant = await prisma.tenant.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corporation',
      slug: 'acme-corp',
      plan: PlanTier.ENTERPRISE,
    },
  });

  const startupTenant = await prisma.tenant.upsert({
    where: { slug: 'startup-lab' },
    update: {},
    create: {
      name: 'Startup Lab',
      slug: 'startup-lab',
      plan: PlanTier.STARTER,
    },
  });

  console.log(`✅ Seeded Tenants: ${acmeTenant.name}, ${startupTenant.name}`);

  // 2. Seed Users & Memberships
  const defaultPassword = hashPassword('Password123!');

  const usersData = [
    {
      email: 'owner@acme.com',
      name: 'Alice Owner',
      tenantId: acmeTenant.id,
      role: Role.OWNER,
    },
    {
      email: 'admin@acme.com',
      name: 'Bob Admin',
      tenantId: acmeTenant.id,
      role: Role.ADMIN,
    },
    {
      email: 'member@acme.com',
      name: 'Charlie Member',
      tenantId: acmeTenant.id,
      role: Role.MEMBER,
    },
    {
      email: 'user@startuplab.com',
      name: 'David Startup',
      tenantId: startupTenant.id,
      role: Role.OWNER,
    },
  ];

  for (const u of usersData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name },
      create: {
        email: u.email,
        name: u.name,
        passwordHash: defaultPassword,
      },
    });

    await prisma.membership.upsert({
      where: {
        userId_tenantId: {
          userId: user.id,
          tenantId: u.tenantId,
        },
      },
      update: { role: u.role },
      create: {
        userId: user.id,
        tenantId: u.tenantId,
        role: u.role,
      },
    });

    console.log(`✅ Seeded User: ${u.email} (${u.role})`);
  }

  // 3. Seed Sample Document for Acme Corp
  const sampleDoc = await prisma.document.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      tenantId: acmeTenant.id,
      title: 'Acme Enterprise Operations Handbook.pdf',
      fileKey: 'tenants/acme-corp/docs/handbook.pdf',
      fileSize: 1048576,
      mimeType: 'application/pdf',
      status: DocumentStatus.READY,
    },
  });

  // Seed sample chunk
  const sampleChunk = await prisma.documentChunk.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      documentId: sampleDoc.id,
      tenantId: acmeTenant.id,
      content:
        'Acme Corporation enforces strict multi-tenant isolation policies. All customer data and vector indices are cryptographically separated by tenant_id boundaries.',
      pageNumber: 1,
    },
  });

  console.log(`✅ Seeded Sample Document: ${sampleDoc.title} with chunk id ${sampleChunk.id}`);
  console.log('🎉 Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
