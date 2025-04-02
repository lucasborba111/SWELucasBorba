"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Github, Mail, GraduationCap, FileText, MapPin, Code } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  id?: string
  children: ReactNode
  className?: string
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id={id} ref={ref} className={`min-h-screen flex items-center justify-center p-6 ${className}`}>
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </section>
  )
}

export default function Home() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState("aboutmeSection")

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.id

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-dark-blue">
      {/* Sidebar Navigation */}
      <motion.nav
        className="md:w-64 p-6 md:fixed md:h-full z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8 w-full">
          <h2 className="text-xl font-bold text-dark-blue">Lucas B.</h2>
          <LanguageSwitcher />
        </div>

        <ul className="space-y-6 text-medium-blue w-full">
          <li className="flex items-center">
            <button
              onClick={() => scrollToSection("aboutmeSection")}
              className={`transition-colors duration-300 ${activeSection === "aboutmeSection" ? "text-dark-blue font-medium" : ""}`}
            >
              {t("nav.aboutMe")}
            </button>
          </li>
          <li className="flex items-center">
            <button
              onClick={() => scrollToSection("skillsSection")}
              className={`transition-colors duration-300 ${activeSection === "skillsSection" ? "text-dark-blue font-medium" : ""}`}
            >
              {t("nav.skills")}
            </button>
          </li>
          <li className="flex items-center">
            <button
              onClick={() => scrollToSection("experienceSection")}
              className={`transition-colors duration-300 ${activeSection === "experienceSection" ? "text-dark-blue font-medium" : ""}`}
            >
              {t("nav.experience")}
            </button>
          </li>
          <li className="flex items-center">
            <button
              onClick={() => scrollToSection("educationSection")}
              className={`transition-colors duration-300 ${activeSection === "educationSection" ? "text-dark-blue font-medium" : ""}`}
            >
              {t("nav.education")}
            </button>
          </li>
          <li className="flex items-center">
            <button
              onClick={() => scrollToSection("projectsSection")}
              className={`transition-colors duration-300 ${activeSection === "projectsSection" ? "text-dark-blue font-medium" : ""}`}
            >
              {t("nav.projects")}
            </button>
          </li>
        </ul>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64">
        {/* About Me Section */}
        <AnimatedSection id="aboutmeSection">
          <motion.h1 className="text-4xl font-bold text-center mb-16 text-dark-blue" variants={fadeIn}>
            {t("aboutMe.title")}
          </motion.h1>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image */}
            <motion.div
              className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-vibrant-red"
              variants={fadeIn}
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Profile picture"
                width={400}
                height={400}
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-dark-blue/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                📍 {t("aboutMe.location")}
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <motion.h2 className="text-3xl font-bold text-vibrant-red" variants={fadeIn}>
                {t("aboutMe.name")}
              </motion.h2>
              <motion.p className="text-xl mb-4 text-medium-blue" variants={fadeIn}>
                {t("aboutMe.role")}
              </motion.p>

              <motion.p className="mb-4 text-dark-blue" variants={fadeIn}>
                {t("aboutMe.bio1")}
              </motion.p>

              <motion.p className="mb-8 text-dark-blue" variants={fadeIn}>
                {t("aboutMe.bio2")}
              </motion.p>

              {/* Skill Badges */}
              <motion.div className="flex flex-wrap gap-2" variants={fadeIn}>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">💻</span> React.js
                </Badge>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">🔄</span> C#
                </Badge>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">☁️</span> ASP.NET Core
                </Badge>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">🧩</span> Oracle SQL
                </Badge>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">🔄</span> Microserviços
                </Badge>
                <Badge variant="outline" className="bg-white border-gray-200 text-dark-blue">
                  <span className="mr-1">🎨</span> Redux.js
                </Badge>
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <motion.div className="flex justify-center gap-6 mt-16" variants={fadeIn}>
            <a
              href="https://github.com"
              className="p-3 bg-medium-blue rounded-full hover:bg-dark-blue transition-colors text-white"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:example@example.com"
              className="p-3 bg-medium-blue rounded-full hover:bg-dark-blue transition-colors text-white"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com"
              className="p-3 bg-medium-blue rounded-full hover:bg-dark-blue transition-colors text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </motion.div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skillsSection">
          <motion.h1 className="text-4xl font-bold text-center mb-16 text-dark-blue" variants={fadeIn}>
            {t("skills.title")}
          </motion.h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* React.js */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#61DAFB"
                    d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046zM5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 00-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 00-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 013.233-.501 24.847 24.847 0 012.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm9.589 20.362c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 002.421-2.968l.135-.193.234-.02a23.63 23.63 0 003.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 01-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 01-3.234.501 24.674 24.674 0 01-2.051 2.545zM18.69 8.945l-.472-.119a23.479 23.479 0 00-3.787-.61l-.234-.02-.135-.193a23.414 23.414 0 00-2.421-2.967l-.34-.349.34-.349C14.135 1.778 16.515.767 18 1.622c1.512.872 1.812 3.37.824 6.855l-.134.468zM14.75 7.24c1.142.104 2.227.273 3.234.501.686-2.688.509-4.68-.485-5.253-.988-.571-2.845.304-4.8 2.208A24.849 24.849 0 0114.75 7.24zM7.206 22.677A2.38 2.38 0 016 22.369c-1.512-.871-1.812-3.369-.823-6.854l.132-.468.472.119c1.155.291 2.429.496 3.785.609l.235.02.134.193a23.596 23.596 0 002.422 2.968l.34.349-.34.349c-1.898 1.95-3.728 3.023-5.151 3.023zm-1.19-6.427c-.686 2.688-.509 4.681.485 5.254.987.563 2.843-.305 4.8-2.208a24.998 24.998 0 01-2.052-2.545 24.976 24.976 0 01-3.233-.501zm5.984.628c-.823 0-1.669-.036-2.516-.106l-.235-.02-.135-.193a30.388 30.388 0 01-1.35-2.122 30.354 30.354 0 01-1.166-2.228l-.1-.213.1-.213a30.3 30.3 0 011.166-2.228c.414-.716.869-1.43 1.35-2.122l.135-.193.235-.02a29.785 29.785 0 015.033 0l.234.02.134.193a30.006 30.006 0 012.517 4.35l.101.213-.101.213a29.6 29.6 0 01-2.517 4.35l-.134.193-.234.02c-.847.07-1.694.106-2.517.106zm-2.197-1.084c1.48.111 2.914.111 4.395 0a29.006 29.006 0 002.196-3.798 28.585 28.585 0 00-2.197-3.798 29.031 29.031 0 00-4.394 0 28.477 28.477 0 00-2.197 3.798 29.114 29.114 0 002.197 3.798z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">React.js</h3>
              <p className="text-sm text-medium-blue">2 {t("skills.experience")}</p>
            </motion.div>

            {/* C# */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#9B4F96"
                    d="M 11.5 2 L 11.5 2 C 11.5 2 11.5 2 11.5 2 C 11.5 2 11.5 2 11.5 2 L 11.5 2 Z M 11.5 2 L 4.5 6 L 4.5 15 L 11.5 19 L 18.5 15 L 18.5 6 L 11.5 2 Z M 11.5 22 L 11.5 22 C 11.5 22 11.5 22 11.5 22 C 11.5 22 11.5 22 11.5 22 L 11.5 22 Z M 11.5 22 L 0.5 16 L 0.5 5 L 11.5 -1 L 22.5 5 L 22.5 16 L 11.5 22 Z"
                  />
                  <path
                    fill="#68217A"
                    d="M 16.5 10.25 L 16.5 10.25 C 16.5 10.25 16.5 10.25 16.5 10.25 C 16.5 10.25 16.5 10.25 16.5 10.25 L 16.5 10.25 Z M 16.5 10.25 L 14.5 10.25 L 14.5 8.25 L 13.5 8.25 L 13.5 10.25 L 11.5 10.25 L 11.5 11.25 L 13.5 11.25 L 13.5 13.25 L 14.5 13.25 L 14.5 11.25 L 16.5 11.25 L 16.5 10.25 Z M 21.5 13.25 L 21.5 13.25 C 21.5 13.25 21.5 13.25 21.5 13.25 C 21.5 13.25 21.5 13.25 21.5 13.25 L 21.5 13.25 Z M 21.5 13.25 L 19.5 13.25 L 19.5 11.25 L 18.5 11.25 L 18.5 13.25 L 16.5 13.25 L 16.5 14.25 L 18.5 14.25 L 18.5 16.25 L 19.5 16.25 L 19.5 14.25 L 21.5 14.25 L 21.5 13.25 Z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">C#</h3>
              <p className="text-sm text-medium-blue">3 {t("skills.experience")}</p>
            </motion.div>

            {/* ASP.NET Core */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#512BD4"
                    d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L5.856 9.912a2.752 2.752 0 0 1-.221-.384h-.026c.025.526.025 1.017.025 1.66v5.148H4.274V7.53h1.729l2.883 6.003c.143.253.195.357.247.487h.026c-.026-.435-.052-1.007-.052-1.626V7.53h1.334v8.805z"
                  />
                  <path
                    fill="#512BD4"
                    d="M11.263 6.22L9.356 5.268l-6.118 3.56v6.994l6.118 3.56 6.118-3.56v-6.994l-4.211-2.608z"
                  />
                  <path fill="#fff" d="M7.845 10.675v2.524l1.56.904 1.586-.904v-2.524l-1.586-.878-1.56.878z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">ASP.NET Core</h3>
              <p className="text-sm text-medium-blue">3 {t("skills.experience")}</p>
            </motion.div>

            {/* Oracle SQL */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#F80000"
                    d="M16.412 4.412h-8.82a7.588 7.588 0 0 0-.008 15.176h8.828a7.588 7.588 0 0 0 0-15.176zm-.193 12.502H7.786a4.915 4.915 0 0 1 0-9.828h8.433a4.914 4.914 0 1 1 0 9.828z"
                  />
                  <path
                    fill="#F80000"
                    d="M11.894 6.7h.217c2.269 0 4.105 1.838 4.105 4.106v2.384a4.105 4.105 0 0 1-4.105 4.106h-.217a4.105 4.105 0 0 1-4.105-4.106V10.806A4.105 4.105 0 0 1 11.894 6.7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">Oracle SQL</h3>
              <p className="text-sm text-medium-blue">3 {t("skills.experience")}</p>
            </motion.div>

            {/* Redux.js */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#764ABC"
                    d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.047-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 0 0-1.648 1.769c.03.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.838-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.17 1.499-2.023 2.099-2.443a9.96 9.96 0 0 1-.42-1.543C-.867 14.408-.416 18.752.932 20.805c1.004 1.498 3.057 2.456 5.304 2.456.6 0 1.23-.044 1.843-.194 3.897-.749 6.848-3.086 8.541-6.532zm5.348-3.746c-2.32-2.728-5.738-4.226-9.634-4.226h-.51c-.253-.554-.837-.899-1.498-.899h-.045c-.943 0-1.678.81-1.647 1.753.03.898.794 1.648 1.708 1.648h.074a1.69 1.69 0 0 0 1.499-1.049h.555c2.309 0 4.495.674 6.488 1.992 1.527 1.005 2.622 2.323 3.237 3.897.538 1.288.509 2.547-.045 3.597-.855 1.647-2.294 2.517-4.196 2.517-1.199 0-2.367-.375-2.967-.644-.36.298-.96.793-1.394 1.093 1.318.598 2.652.943 3.94.943 2.922 0 5.094-1.647 5.919-3.236.898-1.798.824-4.824-1.47-7.416zM6.49 17.042c.03.899.793 1.648 1.708 1.648h.06a1.688 1.688 0 0 0 1.648-1.768c0-.9-.779-1.647-1.693-1.647h-.06c-.06 0-.15 0-.226.029-1.243-2.098-1.768-4.347-1.572-6.772.12-1.828.72-3.417 1.797-4.735.9-1.124 2.593-1.68 3.747-1.708 3.236-.061 4.585 3.971 4.689 5.574l1.498.45C17.741 3.197 14.686.62 11.764.62 9.02.62 6.49 2.613 5.47 5.535 4.077 9.43 4.991 13.177 6.7 16.174c-.15.195-.24.539-.21.868z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">Redux.js</h3>
              <p className="text-sm text-medium-blue">2 {t("skills.experience")}</p>
            </motion.div>

            {/* Ext.js */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-medium-blue rounded">
                <span className="text-3xl font-bold text-white">Ext</span>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">Ext.js</h3>
              <p className="text-sm text-medium-blue">2 {t("skills.experience")}</p>
            </motion.div>

            {/* Azure DevOps */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#0078D7"
                    d="M0 8.877L2.247 5.91l8.405-3.416V.022l7.37 5.393L2.966 8.338v8.225L0 15.707zm24-4.45v14.651l-5.753 4.9-9.303-3.057v3.056l-5.978-7.416 15.057 1.798V5.415z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">Azure DevOps</h3>
              <p className="text-sm text-medium-blue">3 {t("skills.experience")}</p>
            </motion.div>

            {/* Git */}
            <motion.div
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#F05032"
                    d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-dark-blue">Git</h3>
              <p className="text-sm text-medium-blue">3 {t("skills.experience")}</p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experienceSection">
          <motion.h1 className="text-4xl font-bold text-center mb-16 text-dark-blue" variants={fadeIn}>
            {t("experience.title")}
          </motion.h1>

          <div className="space-y-12">
            <motion.div className="relative pl-8 border-l-2 border-light-blue" variants={fadeIn}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-vibrant-red flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div className="mb-2">
                <span className="text-xs text-medium-blue">{t("experience.backend.period")}</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-blue">{t("experience.backend.title")}</h2>
              <h3 className="text-lg text-medium-blue mb-2">{t("experience.backend.company")}</h3>
              <p className="text-dark-blue mb-4">{t("experience.backend.description")}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white border-gray-200 text-dark-blue">C#</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">ASP.NET Core</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Oracle SQL</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Azure DevOps</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Microserviços</Badge>
              </div>
            </motion.div>

            <motion.div className="relative pl-8 border-l-2 border-light-blue" variants={fadeIn}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-vibrant-red flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div className="mb-2">
                <span className="text-xs text-medium-blue">{t("experience.frontend.period")}</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-blue">{t("experience.frontend.title")}</h2>
              <h3 className="text-lg text-medium-blue mb-2">{t("experience.frontend.company")}</h3>
              <p className="text-dark-blue mb-4">{t("experience.frontend.description")}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white border-gray-200 text-dark-blue">React.js</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Redux.js</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Ext.js</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">JavaScript</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Azure DevOps</Badge>
              </div>
            </motion.div>

            <motion.div className="relative pl-8 border-l-2 border-light-blue" variants={fadeIn}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-vibrant-red flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div className="mb-2">
                <span className="text-xs text-medium-blue">{t("experience.report.period")}</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-blue">{t("experience.report.title")}</h2>
              <h3 className="text-lg text-medium-blue mb-2">{t("experience.report.company")}</h3>
              <p className="text-dark-blue mb-4">{t("experience.report.description")}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white border-gray-200 text-dark-blue">Active Reports</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Visual Basic</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Ext.js</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Oracle SQL</Badge>
              </div>
            </motion.div>

            <motion.div className="relative pl-8 border-l-2 border-light-blue" variants={fadeIn}>
              <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-vibrant-red flex items-center justify-center">
                <Code className="w-3 h-3 text-white" />
              </div>
              <div className="mb-2">
                <span className="text-xs text-medium-blue">{t("experience.assistant.period")}</span>
              </div>
              <h2 className="text-2xl font-bold text-dark-blue">{t("experience.assistant.title")}</h2>
              <h3 className="text-lg text-medium-blue mb-2">{t("experience.assistant.company")}</h3>
              <p className="text-dark-blue mb-4">{t("experience.assistant.description")}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white border-gray-200 text-dark-blue">PHP</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Laravel</Badge>
                <Badge className="bg-white border-gray-200 text-dark-blue">Vue.js</Badge>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection id="educationSection">
          <motion.h1 className="text-4xl font-bold text-center mb-16 text-dark-blue" variants={fadeIn}>
            {t("education.title")}
          </motion.h1>

          <Tabs defaultValue="bachelor" className="w-full">
            <motion.div variants={fadeIn}>
              <TabsList className="mb-8 w-full justify-start border-b border-light-blue bg-transparent">
                <TabsTrigger
                  value="bachelor"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-vibrant-red data-[state=active]:text-vibrant-red rounded-none bg-transparent text-dark-blue"
                >
                  {t("education.bachelor")}
                </TabsTrigger>
                <TabsTrigger
                  value="highschool"
                  className="data-[state=active]:border-b-2 data-[state=active]:border-vibrant-red data-[state=active]:text-vibrant-red rounded-none bg-transparent text-dark-blue"
                >
                  {t("education.highschool")}
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <TabsContent value="bachelor" className="mt-0">
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div className="md:w-1/2" variants={fadeIn}>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="text-vibrant-red" />
                    <span className="text-xl text-dark-blue">{t("education.bachelor.degree")}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4 pl-8">
                    <FileText className="text-vibrant-red" />
                    <span className="text-medium-blue">{t("education.bachelor.period")}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-8 pl-8">
                    <MapPin className="text-vibrant-red" />
                    <span className="text-medium-blue">{t("education.bachelor.university")}</span>
                  </div>

                  <div className="flex gap-2 pl-8">
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      C#
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      Java
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      JavaScript
                    </Badge>
                  </div>
                </motion.div>

                <motion.div className="md:w-1/2" variants={fadeIn}>
                  <p className="mb-4">
                    <span className="text-vibrant-red font-bold">Software Engineering</span>
                  </p>
                  <p className="mb-4 text-dark-blue">
                    Curso de Engenharia de Software com foco em desenvolvimento de aplicações web e mobile, arquitetura
                    de software e gestão de projetos.
                  </p>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="highschool" className="mt-0">
              <div className="flex flex-col md:flex-row gap-8">
                <motion.div className="md:w-1/2" variants={fadeIn}>
                  <div className="flex items-center gap-3 mb-4">
                    <GraduationCap className="text-vibrant-red" />
                    <span className="text-xl text-dark-blue">{t("education.highschool.degree")}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4 pl-8">
                    <FileText className="text-vibrant-red" />
                    <span className="text-medium-blue">{t("education.highschool.period")}</span>
                  </div>

                  <div className="flex items-center gap-3 mb-8 pl-8">
                    <MapPin className="text-vibrant-red" />
                    <span className="text-medium-blue">{t("education.highschool.school")}</span>
                  </div>

                  <div className="flex gap-2 pl-8">
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      HTML
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      CSS
                    </Badge>
                    <Badge variant="outline" className="rounded-full border-gray-200 bg-white text-dark-blue">
                      JavaScript
                    </Badge>
                  </div>
                </motion.div>

                <motion.div className="md:w-1/2" variants={fadeIn}>
                  <p className="mb-4">
                    <span className="text-vibrant-red font-bold">Informática</span>
                  </p>
                  <p className="mb-4 text-dark-blue">
                    Curso técnico em informática com foco em desenvolvimento web e programação básica.
                  </p>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projectsSection">
          <motion.h1 className="text-4xl font-bold text-center mb-16 text-dark-blue" variants={fadeIn}>
            {t("projects.title")}
          </motion.h1>

          <div className="space-y-12">
            {/* Project 1 */}
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="flex items-center gap-4 p-4 bg-medium-blue">
                <div className="w-10 h-10 bg-vibrant-red rounded flex items-center justify-center">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h2 className="text-xl font-medium text-white">{t("projects.whatsapp.title")}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="bg-light-blue rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="WhatsApp Bill Integration"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-medium-blue">{t("projects.status.online")}</span>
                  </div>

                  <p className="text-dark-blue mb-6">{t("projects.whatsapp.description")}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-gray-200 text-dark-blue">React.js</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Meta API</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Ext.js</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="flex items-center gap-4 p-4 bg-medium-blue">
                <div className="w-10 h-10 bg-vibrant-red rounded flex items-center justify-center">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <h2 className="text-xl font-medium text-white">{t("projects.microservices.title")}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="bg-light-blue rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Microservices Migration"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-vibrant-red rounded-full"></span>
                    <span className="text-sm text-medium-blue">{t("projects.status.project")}</span>
                  </div>

                  <p className="text-dark-blue mb-6">{t("projects.microservices.description")}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-gray-200 text-dark-blue">C#</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">ASP.NET Core</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Microserviços</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Azure</Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200"
              variants={fadeIn}
            >
              <div className="flex items-center gap-4 p-4 bg-medium-blue">
                <div className="w-10 h-10 bg-vibrant-red rounded flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
                <h2 className="text-xl font-medium text-white">{t("projects.interfaces.title")}</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="bg-light-blue rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Financial Interfaces"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-medium-blue">{t("projects.status.online")}</span>
                  </div>

                  <p className="text-dark-blue mb-6">{t("projects.interfaces.description")}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white border-gray-200 text-dark-blue">React.js</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Redux.js</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">Ext.js</Badge>
                    <Badge className="bg-white border-gray-200 text-dark-blue">JavaScript</Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>
    </div>
  )
}

