"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
    {
        id: 2,
        company: "Byte+",
        logo: "/projects/logo.svg",
        position: "Front-End Developer",
        period: "Apr 2025 – Present",
        description:
            "Developed a comprehensive nutrition dashboard to assist doctors in managing patient health. Implemented features for creating servings, building meals from multiple servings, and structuring meal plans composed of several meals, which can then be assigned to specific users. Integrated user profile views with charts for body composition and blood test results. Built a physical assessment module enabling doctors to perform patient evaluations. The dashboard streamlined the process of creating tailored meal plans and conducting assessments, enhancing the overall patient management workflow.",
        technologies: ["Next.js", "Rest API", "Tailwind CSS", "TypeScript", "Redux", "ShadCn", "Query Client"],
    },
    {
        id: 1,
        company: "Accenture",
        logo: "/projects/accWebsite.jpg",
        position: "Front-End Developer",
        period: "Jan 2023 – Present",
        description: "I developed warehousing modules to enhance shipment workflows and data management, implemented real-time notifications using GraphQL subscriptions with Apollo Client, and designed a system-wide dark mode to improve user experience. I also built user preferences management with Redux to persist settings such as themes and view options, while improving UI/UX through redesigned layouts, breadcrumb navigation, and responsive design. Additionally, I created a dynamic sticker printing system that loads templates from files without requiring system updates, and built a complete website for the company.",
        technologies: ["React.js", "GraphQL API", "Material UI", "Next.js", "Apollo Client", "Redux", "TypeScript"],
    },

    {
        id: 3,
        company: "Khwarizmi",
        logo: "/projects/khwarizmi.png",
        position: "Front-End Developer",
        period: "Jan 2023 - Oct 2023",
        description: "I built a web platform where teachers can register, subscribe, and manage multiple students, with monthly and yearly subscription plans implemented using Laravel. The system includes student dashboards, exam assignment tools, and performance tracking, while handling authentication, user roles, and secure exam access.",
        technologies: ["Laravel blade", "HTML", "JavaScript", "Bootstrap", "JQuery"],
    },
    {
        id: 4,
        company: "Star Kids",
        logo: "/projects/start-kids.png",
        position: "Front-End Developer",
        period: "Jan 2022 - Dec 2022",
        description:
            "I built a timed exam interface for Abacus, Mental Math, and Flash Cards with a responsive UI that displays one question at a time, automatic timing, and final result calculation. The system supports dynamic question generation based on teacher input, with exam logic, timing rules, and result processing handled on the server side.",
        technologies: ["HTML", "CSS", "JQuery", "JavaScript", "Bootstrap"],
    },
]

export function ExperienceSection() {
    return (
        <section id="experience" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        My journey through various roles and companies, building expertise in front-end development
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50 hidden md:block"></div>

                        <div className="space-y-8">
                            {experiences.map((experience, index) => (
                                <Card
                                    key={experience.id}
                                    className="experience-card  translate-y-8 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-primary/10 group relative"
                                    style={{ transitionDelay: `${index * 200}ms` }}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-2 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block group-hover:scale-125 transition-transform duration-300"></div>

                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                            {/* Company Logo */}
                                            <div className="flex-shrink-0">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                                    <img
                                                        src={experience.logo || "/placeholder.svg"}
                                                        alt={`${experience.company} logo`}
                                                        className="w-12 h-12 object-contain"
                                                    />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                                            {experience.company}
                                                        </h3>
                                                        <p className="text-lg font-medium text-primary">{experience.position}</p>
                                                    </div>
                                                    <Badge variant="secondary" className="self-start md:self-center">
                                                        {experience.period}
                                                    </Badge>
                                                </div>

                                                <p className="text-muted-foreground mb-4 leading-relaxed">{experience.description}</p>

                                                {/* Technologies */}
                                                <div className="flex flex-wrap gap-2">
                                                    {experience.technologies.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="outline"
                                                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
