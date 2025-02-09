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
  localized_alt_text: string;
  slider_image: StrapiImage;
}

export interface HomePageData {
  id: number;
  locale: string;
  header_section: { title: string; description: string };
  hero_section: {
    hero_image: StrapiImage;
    hero_tagline: string;
  };
  contacts_section: {
    id: number;
    title: string;
    description: string;
    phone_numbers: Array<{
      id: number;
      phone_number: string;
    }>;
  };
  slider_section: {
    id: number;
    title: string;
    slider_images: SliderImage[];
  };
  features_section: {
    id: number;
    title: string;
    features_list: Array<{
      id: number;
      feature_text: string;
      feature_icon: StrapiImage;
      svg_base64: string;
    }>;
  };
  transportable_items_section: {
    id: number;
    title: string;
    transportable_items_list: Array<{
      id: number;
      transportable_item_title: string;
      transportable_item_media: string;
    }>;
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
