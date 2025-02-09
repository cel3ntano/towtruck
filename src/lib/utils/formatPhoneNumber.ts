/**
 * Formats a Ukrainian phone number from plain digits to a readable format
 * @param phoneNumber - Phone number string containing only digits
 * @returns Formatted phone number string like "+ 380 (11) 111-11-11"
 */

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length !== 12 || !cleaned.startsWith('380')) {
    return phoneNumber;
  }

  const countryCode = cleaned.slice(0, 3); // 380
  const areaCode = cleaned.slice(3, 5); // 11
  const firstPart = cleaned.slice(5, 8); // 222
  const secondPart = cleaned.slice(8, 10); // 33
  const lastPart = cleaned.slice(10); // 44

  return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${lastPart}`;
}
