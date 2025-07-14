
"use client";

import Link from "next/link";
import { Headphones, Mail, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Headphones className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Audico</span>
            </Link>
            <p className="text-slate-300 mb-4 max-w-md">
              Professional AI-powered audio visual consultation services. Get expert advice on your AV setup, equipment recommendations, and technical solutions.
            </p>
            <div className="flex items-center space-x-4">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-slate-400">Secure & Private</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-slate-300 hover:text-white transition-colors">
                  Start Consultation
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">support@audico.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Audico. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-slate-400 text-sm">for audio visual enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
