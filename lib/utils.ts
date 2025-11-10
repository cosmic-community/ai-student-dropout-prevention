import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'text-low';
    case 'moderate':
      return 'text-moderate';
    case 'high':
      return 'text-high';
    case 'very high':
      return 'text-veryhigh';
    default:
      return 'text-gray-500';
  }
}

export function getRiskBgColor(riskLevel: string): string {
  switch (riskLevel.toLowerCase()) {
    case 'low':
      return 'bg-low';
    case 'moderate':
      return 'bg-moderate';
    case 'high':
      return 'bg-high';
    case 'very high':
      return 'bg-veryhigh';
    default:
      return 'bg-gray-500';
  }
}

export function extractKeywords(text: string): string[] {
  // Simple keyword extraction - in production, use NLP library
  const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'as', 'by']);
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Return unique keywords
  return Array.from(new Set(words));
}