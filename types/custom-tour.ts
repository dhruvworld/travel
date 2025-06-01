export interface CustomTour {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  destination: string;
  numberOfPeople: number;
  budget?: number;
  createdAt: Date;
  updatedAt: Date;
}
