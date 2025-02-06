export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
  formats: {
    thumbnail: { url: string };
    small: { url: string };
    medium: { url: string };
    large: { url: string };
  };
  caption: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  provider: string;
}

export interface SliderImage {
  id: number;
  attributes: {
    url: string;
    alternativeText: string;
  };
}

export interface HomePageData {
  documentId: string;
  locale: string;
  header_section: { title: string; description: string };
  hero_section: {
    hero_image: StrapiImage;
    hero_tagline: string;
  };
  tagline: string;
  features: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
  }>;
  transportableItems: Array<{
    id: number;
    image: StrapiImage;
    title: string;
    description: string;
  }>;
  contact: {
    title: string;
    description: string;
    phoneNumbers: string[];
  };
  sliderImages: {
    data: SliderImage[];
  };
}

export interface StrapiResponse<T> {
  data: {
    id: number;
  } & T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
