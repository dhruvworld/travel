
// Extend Image type to ensure cloudId is included
export type Image = PrismaImage & {
  cloudId: string;
  category?: string | null;
  alt?: string | null;
}

// Add other model types as needed...
