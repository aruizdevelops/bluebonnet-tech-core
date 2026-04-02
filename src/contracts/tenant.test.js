import { describe, it, expect } from 'vitest';
import { validateTenantManifest, BUSINESS_TYPES, REQUIRED_MANIFEST_FIELDS } from './tenant';

const validManifest = {
  id: 'test-tenant',
  name: 'Test Tenant',
  businessType: 'service',
  theme: { palette: {} },
};

describe('validateTenantManifest', () => {
  it('accepts a valid manifest', () => {
    const result = validateTenantManifest(validManifest);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('rejects null', () => {
    const result = validateTenantManifest(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('manifest must be an object');
  });

  it('rejects an array', () => {
    const result = validateTenantManifest([]);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('manifest must be an object');
  });

  it('rejects undefined', () => {
    const result = validateTenantManifest(undefined);
    expect(result.valid).toBe(false);
  });

  it('requires id', () => {
    const { id, ...rest } = validManifest;
    const result = validateTenantManifest(rest);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('id is required');
  });

  it('requires name', () => {
    const { name, ...rest } = validManifest;
    const result = validateTenantManifest(rest);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('name is required');
  });

  it('requires businessType', () => {
    const { businessType, ...rest } = validManifest;
    const result = validateTenantManifest(rest);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('businessType is required');
  });

  it('requires theme', () => {
    const { theme, ...rest } = validManifest;
    const result = validateTenantManifest(rest);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('theme is required');
  });

  it('rejects empty string id', () => {
    const result = validateTenantManifest({ ...validManifest, id: '' });
    expect(result.valid).toBe(false);
  });

  it('rejects empty string name', () => {
    const result = validateTenantManifest({ ...validManifest, name: '' });
    expect(result.valid).toBe(false);
  });

  it('rejects invalid businessType', () => {
    const result = validateTenantManifest({ ...validManifest, businessType: 'invalid' });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/businessType must be one of/);
  });

  it('accepts all valid business types', () => {
    for (const type of Object.values(BUSINESS_TYPES)) {
      const result = validateTenantManifest({ ...validManifest, businessType: type });
      expect(result.valid).toBe(true);
    }
  });

  it('rejects theme as array', () => {
    const result = validateTenantManifest({ ...validManifest, theme: [] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('theme must be an object');
  });

  it('rejects theme as null', () => {
    const result = validateTenantManifest({ ...validManifest, theme: null });
    expect(result.valid).toBe(false);
  });

  it('validates features when present', () => {
    const result = validateTenantManifest({ ...validManifest, features: 'invalid' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('features must be an object');
  });

  it('accepts valid features object', () => {
    const result = validateTenantManifest({ ...validManifest, features: { hasBooking: true } });
    expect(result.valid).toBe(true);
  });

  it('validates contact when present', () => {
    const result = validateTenantManifest({ ...validManifest, contact: 'string' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('contact must be an object');
  });

  it('accepts valid contact object', () => {
    const result = validateTenantManifest({ ...validManifest, contact: { email: 'a@b.com' } });
    expect(result.valid).toBe(true);
  });

  it('collects multiple missing field errors', () => {
    const result = validateTenantManifest({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(REQUIRED_MANIFEST_FIELDS.length);
  });
});

describe('BUSINESS_TYPES', () => {
  it('has expected types', () => {
    expect(BUSINESS_TYPES.SERVICE).toBe('service');
    expect(BUSINESS_TYPES.RETAIL).toBe('retail');
    expect(BUSINESS_TYPES.FOOD).toBe('food');
    expect(BUSINESS_TYPES.CONSULTING).toBe('consulting');
  });
});
