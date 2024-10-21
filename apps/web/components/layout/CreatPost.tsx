'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ComponentDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>
            This is the content of the modal. You can put any information or components here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>Here's some additional content in the modal body.</p>
          <p>You can customize this further based on your needs.</p>
        </div>
        <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
      </DialogContent>
    </Dialog>
  )
}