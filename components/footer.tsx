import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a
              href="https://github.com/MamDouH919"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mamdouh-mohammed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a href="mailto:mamdouh.mohammed919@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>© {currentYear} Mamdouh Mohammed. Made with</span>
            <Heart size={16} className="mx-1 text-red-500" />
            <span>and lots of tea</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
