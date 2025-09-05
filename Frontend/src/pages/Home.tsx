import React from "react";
import { Button } from "@/components/ui/button"; // BEGIN: Importing components from shadcn/ui
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className=" font-raleway text-4xl font-bold mb-4">
        Your Journey, Your Car.
      </h1>
      <h2 className=" font-raleway text-xl mb-8">
        Fast, easy, and affordable car rentals at your fingertips.
      </h2>
      <Input placeholder="Enter your location" className="mb-4" />
      <Button className="mb-4">Find Your Vehicle</Button>

      <Card className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-2">
          Unlock Your Freedom. The Open Road Awaits.
        </h1>
        <h2 className="text-lg mb-4">
          Don't let anything hold you back. With our flexible booking,
          competitive rates, and convenient pickup locations, your next great
          adventure is closer than you think.
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Wide Selection: From economy cars to premium SUVs, find the perfect
            match.
          </li>
          <li>
            Transparent Pricing: No surprises. The price you see is the price
            you pay.
          </li>
          <li>
            24/7 Support: We're here for you with roadside assistance anytime,
            anywhere.
          </li>
          <li>
            Effortless Booking: Reserve your car online in just a few simple
            steps.
          </li>
        </ul>
        <Button>View Cars & Rates</Button>
      </Card>
    </div>
  );
};

export default Home; // END: Exporting Home component
