import { describe, it, expect } from 'vitest';
import { validateBookingConfig, BOOKING_STEPS, DEFAULT_BOOKING_STEPS } from './booking';

describe('validateBookingConfig', () => {
  it('accepts a valid config', () => {
    const result = validateBookingConfig({
      bookingSteps: [BOOKING_STEPS.SERVICE_SELECT, BOOKING_STEPS.CONFIRMATION],
      depositAmount: 25,
      cancellationWindowHours: 24,
      maxAdvanceBookingDays: 30,
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('accepts an empty config object', () => {
    const result = validateBookingConfig({});
    expect(result.valid).toBe(true);
  });

  it('rejects null', () => {
    const result = validateBookingConfig(null);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('config must be an object');
  });

  it('rejects an array', () => {
    const result = validateBookingConfig([]);
    expect(result.valid).toBe(false);
  });

  it('rejects empty bookingSteps array', () => {
    const result = validateBookingConfig({ bookingSteps: [] });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('bookingSteps must be a non-empty array');
  });

  it('rejects invalid step values', () => {
    const result = validateBookingConfig({ bookingSteps: ['invalid_step'] });
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toMatch(/invalid booking step/);
  });

  it('accepts all valid booking steps', () => {
    const result = validateBookingConfig({
      bookingSteps: Object.values(BOOKING_STEPS),
    });
    expect(result.valid).toBe(true);
  });

  it('rejects zero depositAmount', () => {
    const result = validateBookingConfig({ depositAmount: 0 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('depositAmount must be a positive number');
  });

  it('rejects negative depositAmount', () => {
    const result = validateBookingConfig({ depositAmount: -10 });
    expect(result.valid).toBe(false);
  });

  it('rejects string depositAmount', () => {
    const result = validateBookingConfig({ depositAmount: '25' });
    expect(result.valid).toBe(false);
  });

  it('rejects negative cancellationWindowHours', () => {
    const result = validateBookingConfig({ cancellationWindowHours: -1 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('cancellationWindowHours must be a non-negative number');
  });

  it('accepts zero cancellationWindowHours', () => {
    const result = validateBookingConfig({ cancellationWindowHours: 0 });
    expect(result.valid).toBe(true);
  });

  it('rejects zero maxAdvanceBookingDays', () => {
    const result = validateBookingConfig({ maxAdvanceBookingDays: 0 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('maxAdvanceBookingDays must be a positive number');
  });

  it('rejects negative maxAdvanceBookingDays', () => {
    const result = validateBookingConfig({ maxAdvanceBookingDays: -5 });
    expect(result.valid).toBe(false);
  });

  it('collects multiple errors', () => {
    const result = validateBookingConfig({
      bookingSteps: [],
      depositAmount: -1,
      cancellationWindowHours: -1,
      maxAdvanceBookingDays: 0,
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });
});

describe('DEFAULT_BOOKING_STEPS', () => {
  it('contains expected default steps in order', () => {
    expect(DEFAULT_BOOKING_STEPS).toEqual([
      BOOKING_STEPS.SERVICE_SELECT,
      BOOKING_STEPS.DATE_TIME,
      BOOKING_STEPS.CUSTOMER_INFO,
      BOOKING_STEPS.CONFIRMATION,
    ]);
  });

  it('does not include staff_select by default', () => {
    expect(DEFAULT_BOOKING_STEPS).not.toContain(BOOKING_STEPS.STAFF_SELECT);
  });
});
