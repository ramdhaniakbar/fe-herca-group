'use client'
import React, { useState } from "react";

export default function Navigation() {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Herca Group</h1>

        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:bg-gray-900 px-4 py-2 rounded">
              Overview
            </a>
          </li>
          <li>
            <a href="/transactions" className="hover:bg-gray-900 px-4 py-2 rounded">
              Transactions
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-gray-900 px-4 py-2 rounded flex items-center"
            >
              Services
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

          </li>
          <li>
            <a href="/contact" className="hover:bg-gray-900 px-4 py-2 rounded">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}