"use client"

import { motion } from "framer-motion"
import { 
  ShoppingBasket, Car, Scissors, Dumbbell, PawPrint, 
  MonitorSmartphone, Gift, SprayCan, Shirt, Sofa, 
  Gem, Truck, ShoppingBag, Luggage, 
  Cpu, Wrench, Smartphone, Package, Watch, ShoppingCart
} from "lucide-react"

export default function Services() {
  const services = [
    { icon: ShoppingBasket, title: "Grocery & Supermarket" },
    { icon: Car, title: "Autoparts & Accessories" },
    { icon: PawPrint, title: "Pet Shops" },
    { icon: MonitorSmartphone, title: "Consumer Electronics" },
    { icon: Gift, title: "Gifting & Stationery" },
    { icon: SprayCan, title: "Cosmetics & Personal Care" },
    { icon: Shirt, title: "Clothing & Apparel" },
    { icon: Sofa, title: "Furniture & Home Decor" },
    { icon: ShoppingCart, title: "Footwear & Accessories" },
    { icon: Gem, title: "Jewelry & Watches" },
    { icon: ShoppingBag, title: "Luxury Boutiques" },
    { icon: Smartphone, title: "Mobile & Computer Stores" },
    { icon: Wrench, title: "Hardware & Tools" },
    { icon: Watch, title: "Watches" },
    { icon: MonitorSmartphone, title: "Photography & Videography" },
    { icon: SprayCan, title: "Perfumes & Fragrances" }
  ]

  return (
    <section className="pb-20 md:pb-28 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5F5F5 0%, #ffffff 100%)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full text-sm font-medium mb-4">
            🏢 Industry Solutions
          </div> */}
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Specialist <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Industries</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tailored solutions for every retail business 
          </p>
        </div>

        {/* <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20"> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 flex flex-col items-center text-center h-full border border-gray-100 hover:border-[#D7263D]/30"
                >
                  <div className="p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-[#D7263D]/10 to-[#F03A47]/10">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{color: '#D7263D'}} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#D7263D] transition-colors leading-tight">{service.title}</h3>
                </motion.div>
              )
            })}
          </div>
        {/* </div> */}
      </div>
    </section>
  )
}
