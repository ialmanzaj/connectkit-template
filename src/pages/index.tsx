import { db } from "@/lib/db"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Dashboard } from "@/components/dashboard"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
        <section className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Dashboard />
        </section>
      </div>
    </div>
  )
}
