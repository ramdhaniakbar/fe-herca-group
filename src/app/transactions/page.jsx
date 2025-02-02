"use client"
import { Badge } from "@/components/ui/badge"
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
import Loading from "../components/Loading"

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

  if (loading) return <Loading />

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Transactions</h1>
      <Table className="border border-gray-200 shadow-md rounded-lg">
        <TableCaption className="text-gray-500">
          A list of Transactions.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[50px] text-center">No</TableHead>
            <TableHead>Transaction Number</TableHead>
            <TableHead>Marketing</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Cargo Fee</TableHead>
            <TableHead className="text-right">Total Balance</TableHead>
            <TableHead className="text-right">Grand Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.data.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className="even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="font-semibold">
                {transaction.transaction_number}
              </TableCell>
              <TableCell>{transaction.marketing?.name || "-"}</TableCell>
              <TableCell>
                {moment(transaction.date).format("DD MMM YYYY")}
              </TableCell>
              <TableCell className="text-right">
                Rp {transaction.cargo_fee.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                Rp {transaction.total_balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-semibold">
                Rp {transaction.grand_total.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    transaction.status === "paid"
                      ? "success"
                      : transaction.status === "partially_paid"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {transaction.status === "paid"
                    ? "Paid"
                    : transaction.status === "partially_paid"
                    ? "Partially Paid"
                    : "Pending"}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm text-gray-500">
                {moment(transaction.created_at).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Transaction
