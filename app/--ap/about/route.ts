// app/api/about/route.ts
import { NextResponse } from 'next/server';

// Static about page data
export async function GET() {
  const aboutData = {
    title: "About Shubham Tours",
    description: "Learn about our journey, team, and what makes Shubham Tours unique.",
  };
  
  return NextResponse.json(aboutData);
}
