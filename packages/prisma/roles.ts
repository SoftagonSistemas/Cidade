import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function setupRoles() {
  console.log('Setting up roles...');

  try {
    // Step 1: Create the 'owner' role if it doesn't already exist
    const createRoleQuery = `
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 
              FROM pg_roles 
              WHERE rolname = 'owner'
          ) THEN
              CREATE ROLE owner;
          END IF;
      END
      $$;
    `;
    await prisma.$executeRawUnsafe(createRoleQuery);
    console.log("Role 'owner' created (if it didn't already exist).");

    // Step 2: Grant USAGE on schema public
    const grantSchemaUsageQuery = `
      GRANT USAGE ON SCHEMA public TO owner;
    `;
    await prisma.$executeRawUnsafe(grantSchemaUsageQuery);
    console.log("Granted USAGE on schema public to role 'owner'.");

    // Step 3: Grant SELECT, INSERT, and UPDATE permissions to all tables that don't start with '_'
    const grantPermissionsQuery = `
      DO $$
      DECLARE
          table_name text;
      BEGIN
          FOR table_name IN
              SELECT tablename
              FROM pg_tables
              WHERE schemaname = 'public'
                AND tablename NOT LIKE '\\_%' ESCAPE '\\'
          LOOP
              EXECUTE format('GRANT SELECT, INSERT, UPDATE ON TABLE public.%I TO owner;', table_name);
          END LOOP;
      END
      $$;
    `;
    await prisma.$executeRawUnsafe(grantPermissionsQuery);
    console.log("Permissions granted to role 'owner' for eligible tables.");
  } catch (error) {
    console.error('Error during role setup:', error);
  } finally {
    // Disconnect from Prisma
    await prisma.$disconnect();
    console.log('Prisma disconnected.');
  }
}

// Execute the setup
setupRoles().catch((err) => {
  console.error('Unexpected error:', err);
});
