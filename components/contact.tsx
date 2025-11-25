"use client"

export default function Contact() {
  return (
    <>
      <section className="pb-20 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #F5F5F5 0%, #ffffff 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full text-sm font-medium mb-4">
              💬 Let's Connect
            </div> */}
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get In <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business? We're here to help you succeed!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Call Us Card */}
            <div className="group text-center p-6 md:p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 bg-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-2xl md:text-3xl" style={{color: '#D7263D'}}>📞</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">
                Call Us
              </h3>
              <div className="space-y-2 text-gray-600 text-sm md:text-base">
                <p className="font-medium break-all">📱 Demo: +91 96011 76051</p>
                <p className="font-medium break-all">🛠️ Support: +91 94273 00816</p>
              </div>
            </div>

            {/* Mail Us Card */}
            <div className="group text-center p-6 md:p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-gray-100">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 bg-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8" style={{color: '#D7263D'}} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">
                Mail Us
              </h3>
              <div className="space-y-2 text-gray-600 text-xs md:text-base">
                <p className="font-medium break-all">
                  <a href="mailto:hello.technovatechnologies@gmail.com">
                    hello.technovatechnologies@gmail.com
                  </a>
                </p>
                <p className="font-medium break-all">
                  <a href="mailto:madevisionstudios@gmail.com">
                    madevisionstudios@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="group text-center p-6 md:p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 bg-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-6 h-6 md:w-8 md:h-8" style={{color: '#D7263D'}} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">
                WhatsApp
              </h3>
              <div className="space-y-2 text-gray-600 text-sm md:text-base">
                <p className="font-medium break-all">+91 94273 00816</p>
                <p className="font-medium break-all">+91 94280 13889</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Partners Section */}
      <section className="py-24 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)'}}>
        <div className="absolute inset-0 bg-red-900/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-red-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-100/15 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Payment <span className="bg-gradient-to-r from-[#D7263D] to-[#F03A47] bg-clip-text text-transparent">Partners</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Connect with India's most trusted payment platforms. One integration, endless possibilities.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {[
              { name: "Google Pay", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", color: "#4285F4" },
              { name: "PhonePe", logo: "https://cdn.worldvectorlogo.com/logos/phonepe-1.svg", color: "#5F259F" },
              { name: "Paytm", logo: "https://cdn.worldvectorlogo.com/logos/paytm-1.svg", color: "#00BAF2" },
              { name: "Razorpay", logo: null, color: "#3395FF" },
              { name: "PayU", logo: "https://cdn.worldvectorlogo.com/logos/payu-1.svg", color: "#17A2B8" },
              { name: "UPI", logo: null, color: "#FF6B35" }
            ].map((partner, index) => (
              <div 
                key={partner.name} 
                className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-700 hover:scale-110 hover:rotate-3 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${partner.color}15 0%, ${partner.color}05 100%)`,
                  animationDelay: `${index * 150}ms`,
                  boxShadow: `0 10px 40px ${partner.color}20`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent backdrop-blur-sm"></div>
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500" style={{backgroundColor: partner.color}}></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full opacity-10 group-hover:opacity-60 transition-opacity duration-700" style={{backgroundColor: partner.color}}></div>
                
                <div className="relative z-10 flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl" style={{background: `linear-gradient(135deg, ${partner.color} 0%, ${partner.color}80 100%)`}}>
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-contain filter brightness-0 invert" />
                      ) : (
                        <span className="text-white font-black text-lg">{partner.name.slice(0,2)}</span>
                      )}
                    </div>
                    <div className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: `linear-gradient(135deg, ${partner.color}30, transparent)`, filter: 'blur(8px)'}}></div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-lg font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">{partner.name}</span>
                    <div className="w-full h-1 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{background: `linear-gradient(90deg, ${partner.color}, transparent)`}}></div>
                  </div>
                </div>
               
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-white/30 transition-all duration-500"></div>
              </div>
            ))}
          </div>
          
          {/* <div className="text-center">
            <div className="inline-flex items-center gap-4">
              <a 
                href="https://peddleplus.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D7263D] to-[#F03A47] text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-[#F03A47] hover:to-[#D7263D]"
              >
                <span>🚀</span>
                Explore Integrations
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div> */}
        </div>
      </section>


     
  

    </>
  )
}