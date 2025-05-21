import { Book, Building as BuildingCustom, Bus, Factory, BadgeCheck } from 'lucide-react';

export const departments = [
  {
    id: 'public-works',
    name: 'Ministry of Public Works',
    theme: '#1E40AF',
    description: 'Smart Infrastructure & Sustainability',
    icon: 'Factory',
    personas: ['Director of Infrastructure', 'Planning Analyst', 'Maintenance Head']
  },
  {
    id: 'customs',
    name: 'RAK Customs Department',
    theme: '#0E7490',
    description: 'Trade Facilitation & Border Efficiency',
    icon: 'Book',
    personas: ['Commissioner', 'Risk Analyst', 'Inspection Manager']
  },
  {
    id: 'economic-development',
    name: 'Department of Economic Development',
    theme: '#047857',
    description: 'Economic Growth & Ease of Doing Business',
    icon: 'BuildingCustom',
    personas: ['Economic Director', 'License Manager', 'SME Support Officer']
  },
  {
    id: 'public-services',
    name: 'Public Services Department',
    theme: '#7C3AED',
    description: 'Citizen Experience & Digital Services',
    icon: 'BadgeCheck',
    personas: ['Service Director', 'Complaint Manager', 'Digital Transformation Lead']
  },
  {
    id: 'transport',
    name: 'RAK Transport Authority',
    theme: '#B91C1C',
    description: 'Smart Mobility & Traffic Optimization',
    icon: 'Bus',
    personas: ['Transport Director', 'Fleet Manager', 'Route Optimization Specialist']
  }
];

export const getDepartmentIcon = (iconName) => {
  switch (iconName) {
    case 'Factory':
      return Factory;
    case 'Book':
      return Book;
    case 'BuildingCustom':
      return BuildingCustom;
    case 'BadgeCheck':
      return BadgeCheck;
    case 'Bus':
      return Bus;
    default:
      return Factory;
  }
};
