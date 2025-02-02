"use client"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import toast, { Toaster } from 'react-hot-toast';
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
import { Button } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const Transaction = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([])
  const [selectedTransactionId, setSelectedTransactionId] = useState(null)
  const [amountPaid, setAmountPaid] = useState("")
  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [errors, setErrors] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const handleDialogOpen = (id) => {
    setOpenModal(true)
    setAmountPaid("")
    setErrors({})
    setSelectedTransactionId(id)
  }

  const handlePurchase = (e) => {
    e.preventDefault()
    setLoadingSubmit(true)
    setErrors({})
    console.log('amount paid ', amountPaid)
  
    toast.promise(
      axios
      .post(
        `${API_URL}/payments`,
        {
          transaction_id: selectedTransactionId,
          amount_paid: parseInt(amountPaid.replace(/[^\d]/g, ""), 10),
        },
        {
          headers: { Accept: "application/json" },
        }
      ),
      {
        loading: 'Processing payment...',
        success: (response) => {
          setTimeout(() => {
            router.push("/payments"); 
          }, 1000); 
          return 'Payment was successful! 🎉'
        },
        error: (error) => {
          setLoadingSubmit(false);
          console.error("Error fetching calculation transactions:", error);

          const apiErrors = error?.response?.data?.errors;

          if (apiErrors && typeof apiErrors === "object") {
            const formattedErrors = Object.keys(apiErrors).reduce((acc, key) => {
              acc[key] = apiErrors[key][0]; 
              return acc;
            }, {});

            setErrors(formattedErrors);
          }

          // if `errors` is NOT present but `message` exists, return the message
          if (!apiErrors && error?.response?.data?.message) {
            return error?.response?.data?.message || "An error occurred";
          }

          return "An unknown error occurred";
        },
      }
    )
  }

  console.log("errors ", errors)

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

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleAmountPaidChange = (e) => {
    const value = e.target.value.replace(/[^,\d]/g, "")
    setAmountPaid(formatRupiah(value))
  }

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <Toaster 
          position="top-center"
          reverseOrder={false}
         />
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
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-right">Action</TableHead>
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
                      className={`${transaction.status == "paid"
                          ? "bg-green-500 hover:bg-green-700 text-white"
                          : transaction.status == "partially_paid"
                          ? "bg-gray-100 hover:bg-gray-200 text-slate-900"
                          : "bg-yellow-600 hover:bg-yellow-700 text-white"}`}
                    >
                      {transaction.status === "paid"
                        ? "Paid"
                        : transaction.status === "partially_paid"
                        ? "Partially Paid"
                        : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-sm text-gray-500">
                    {moment(transaction.created_at).fromNow()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => handleDialogOpen(transaction.id)}
                      >
                        <Plus /> Payment
                      </Button>
                    </DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Payment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-start gap-4">
              <Label htmlFor="amount_paid" className="text-right">
                Amount Paid
              </Label>
              <div className="w-full">
                <Input
                  id="amount_paid"
                  type="text"
                  placeholder="Rp 200.000"
                  className={`col-span-3 ${
                    errors.amount_paid
                      ? "border-red-500 outline-none focus:border-none"
                      : ""
                  }`}
                  value={amountPaid}
                  onChange={handleAmountPaidChange}
                  required
                />
                {errors.amount_paid && (
                  <span className="text-red-500 text-sm">
                    {errors.amount_paid}
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              disabled={loadingSubmit}
              onClick={handlePurchase}
            >
              {loadingSubmit ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Purchasing
                </>
              ) : (
                "Submit Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Transaction
