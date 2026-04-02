import { describe, it, expect } from 'vitest';
import { validateCheckoutConfig, CHECKOUT_STEPS, DEFAULT_CHECKOUT_STEPS } from './checkout';

describe('validateCheckoutConfig', () => {
  it('accepts a valid config', () => {
    const result = validateCheckoutConfig({
      checkoutSteps: [CHECKOUT_STEPS.CART, CHECKOUT_STEPS.PAYMENT, CHECKOUT_STEPS.CONFIRMATION],
      paymentMethods: ['card', 'cash'],
      currency: 'USD',
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts an empty config object', () => {
    const result = validateCheckoutConfig({});
    expect(result.valid).toBe(true);
  });

  it('rejects null', () => {
    const result = validateCheckoutConfig(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('config must be an object');
  });

  it('rejects an array', () => {
    const result = validateCheckoutConfig([]);
    expect(result.valid).toBe(false);
  });

  it('rejects empty checkoutSteps array', () => {
    const result = validateCheckoutConfig({ checkoutSteps: [] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('checkoutSteps must be a non-empty array');
  });

  it('rejects invalid step values', () => {
    const result = validateCheckoutConfig({ checkoutSteps: ['bogus'] });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/invalid checkout step/);
  });

  it('accepts all valid checkout steps', () => {
    const result = validateCheckoutConfig({
      checkoutSteps: Object.values(CHECKOUT_STEPS),
    });
    expect(result.valid).toBe(true);
  });

  it('rejects empty paymentMethods array', () => {
    const result = validateCheckoutConfig({ paymentMethods: [] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('paymentMethods must be a non-empty array');
  });

  it('rejects non-string payment methods', () => {
    const result = validateCheckoutConfig({ paymentMethods: [123] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('each paymentMethod must be a string');
  });

  it('rejects empty string currency', () => {
    const result = validateCheckoutConfig({ currency: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('currency must be a non-empty string');
  });

  it('rejects whitespace-only currency', () => {
    const result = validateCheckoutConfig({ currency: '   ' });
    expect(result.valid).toBe(false);
  });

  it('rejects non-string currency', () => {
    const result = validateCheckoutConfig({ currency: 123 });
    expect(result.valid).toBe(false);
  });

  it('collects multiple errors', () => {
    const result = validateCheckoutConfig({
      checkoutSteps: [],
      paymentMethods: [],
      currency: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBe(3);
  });
});

describe('DEFAULT_CHECKOUT_STEPS', () => {
  it('contains expected default steps in order', () => {
    expect(DEFAULT_CHECKOUT_STEPS).toEqual([
      CHECKOUT_STEPS.CART,
      CHECKOUT_STEPS.CUSTOMER_INFO,
      CHECKOUT_STEPS.PAYMENT,
      CHECKOUT_STEPS.CONFIRMATION,
    ]);
  });

  it('does not include shipping by default', () => {
    expect(DEFAULT_CHECKOUT_STEPS).not.toContain(CHECKOUT_STEPS.SHIPPING);
  });
});
