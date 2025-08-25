"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { supabase } from "@/supabaseClient"
import { AddTestimonialDialog } from "../testimonials/add-testimonial-dialog"

const achievements = [
  {
    icon: "🏆",
    title: "Best Web Developer Award",
    organization: "Tech Excellence Awards 2023",
    year: "2023",
  },
  {
    icon: "📜",
    title: "React Developer Certification",
    organization: "Meta (Facebook)",
    year: "2022",
  },
  {
    icon: "🎓",
    title: "Full-Stack Web Development",
    organization: "FreeCodeCamp",
    year: "2021",
  },
  {
    icon: "⭐",
    title: "Top Rated Freelancer",
    organization: "Upwork",
    year: "2023",
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)


  useEffect(() => {
    let isMounted = true
    const load = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")


      if (!isMounted) return
      if (error) {
        setFetchError(error.message)
      } else {
        setTestimonials(data ?? [])
      }
      setIsLoading(false)
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="mb-20">
          <div
            className={`text-center mb-16 transition-all duration-800 gap-3 flex flex-col items-center`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading gradient-text">What Clients Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take my word for it. Here's what some of my clients have to say about working with me.
            </p>
            <AddTestimonialDialog />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading && (
              <div className="col-span-full text-center text-muted-foreground">Loading...</div>
            )}
            {fetchError && (
              <div className="col-span-full text-center text-red-600">{fetchError}</div>
            )}
            {!isLoading && !fetchError && testimonials.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">No testimonials yet.</div>
            )}
            {!isLoading && !fetchError && testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`transition-all duration-800 hover:shadow-lg`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Quote className="h-8 w-8 text-primary/30 flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground leading-relaxed">{testimonial.comment}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {String(testimonial.name || "")
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} {testimonial.company ? `at ${testimonial.company}` : ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      {Array.from({ length: Number(testimonial.rate) || 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div
            className={`text-center mb-16 transition-all duration-800 delay-500 `}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4 gradient-text">
              Achievements & Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition and certifications that validate my expertise and commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={achievement.title}
                className={`text-center hover:shadow-lg transition-all duration-500 hover:-translate-y-1`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{achievement.organization}</p>
                  <p className="text-xs text-primary font-medium">{achievement.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
