"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import projectsData from "@/lib/projects.json"


// const projects = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description:
//       "A full-featured e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "Task Management App",
//     description:
//       "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: true,
//   },
//   {
//     id: 3,
//     title: "Weather Dashboard",
//     description:
//       "A responsive weather dashboard that displays current weather conditions and forecasts for multiple cities with beautiful visualizations.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: false,
//   },
//   {
//     id: 4,
//     title: "Portfolio Website",
//     description:
//       "A modern, responsive portfolio website showcasing projects and skills with smooth animations and optimized performance.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: false,
//   },
//   {
//     id: 5,
//     title: "Blog Platform",
//     description:
//       "A full-stack blog platform with markdown support, comment system, and SEO optimization for content creators.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["Next.js", "MDX", "Prisma", "NextAuth.js"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: false,
//   },
//   {
//     id: 6,
//     title: "Real Estate App",
//     description:
//       "A comprehensive real estate application with property listings, advanced search filters, and interactive maps.",
//     image: "/placeholder.svg?height=300&width=400",
//     technologies: ["React", "Google Maps API", "Firebase", "Material-UI"],
//     liveUrl: "https://example.com",
//     githubUrl: "https://github.com",
//     featured: false,
//   },
// ]

export function ProjectsSection() {
  // const [filter, setFilter] = useState<"all" | "featured">("all")

  // const filteredProjects = filter === "featured" ? projects.filter((p) => p.featured) : projects

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-800`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 gradient-text">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Here are some of the projects I've worked on. Each one represents a unique challenge and learning
            experience.
          </p>

          {/* Filter Buttons */}
          {/* <div className="flex justify-center gap-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="px-6"
            >
              All Projects ({projects.length})
            </Button>
            <Button
              variant={filter === "featured" ? "default" : "outline"}
              onClick={() => setFilter("featured")}
              className="px-6"
            >
              Featured ({projects.filter((p) => p.featured).length})
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(projectsData).map((project, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.images[0] || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    {project.githubUrl && <Button size="sm" variant="secondary" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>}
                  </div>
                  {/* {project.featured && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
                  )} */}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <CardTitle className="mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed mb-4">{project.description}</CardDescription>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  asChild
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  <Link href={`/projects/${project.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-16 transition-all duration-800 delay-500`}
        >
          <p className="text-lg text-muted-foreground mb-6">Interested in working together?</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Let's Start a Project
          </Button>
        </div>
      </div>
    </section>
  )
}
