"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Car, Bike, Zap, CarTaxiFront, ArrowRight } from "lucide-react"
import { getVehicles } from "../services/api"
import { useAuth } from "../contexts/AuthContext"
import Header from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"

export interface Vehicle {
  _id: string
  make: string
  model: string
  year: number
  type: "car" | "bike" | "scooter" | "van"
  pricePerDay: number
  imageUrl: string
}

type VehicleFilterType = "car" | "bike" | "scooter" | "van"

const vehicleIcons: Record<VehicleFilterType, React.ElementType> = {
  car: Car,
  bike: Bike,
  scooter: Zap,
  van: CarTaxiFront,
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [activeFilter, setActiveFilter] = useState<VehicleFilterType>("car")
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true)
      try {
        const response = await getVehicles()
        setVehicles(response.data.vehicles)
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch vehicles.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchVehicles()
  }, [])

  const filteredVehicles = vehicles.filter((vehicle) => vehicle.type === activeFilter)

  const handleBookingClick = (vehicleId: string) => {
    if (isAuthenticated) {
      navigate(`/booking/${vehicleId}`)
    } else {
      toast.error("You must be logged in to book a vehicle.")
      setTimeout(() => {
        navigate("/login")
      }, 1500)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">Our Fleet</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover our exclusive collection of premium vehicles. Choose the perfect ride for your next adventure.
            </p>
          </div>

          <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
            {(Object.keys(vehicleIcons) as VehicleFilterType[]).map((type) => {
              const Icon = vehicleIcons[type]
              const isActive = activeFilter === type
              return (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-card text-foreground border border-border hover:border-primary hover:shadow-md"
                  }`}
                >
                  <Icon size={18} />
                  <span className="capitalize">{type}</span>
                </button>
              )
            })}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading premium vehicles...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle) => (
                  <div
                    key={vehicle._id}
                    className="group bg-card border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-muted h-48">
                      <img
                        src={vehicle.imageUrl || "/placeholder.svg"}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content Container */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{vehicle.year}</p>
                      </div>

                      {/* Price and Button */}
                      <div className="mt-auto space-y-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">${vehicle.pricePerDay}</span>
                          <span className="text-sm text-muted-foreground">/day</span>
                        </div>
                        <button
                          onClick={() => handleBookingClick(vehicle._id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 group/btn hover:gap-3"
                        >
                          Book Now
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="mb-4">
                    <Car size={48} className="mx-auto text-muted-foreground opacity-50" />
                  </div>
                  <p className="text-lg text-muted-foreground">No {activeFilter}s available at the moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Please check back later or explore other vehicle types.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
