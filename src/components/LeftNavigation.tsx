"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';

export default function LeftNavigation() {
  const [helpExpanded, setHelpExpanded] = useState(false);
  const [accountExpanded, setAccountExpanded] = useState(false);

  return (
    <div className="fixed left-0 top-0 w-64 bg-white border-r border-gray-200 h-screen flex flex-col z-10">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/prodigy-orange-logo-text.webp"
            alt="Prodigy"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 text-gray-900">
            <FontAwesomeIcon icon={faBuilding} className="w-5 h-5" />
            <span className="font-medium">Active classes</span>
          </div>
          
          <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
            <FontAwesomeIcon icon={faFolderOpen} className="w-5 h-5" />
            <span className="font-medium">Archived classes</span>
          </div>
        </nav>
      </div>

      {/* Bottom Menu Items */}
      <div className="border-t border-gray-200 p-3 space-y-1">
        <div>
          <button
            onClick={() => setHelpExpanded(!helpExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Help</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${helpExpanded ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div>
          <button
            onClick={() => setAccountExpanded(!accountExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Katie W.</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${accountExpanded ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}