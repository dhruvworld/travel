// app/api/car-rental/route.ts
import { NextResponse } from 'next/server';

// Static car rental data
const cars = [
  {
    id: "1",
    name: "Toyota Camry",
    type: "Sedan",
    price: 50,
    image: "/images/cars/camry.jpg",
    available: true
  },
  {
    id: "2",
    name: "Honda CR-V",
    type: "SUV",
    price: 65,
    image: "/images/cars/crv.jpg",
    available: true
  },
  {
    id: "3",
    name: "BMW X5",
    type: "Luxury SUV",
    price: 120,
    image: "/images/cars/x5.jpg",
    available: true
  }
];

// Fetch all cars
export async function GET() {
  return NextResponse.json(cars);
}

// Add a new car rental option (no ID dependency)
export async function POST(req: Request) {
  const data = await req.json();
  // In a real application, you would save this to a database
  // For now, we'll just return a success message
  return NextResponse.json({ message: "Car rental added successfully" });
}
