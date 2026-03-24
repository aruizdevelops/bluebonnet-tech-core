/**
 * Sanitizes a string to prevent XSS when used in DOM contexts.
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validates that a URL is safe (http/https only, no javascript: protocol).
 */
export function isSafeUrl(url) {
  if (typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Validates tenant ID format — alphanumeric and hyphens only.
 */
export function isValidTenantId(id) {
  if (typeof id !== 'string') return false;
  return /^[a-z0-9-]{2,50}$/.test(id);
}
