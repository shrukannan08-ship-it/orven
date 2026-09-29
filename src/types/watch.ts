export type CaseMaterial = 'titanium' | 'steel' | 'ceramic';
export type DialColor = 'obsidian' | 'ivory' | 'midnight';
export type StrapType = 'leather' | 'steel' | 'rubber';

export interface WatchConfiguration {
  caseMaterial: CaseMaterial;
  dialColor: DialColor;
  strapType: StrapType;
}

export interface ExplodedLayer {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  material: string;
  description: string;
  specs: string[];
  zOffset: number; // Max explosion distance in 3D units
}

export interface CollectionItem {
  id: string;
  modelNumber: string;
  title: string;
  tagline: string;
  diameter: string;
  caseMaterial: string;
  movement: string;
  reserve: string;
  waterResistance: string;
  price: string;
  description: string;
  badge?: string;
  accentColor: string;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  city: string;
  preferredDate: string;
  timeSlot?: string;
  notes?: string;
  configuration?: WatchConfiguration;
}
