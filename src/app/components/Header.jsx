'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  console.log('pathname ', pathname)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Herca Group</h1>

        <ul className="flex space-x-4">
          <li>
            <Link
              href="/"
              className={`hover:bg-gray-900 px-4 py-2 rounded ${
                pathname === "/" ? "bg-gray-900" : ""
              }`}
            >
              Overview
            </Link>
          </li>
          <li>
            <a
              href="/transactions"
              className={`hover:bg-gray-900 px-4 py-2 rounded ${
                pathname == "/transactions" ? "bg-gray-900" : ""
              }`}
            >
              Transactions
            </a>
          </li>
          <li>
            <a
              href="/payments"
              className={`hover:bg-gray-900 px-4 py-2 rounded ${
                pathname == "/payments" ? "bg-gray-900" : ""
              }`}
            >
              Payments
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
