import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
        <footer className="bg-gray-100 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                {/* <BarChart2 className="h-6 w-6 text-blue-600" /> */}
                <span className="font-bold text-xl">Equity</span>
              </div>
              
              <nav className="flex space-x-4 mb-4 md:mb-0">
                <Link href="/about" className="text-gray-600 hover:text-blue-600">
                  About
                </Link>
                <Link href="/services" className="text-gray-600 hover:text-blue-600">
                  Services
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </nav>
              
              <div className="text-sm text-gray-500">
                © {new Date().getFullYear()} Equity. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer
