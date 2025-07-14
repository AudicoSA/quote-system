
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Headphones, Mic, Monitor, Settings, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Audio Equipment",
    description: "Get recommendations for headphones, speakers, microphones, and audio interfaces tailored to your needs and budget."
  },
  {
    icon: Monitor,
    title: "Visual Setup",
    description: "Expert advice on displays, projectors, cameras, and visual equipment for any environment or use case."
  },
  {
    icon: Settings,
    title: "Technical Support",
    description: "Troubleshooting guidance, setup assistance, and configuration help for your audio visual equipment."
  },
  {
    icon: Mic,
    title: "Recording Solutions",
    description: "Professional recommendations for recording studios, podcasts, streaming, and content creation setups."
  },
  {
    icon: Zap,
    title: "Quick Responses",
    description: "Instant AI-powered answers to your AV questions with detailed explanations and step-by-step guidance."
  },
  {
    icon: Users,
    title: "Personalized Advice",
    description: "Tailored recommendations based on your specific requirements, space, and intended use cases."
  }
];

export function Features() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section id="features" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Comprehensive AV <span className="text-blue-400">Consultation</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From basic equipment recommendations to complex technical solutions, our AI-powered consultation covers all aspects of audio visual technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 h-full border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover-lift">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
