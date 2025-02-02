"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import React, { useEffect, useState } from "react"
import Loading from "./components/Loading"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Home = () => {
  const [calculationTransactions, setCalculationTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_URL}/calculation-transactions`)
      .then((response) => {
        setCalculationTransactions(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching calculation transactions:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Calculation Transactions</h1>
      <Table className="border border-gray-200 shadow-md rounded-lg">
        <TableCaption className="text-gray-500">
          A list of calculation transactions.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[50px] text-center">No</TableHead>
            <TableHead>Marketing</TableHead>
            <TableHead>Bulan</TableHead>
            <TableHead className="text-center">Omzet</TableHead>
            <TableHead className="text-center">Komisi</TableHead>
            <TableHead className="text-right">Komisi Nominal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculationTransactions?.map((transaction, index) => (
            <TableRow key={index + 1} className="even:bg-gray-50 hover:bg-gray-100 transition">
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="font-semibold">{transaction.marketing_name}</TableCell>
              <TableCell>{transaction.month}</TableCell>
              <TableCell className="text-center font-semibold">Rp {parseInt(transaction.omzet).toLocaleString()}</TableCell>
              <TableCell className="text-center">{transaction.commission * 100}%</TableCell>
              <TableCell className="text-right">Rp {parseInt(transaction.commission_nominal).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Home
