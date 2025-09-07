import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      {/* Hero Section */}
      <h1 className="font-raleway text-4xl md:text-5xl font-bold mb-4 text-primary text-center">
        Your Journey, Your Car.
      </h1>
      <h2 className="font-raleway text-xl md:text-2xl mb-8 text-gray-700 text-center">
        Fast, easy, and affordable car rentals at your fingertips.
      </h2>

      {/* Search Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full max-w-md">
        <Input
          placeholder="Enter your location"
          className="flex-1 bg-surface shadow-sm"
        />
        <Button className="bg-primary text-white hover:bg-blue-700">
          Find Your Vehicle
        </Button>
      </div>

      {/* Feature Card */}
      <Card className="p-6 bg-surface shadow-md rounded-2xl max-w-screen-md">
        <h1 className="text-3xl font-bold mb-2 text-primary">
          Unlock Your Freedom. The Open Road Awaits.
        </h1>
        <h2 className="text-lg mb-4 text-gray-700">
          Don't let anything hold you back. With our flexible booking,
          competitive rates, and convenient pickup locations, your next great
          adventure is closer than you think.
        </h2>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Wide Selection:</span> From economy
            cars to premium SUVs, find the perfect match.
          </li>
          <li>
            <span className="font-semibold">Transparent Pricing:</span> No
            surprises. The price you see is the price you pay.
          </li>
          <li>
            <span className="font-semibold">24/7 Support:</span> We're here for
            you with roadside assistance anytime, anywhere.
          </li>
          <li>
            <span className="font-semibold">Effortless Booking:</span> Reserve
            your car online in just a few simple steps.
          </li>
        </ul>
        <Button className="bg-secondary text-white hover:bg-amber-600">
          View Cars & Rates
        </Button>
      </Card>
    </div>
  );
};

export default Home;
