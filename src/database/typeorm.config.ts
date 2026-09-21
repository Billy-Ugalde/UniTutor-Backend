import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function buildTypeOrmOptions(): TypeOrmModuleOptions {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL no está definida (cadena de conexión de Supabase)');
  }

  return {
    type: 'postgres',
    url,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
    ssl: { rejectUnauthorized: false },
  };
}
