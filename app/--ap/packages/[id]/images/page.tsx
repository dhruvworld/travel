import { Metadata } from 'next';
import ImagesList from './images-list';

// Define the static package IDs that we know exist
const PACKAGE_IDS = ['1', '2', '3'] as const;

// Generate static params for all known package IDs
export async function generateStaticParams() {
  return PACKAGE_IDS.map((id) => ({
    id,
  }));
}

// Generate metadata for each package
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Images for Package ${params.id}`,
    description: `Gallery of images for travel package ${params.id}`,
  };
}

export default function PackageImagesPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Package Images</h1>
      <ImagesList packageId={params.id} />
    </div>
  );
} 