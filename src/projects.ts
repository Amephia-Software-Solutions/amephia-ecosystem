export const PROJECT_IDS = [
  'gym',
  'facturacion',
  'facturon',
  'pos',
  'nutri',
  'ecommerce',
  'advisory',
  'migration',
  'broker-seguro',
  'contame',
  'shielddata',
  'education',
] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const isProjectId = (value: string): value is ProjectId =>
  PROJECT_IDS.includes(value as ProjectId);
