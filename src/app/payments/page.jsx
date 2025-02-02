'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import moment from "moment"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Payments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${API_URL}/payments`)
      .then((response) => {
        setPayments(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching payments:", error)
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />

  return (
    <div className="mx-auto max-w-7xl px-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Payments</h1>
      <Table className="border border-gray-200 shadow-md rounded-lg">
        <TableCaption className="text-gray-500">
          A list of Payments.
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[50px] text-center">No</TableHead>
            <TableHead>Transaction Number</TableHead>
            <TableHead>Payment Date</TableHead>
            <TableHead className="text-right">Amount Paid</TableHead>
            <TableHead className="text-right">Previous Balance</TableHead>
            <TableHead className="text-right">Remaining Balance</TableHead>
            <TableHead className="text-right">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment, index) => (
            <TableRow
              key={payment.id}
              className="even:bg-gray-50 hover:bg-gray-100 transition"
            >
              <TableCell className="text-center font-medium">
                {index + 1}
              </TableCell>
              <TableCell className="font-semibold">
                {payment.transaction.transaction_number}
              </TableCell>
              <TableCell>
                {moment(payment.payment_date).format("DD MMM YYYY")}
              </TableCell>
              <TableCell className="text-right">
                Rp {payment.amount_paid.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                Rp {payment.previous_balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-right font-semibold">
                Rp {payment.remaining_balance.toLocaleString()}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-500">
                {moment(payment.created_at).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Payments