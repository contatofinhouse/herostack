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
  industry: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
}