/**
 * Validates that required config fields are present.
 */
export function validateTenantConfig(config) {
  const errors = [];
  if (!config) {
    errors.push('Tenant config is required');
    return { valid: false, errors };
  }
  if (!config.id || typeof config.id !== 'string') {
    errors.push('Tenant config must include a valid "id"');
  }
  if (!config.name || typeof config.name !== 'string') {
    errors.push('Tenant config must include a valid "name"');
  }
  return { valid: errors.length === 0, errors };
}
