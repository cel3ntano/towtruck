import axios from 'axios';
import { type Locale } from '@/config/i18n';

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;

if (!strapiBaseUrl) {
  throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is not set');
}

interface StrapiQueryParams {
  locale?: Locale;
  populate?: string | string[] | Record<string, unknown>;
  sort?: string | string[];
  filters?: Record<string, unknown>;
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  fields?: string[];
  publicationState?: 'live' | 'preview';
}

export const strapiClient = axios.create({
  baseURL: `${strapiBaseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export async function fetchAPI<T>(
  endpoint: string,
  locale: Locale,
  params: Partial<StrapiQueryParams> = {}
): Promise<T> {
  try {
    const { data } = await strapiClient.get(endpoint, {
      params: {
        locale,
        populate: {
          header_section: true,
          hero_section: {
            populate: ['hero_image'],
          },
          contacts_section: {
            populate: ['phone_numbers'],
          },
        },
        ...params,
      },
    });
    return data as T;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}
