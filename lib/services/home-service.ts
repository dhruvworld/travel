import prisma from '@/lib/db/prisma';

export async function getHomeContent() {
  try {
    const content = await prisma.homeContent.findFirst();
    return content;
  } catch (error) {
    console.error('Error fetching home content:', error);
    return null;
  }
}

export async function updateHomeContent(data: {
  title: string;
  subtitle: string;
  heroText?: string;
  heroImage?: string;
}) {
  try {
    const existing = await prisma.homeContent.findFirst();
    
    if (existing) {
      return await prisma.homeContent.update({
        where: { id: existing.id },
        data
      });
    }
    
    return await prisma.homeContent.create({
      data
    });
  } catch (error) {
    console.error('Error updating home content:', error);
    throw error;
  }
}
