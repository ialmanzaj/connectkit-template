"use client"

import Link from "next/link"
import { redirect } from "next/navigation"
import { useSIWE } from "connectkit"

import { routes } from "@/config/routes"
import { db } from "@/lib/db"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DepositModal } from "@/components/dialogs/deposit-dialog"
import { ThemeToggle } from "@/components/theme-toggle"

export function Dashboard() {
  const { data, isSignedIn, signOut, signIn } = useSIWE()


  return (
    <main className="flex flex-col md:flex-row items-center justify-center w-full space-x-0 md:space-x-32"></main>
  )
}
