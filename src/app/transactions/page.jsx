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
import moment from "moment"
import React, { useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Transaction = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_URL}/transactions`)
      .then((response) => {
        setTransactions(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error)
        setLoading(false)
      })
  }, [])

  console.log('transactions ', transactions)

  if (loading) return <p>Loading transactions...</p>

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Transaction Number</TableHead>
            <TableHead>Marketing</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Cargo Fee</TableHead>
            <TableHead>Total Balance</TableHead>
            <TableHead>Grand Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">created_at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.data.map((transaction, index) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{transaction.transaction_number}</TableCell>
              <TableCell>{transaction.marketing.name}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.cargo_fee}</TableCell>
              <TableCell>{transaction.total_balance}</TableCell>
              <TableCell>{transaction.grand_total}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell className="text-right">{moment(transaction.created_at, 'YYYYMMDD').fromNow()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Transaction
