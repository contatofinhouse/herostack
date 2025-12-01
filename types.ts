
export enum PlanType {
  LANDING = 'LANDING',
  CMS = 'CMS',
  SAAS = 'SAAS',
  AUTOMATION = 'AUTOMATION'
}

export interface ServicePlan {
  id: PlanType;
  title: string;
  price: string;
  description: string;
  features: string[];
}

export interface FormData {
  selectedPlan: PlanType | null;
  brandColors: {
    primary: string;
    secondary: string;
  };
  typography: string;
  businessName: string;
  businessDescription: string;
  email: string;
  phone: string;
  industry: string;
  logoFile?: File[] | null;
  contentFile?: File | null;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}

// -- New Dynamic Structures --

export interface SiteSection {
  id: string;
  type: 'hero' | 'features' | 'about' | 'cta' | 'faq' | 'testimonials' | 'map' | 'contact-form' | 'gallery' | 'pricing' | 'stats' | 'comparison';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  // Generic list for features, pricing plans, stats, etc.
  items?: {
    title: string;
    desc?: string;
    price?: string;
    icon?: string;
    image?: string;
    highlight?: boolean;
    features?: string[]; // For pricing
  }[];
}

export interface SitePage {
  title: string;
  slug: string;
  sections: SiteSection[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  whatsapp?: string;
  instagram?: string;
  linkedin?: string;
}

export interface DraftConfig {
  colors: {
    primary: string;
    secondary: string;
  };
  typography: string;
  businessName: string;
  tagline: string;
  industry: string;
  logoUrl?: string;
  contact: ContactInfo;
  pages: {
    home: SitePage;
    about: SitePage;
    services: SitePage;
    contact: SitePage;
  };
}

export interface Lead {
  id: string;
  business_name: string;
  email: string;
  phone: string;
  industry?: string;
  draft_slug?: string;
  draft_config?: DraftConfig;
}
