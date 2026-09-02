import type { INestApplication } from '@nestjs/common';

export const frontendOrigin =
  process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173';

export function enableFrontendCors(app: INestApplication): void {
  app.enableCors({ origin: frontendOrigin });
}
