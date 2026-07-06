import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeImages(images: unknown): string[] {
  if (Array.isArray(images)) {
    return images.filter((item): item is string => typeof item === 'string')
  }

  if (typeof images === 'string') {
    return images
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}
