"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "HTML5", level: "Expert", icon: "🌐", category: "Frontend" },
  { name: "CSS3", level: "Expert", icon: "🎨", category: "Frontend" },
  { name: "JavaScript", level: "Advanced", icon: "⚡", category: "Frontend" },
  { name: "TypeScript", level: "Advanced", icon: "📘", category: "Frontend" },
  { name: "React", level: "Expert", icon: "⚛️", category: "Frontend" },
  { name: "Next.js", level: "Advanced", icon: "▲", category: "Frontend" },
  { name: "Tailwind CSS", level: "Expert", icon: "💨", category: "Styling" },
  { name: "Node.js", level: "Intermediate", icon: "🟢", category: "Backend" },
  { name: "Git", level: "Advanced", icon: "📝", category: "Tools" },
  { name: "MongoDB", level: "Intermediate", icon: "🍃", category: "Database" },
  { name: "Material UI", level: "Expert", icon: "💅", category: "Styling" },
  { name: "shadcn", level: "Advanced", icon: "💅", category: "Styling" },
  { name: "Bootstrap", level: "Expert", icon: "💅", category: "Styling" },
]

const getLevelColor = (level: string) => {
  switch (level) {
    case "Expert":
      return "bg-green-100 text-green-800 border-green-200"
    case "Advanced":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getLevelDots = (level: string) => {
  const dots = {
    Expert: 4,
    Advanced: 3,
    Intermediate: 2,
    Beginner: 1,
  }
  return dots[level as keyof typeof dots] || 1
}

export function SkillsSectionAlt() {

  const categories = [...new Set(skills.map((skill) => skill.category))]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-800`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to create exceptional digital experiences
          </p>
        </div>

        {/* Skills Grid by Category */}
        {/* <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div
              key={category}
              className={`transition-all duration-800 delay-${categoryIndex * 200} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <h3 className="text-xl font-semibold mb-6 text-center capitalize">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill, index) => (
                    <Card
                      key={skill.name}
                      className={`p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                        }`}
                      style={{ transitionDelay: `${categoryIndex * 200 + index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{skill.icon}</div>
                          <div>
                            <h4 className="font-semibold text-lg">{skill.name}</h4>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${i < getLevelDots(skill.level) ? "bg-primary" : "bg-muted"
                              }`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">{skill.level}</span>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div> */}

        {/* Alternative: Tag Cloud Style */}
        <div
          className={`mt-16 transition-all duration-800 delay-600`}
        >
          {/* <h3 className="text-xl font-semibold mb-8 text-center">Technology Stack</h3> */}
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className={`px-4 py-2 text-sm hover:scale-105 transition-all duration-300 cursor-default ${skill.level === "Expert"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : skill.level === "Advanced"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-muted hover:bg-muted/80"
                  }`}

              >
                <span className="mr-2">{skill.icon}</span>
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div
          className={`mt-16 text-center transition-all duration-800 delay-800`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">13</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

// Also export as default for flexibility
export default SkillsSectionAlt
