"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function DownloadCVButton() {
    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = "/Mamdouh-Aladl-cv.pdf"
        link.download = "Mamdouh Aladl CV" // suggested filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Button
            onClick={handleDownload}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
        >
            <Download className="mr-2 h-5 w-5" />
            Download CV
        </Button>
    )
}
