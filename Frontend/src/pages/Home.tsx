import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  PlayCircle,
  ArrowLeft,
  Car,
  Bike,
  Zap,
  Rocket,
} from "lucide-react";

const vehicleData = [
  {
    id: "car",
    icon: Car,
    modelName: "THE CULLINAN'S",
    modelDescription: "TWIN-TURBO V-12",
    tag: "• CULLINAN",
    price: 8750.0,
    mainHeading: "Rent Premium Cars Worldwide",
    description:
      "Experience unparalleled luxury and performance. Our fleet of premium cars is perfect for making a statement wherever you go.",
    imageUrl:
      "https://www.pngmart.com/files/22/Rolls-Royce-Wraith-PNG-Isolated-Photos.png",
    stats: [
      {
        value: "7+ Years",
        text: "In the premium car rental market, redefining luxury travel.",
      },
      {
        value: "72+ Cars",
        text: "A wide range of luxury cars to suit your sophisticated style.",
      },
      {
        value: "€15M+",
        text: "Our entire fleet is valued in euros, representing its premium quality.",
      },
    ],
  },
  {
    id: "bike",
    icon: Bike,
    modelName: "THE PANIGALE V4",
    modelDescription: "DESMOSEDICI STRADALE",
    tag: "• DUCATI",
    price: 2250.0,
    mainHeading: "Ride Superbikes On Open Roads",
    description:
      "Feel the thrill and freedom. Our collection of superbikes is engineered for pure performance and adrenaline.",
    imageUrl:
      "https://www.pngarts.com/files/7/Ducati-Panigale-V4-PNG-Photo.png",
    stats: [
      {
        value: "5+ Years",
        text: "Providing high-performance superbikes for enthusiasts.",
      },
      {
        value: "45+ Bikes",
        text: "From track-focused machines to comfortable tourers.",
      },
      {
        value: "€3M+",
        text: "A fleet of top-tier superbikes valued for their engineering.",
      },
    ],
  },
  {
    id: "scooter",
    icon: Zap,
    modelName: "THE S1 PRO",
    modelDescription: "HYPERDRIVE MOTOR",
    tag: "• ELECTRIC",
    price: 550.0,
    mainHeading: "Explore Cities With E-Scooters",
    description:
      "Navigate the urban jungle with ease. Our e-scooters are smart, sustainable, and perfect for city exploration.",
    imageUrl:
      "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Ola-S1-Pro-210120221926.png",
    stats: [
      { value: "3+ Years", text: "Pioneering smart urban mobility solutions." },
      {
        value: "200+ Scooters",
        text: "Our large fleet ensures availability across the city.",
      },
      {
        value: "€500K+",
        text: "Investment in a green and sustainable transport network.",
      },
    ],
  },
  {
    id: "rocket",
    icon: Rocket,
    modelName: "THE STARSHIP",
    modelDescription: "SUPER HEAVY RAPTOR",
    tag: "• SPACEX",
    price: 99999.99,
    mainHeading: "Travel Beyond The Earth",
    description:
      "For the ultimate journey. Our spacecraft are designed for interplanetary travel, offering an experience out of this world.",
    imageUrl:
      "https://www.pngmart.com/files/22/SpaceX-Starship-PNG-Isolated-Pic.png",
    stats: [
      {
        value: "1+ Year",
        text: "Leading the new age of commercial space travel.",
      },
      {
        value: "5+ Flights",
        text: "Successful missions and counting towards Mars.",
      },
      {
        value: "$2B+",
        text: "Valuation of our next-generation reusable rocket technology.",
      },
    ],
  },
];

const Home: React.FC = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState("car");
  const [isFading, setIsFading] = useState(false);

  const currentVehicle =
    vehicleData.find((v) => v.id === selectedVehicleId) || vehicleData[0];

  const handleVehicleChange = (id: string) => {
    if (id === selectedVehicleId) return;

    setIsFading(true);
    setTimeout(() => {
      setSelectedVehicleId(id);
      setIsFading(false);
    }, 200);
  };

  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center font-sans">
      <main className="container max-w-7xl mx-auto px-6 py-8 mt-24 mb-8 bg-card rounded-4xl shadow-lg relative">
        <div className="grid grid-cols-12 gap-8 items-center relative z-10">
          <div className="col-span-1 flex flex-col items-center gap-6">
            {vehicleData.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleChange(vehicle.id)}
                className={`p-3 rounded-full transition-colors duration-300 ${
                  selectedVehicleId === vehicle.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <vehicle.icon size={24} />
              </button>
            ))}
          </div>

          <div
            className={`col-span-4 flex flex-col justify-between h-full pt-12 pb-20 transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div>
              <p className="text-sm font-semibold tracking-widest text-muted-foreground">
                SEE PERFORMANCE ↗
              </p>
              <h3 className="text-lg mt-2 font-medium text-foreground">
                {currentVehicle.modelName}
              </h3>
              <p className="text-muted-foreground">
                {currentVehicle.modelDescription}
              </p>
            </div>
            <div className="mt-auto">
              <Button
                variant="outline"
                className="rounded-full px-6 py-3 text-foreground"
              >
                {currentVehicle.tag}
              </Button>
              <p className="text-sm mt-8 text-muted-foreground">Rent B/D</p>
              <p className="text-5xl font-bold text-foreground">
                ${currentVehicle.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <Button
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full"
              >
                <ArrowLeft size={20} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full"
              >
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>

          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-10 w-[800px] z-0 transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={currentVehicle.imageUrl}
              alt={currentVehicle.modelName}
              className="w-full h-auto object-contain"
            />
          </div>

          <div
            className={`col-span-7 flex flex-col justify-between items-start h-full pt-12 pb-20 pl-24 transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <div>
              <p className="text-muted-foreground font-medium">
                {currentVehicle.description.split(".")[0]}!
              </p>
              <h1
                className="text-7xl font-extrabold text-foreground mt-4 leading-tight"
                dangerouslySetInnerHTML={{
                  __html: currentVehicle.mainHeading.replace(/ /g, " <br /> "),
                }}
              />
            </div>

            <div className="mt-8">
              <p className="text-muted-foreground max-w-md">
                {currentVehicle.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-12">
              <Button
                size="lg"
                className="text-primary-foreground rounded-lg px-8 py-6"
              >
                Explore Now <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-foreground rounded-lg px-8 py-6"
              >
                <PlayCircle className="mr-2" size={20} /> Watch Video
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-border pt-12 transition-opacity duration-200 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentVehicle.stats.map((stat, index) => (
            <div key={index}>
              <h2 className="text-5xl font-bold text-foreground">
                {stat.value}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
