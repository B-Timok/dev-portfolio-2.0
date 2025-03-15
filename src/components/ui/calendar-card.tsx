"use client"

import { useState } from "react"
import Calendar from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export function CalendarCard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="border border-border shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-secondary" />
          <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
      </CardContent>
    </Card>
  )
}

