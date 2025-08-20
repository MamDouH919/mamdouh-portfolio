"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Code, Coffee, Lightbulb } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className={`transition-all duration-800`}>
            <div className="relative">
              <img
                src="/mamdouh-mohammed.png"
                alt="Mamdouh Mohammed"
                className="rounded-2xl shadow-2xl w-full max-w-md mx-auto lg:mx-0"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg">
                <Code size={32} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`transition-all duration-800 delay-200`}>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-6 gradient-text">About Me</h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm Mamdouh Mohammed, a passionate Front-End Developer with over 3 years of experience creating
                exceptional digital experiences. I specialize in building responsive, user-friendly web applications
                using modern technologies like React, Next.js, and TypeScript.
              </p>

              <p>
                My journey in web development started with a curiosity about how websites work, and it has evolved into
                a deep passion for creating intuitive user interfaces and seamless user experiences. I believe that
                great design and clean code go hand in hand.
              </p>

              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or enjoying a good cup of coffee while brainstorming the next big idea.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 my-8">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </Card>
            </div>

            {/* Highlights */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <span>Creative problem solver with attention to detail</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span>Passionate about clean, maintainable code</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Coffee className="h-5 w-5 text-primary" />
                </div>
                <span>Always learning and staying up-to-date with trends</span>
              </div>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="mr-2 h-5 w-5" />
              Download My CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
