import { LucideIcon } from 'lucide-react';

export interface StatItem {
  id: number;
  value: string;
  label: string;
  color: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}