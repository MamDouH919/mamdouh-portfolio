"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, Eye } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import projectsData from "@/lib/projects.json"

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params.id as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const project = projectsData[projectId as keyof typeof projectsData]

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button asChild>
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4 gradient-text">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {project.duration}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {project.client}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Tag className="h-4 w-4" />
                  {project.category}
                </div>
              </div>

              <div className="flex gap-4">
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                {project.githubUrl && <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>}
              </div>
            </div>

            <div className="lg:order-first">
              <img
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>

          {/* sub sites */}
          {project.subSites && project.subSites.length > 0 && (
            // make it grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.subSites.map((subSite, index) => (
                <Button
                  key={index}
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link href={subSite}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Sub-Site
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>

                {/* Main Image */}
                <div className="mb-6">
                  <img
                    src={project.images[currentImageIndex] || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-96 object-contain rounded-lg shadow-lg"
                  />
                </div>

                {/* Thumbnail Navigation */}
                <div className="grid grid-cols-5 gap-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden transition-all ${currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                        }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">About This Project</h2>
                <div className="prose prose-gray max-w-none">
                  {project.longDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{project.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client:</span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Interested in Similar Work?</h3>
                <p className="text-muted-foreground mb-4">
                  I'd love to help you build something amazing. Let's discuss your project!
                </p>
                <Button className="w-full" asChild>
                  <Link href="/#contact">Get In Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
