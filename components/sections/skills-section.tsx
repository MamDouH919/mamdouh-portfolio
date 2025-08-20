"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useRef, useState } from "react"

const skills = [
  { name: "HTML5", level: 95, icon: "🌐" },
  { name: "CSS3", level: 90, icon: "🎨" },
  { name: "JavaScript", level: 88, icon: "⚡" },
  { name: "TypeScript", level: 85, icon: "📘" },
  { name: "React", level: 92, icon: "⚛️" },
  { name: "Next.js", level: 88, icon: "▲" },
  { name: "Tailwind CSS", level: 90, icon: "💨" },
  { name: "Node.js", level: 75, icon: "🟢" },
  { name: "Git", level: 85, icon: "📝" },
  // { name: "Figma", level: 80, icon: "🎯" },
  { name: "MongoDB", level: 70, icon: "🍃" },
  { name: "Material UI", level: 90, icon: "💅" },
  { name: "shadcn", level: 80, icon: "💅" },
  { name: "Bootstrap", level: 90, icon: "💅" },
  // { name: "PostgreSQL", level: 72, icon: "🐘" },
]

const categories = [
  {
    title: "Frontend Technologies",
    skills: skills.slice(0, 6),
  },
  {
    title: "Backend & Tools",
    skills: skills.slice(6),
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-800`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 gradient-text">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`transition-all duration-800 delay-${categoryIndex * 200}`}
            >
              <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill) => (
                  <Card
                    key={skill.name}
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl">{skill.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{skill.name}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">Proficiency</span>
                          <span className="text-sm font-medium text-primary">{skill.level}%</span>
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={skill.level}
                      className="h-2 transition-all duration-1000 ease-out"
                    />
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div
          className={`mt-16 text-center transition-all duration-800 delay-500`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">12+</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
