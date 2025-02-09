import { type StrapiImage } from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || '';

if (!STRAPI_URL) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is not set');
}

/**
 * Validates and normalizes a URL string
 * @param url - The URL to validate
 * @returns Normalized URL string
 */
function validateUrl(url: string): string {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    throw new Error('URL cannot be empty');
  }
  return cleanUrl;
}

/**
 * Generates a full URL for Strapi resources
 * @param relativeUrl - The relative URL from Strapi
 * @returns Full URL string
 */
export function getResourceUrl(relativeUrl: string | null | undefined): string {
  if (!relativeUrl) {
    console.warn('Invalid resource URL provided');
    return '/fallback-image.jpg';
  }

  const cleanUrl = validateUrl(relativeUrl);

  // Return as is if it's already an absolute URL
  if (cleanUrl.startsWith('http')) {
    return cleanUrl;
  }

  // Normalize the base URL and relative path
  const baseUrl = STRAPI_URL.endsWith('/')
    ? STRAPI_URL.slice(0, -1)
    : STRAPI_URL;
  const relativePath = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;

  return `${baseUrl}${relativePath}`;
}

/**
 * Processes a Strapi image object and returns the appropriate URL
 * @param image - Strapi image object
 * @param options - Configuration options for image processing
 * @returns Processed image URL
 */
export function getStrapiImageUrl(
  image: StrapiImage | null | undefined,
  options: {
    fallback?: string;
    size?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original';
  } = {}
): string {
  const { fallback = '/fallback-image.jpg', size = 'original' } = options;

  if (!image?.url) {
    console.warn('Invalid Strapi image object provided');
    return fallback;
  }

  // If a specific size is requested and available, use it
  if (size !== 'original' && image.formats?.[size]?.url) {
    return getResourceUrl(image.formats[size].url);
  }

  return getResourceUrl(image.url);
}

/**
 * Processes and sanitizes SVG content from base64
 * @param svgBase64 - Base64 encoded SVG string
 * @param options - Configuration options for SVG processing
 * @returns Sanitized SVG string
 */
export function processSvgContent(
  svgBase64: string | null | undefined,
  options: {
    defaultFill?: string;
    defaultStroke?: string;
  } = {}
): string {
  const { defaultFill = 'none', defaultStroke = 'currentColor' } = options;

  if (!svgBase64) {
    console.warn('Invalid SVG base64 content provided');
    return '';
  }

  try {
    // Decode base64 and sanitize SVG
    const svgContent = atob(svgBase64.split(',')[1]);
    return svgContent
      .replace(/fill="[^"]*"/g, `fill="${defaultFill}"`)
      .replace(/stroke="[^"]*"/g, `stroke="${defaultStroke}"`);
  } catch (error) {
    console.error('Error processing SVG content:', error);
    return '';
  }
}

/**
 * Utility to handle different types of icon sources (SVG, image, etc.)
 * @param icon - Icon source object
 * @param altText - Alternative text for the icon
 * @returns URL or SVG content
 */
export function getIconSource(
  icon: { url?: string; svg_base64?: string } | null | undefined,
  altText: string
): { type: 'svg' | 'image' | 'none'; content: string; alt: string } {
  if (!icon) {
    return { type: 'none', content: '', alt: altText };
  }

  if (icon.svg_base64) {
    return {
      type: 'svg',
      content: processSvgContent(icon.svg_base64),
      alt: altText,
    };
  }

  if (icon.url) {
    return {
      type: 'image',
      content: getResourceUrl(icon.url),
      alt: altText,
    };
  }

  return { type: 'none', content: '', alt: altText };
}
