"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState, useRef } from "react"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        try {
          await videoRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.error("Video play failed:", error)
          setIsPlaying(false)
        }
      }
    }
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-14 sm:pt-16 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        poster="/retail-dashboard.jpg"
      >
        <source src="https://cdn.jsdelivr.net/npm/big-buck-bunny-720p@0.0.7/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-2">
            A <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">360°</span> Retail Solution
            <br className="hidden xs:block" />
            <span className="xs:hidden"> </span>by the Retailians, for the <span className="text-white">Retailers</span> 
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-4"
        >
           Empowering <strong>thousands</strong> of retail business owners across India to embrace technology and streamline operations.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>One platform, infinite possibilities! 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
        >
          {/* Placeholder for future CTA buttons */}
        </motion.div>
      </div>

      {/* Scroll Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <svg className="w-full h-8 sm:h-12 md:h-16 lg:h-20" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  )
}
