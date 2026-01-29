
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  phone: string;
  mapEmbedUrl: string;
}

export interface SiteConfig {
  siteTitle: string;
  tagline: string;
  seoDescription: string;
  accentColor: string;
  contactEmail: string;
  address: string;
}

export interface CMSData {
  config: SiteConfig;
  services: ServiceItem[];
  news: NewsPost[];
  process: ProcessStep[];
  contact: ContactInfo;
}
