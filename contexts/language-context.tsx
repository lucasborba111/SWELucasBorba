"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "pt-BR" | "en-US"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Update the translations with Lucas Borba's information
const translations = {
  "pt-BR": {
    // Navigation
    "nav.aboutMe": "Sobre Mim",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiência",
    "nav.education": "Educação",
    "nav.projects": "Projetos",

    // About Me Section
    "aboutMe.title": "Sobre Mim",
    "aboutMe.name": "Lucas Borba",
    "aboutMe.role": "Desenvolvedor Full Stack",
    "aboutMe.bio1":
      "Desenvolvedor com experiência em tecnologias frontend e backend, especializado em criar soluções robustas e escaláveis.",
    "aboutMe.bio2": "Focado em desenvolvimento web com expertise em React.js, C# e ASP.NET Core.",
    "aboutMe.location": "Criciúma, Santa Catarina, Brasil",

    // Skills Section
    "skills.title": "Habilidades",
    "skills.experience": "anos de experiência",

    // Experience Section
    "experience.title": "Experiência",
    "experience.present": "Presente",

    "experience.backend.title": "Backend Software Engineer - Financeiro/Contábil/Geral",
    "experience.backend.company": "Useall Software",
    "experience.backend.period": "abr. de 2024 - o momento",
    "experience.backend.description":
      "Desenvolvimento e manutenção de microserviços para os módulos Financeiro, Contabilidade Geral e Contabilidade, utilizando ASP .NET Core, banco de dados Oracle e infraestrutura Azure. Ambiente ágil com Kanban. Manutenção e aprimoramento do microserviço responsável pelo SPED Fiscal.",

    "experience.frontend.title": "Frontend Software Engineer",
    "experience.frontend.company": "Useall Software",
    "experience.frontend.period": "dez. de 2022 - dez. de 2024",
    "experience.frontend.description":
      "2 anos de experiência no desenvolvimento de aplicações web robustas e escaláveis utilizando Ext.js, React.js e Redux.js na equipe financeiro, contábil, geral. Criação de integração para envio de boletos via WhatsApp/Email. Reestruturação do processo de baixa de contas a pagar. Migração do sistema de uma arquitetura monolítica para microserviços.",

    "experience.report.title": "Report Developer",
    "experience.report.company": "Useall Software",
    "experience.report.period": "abr. de 2022 - dez. de 2022",
    "experience.report.description":
      "Desenvolvimento de relatórios utilizando Active Reports, Visual Basic, Ext.js e Oracle SQL.",

    "experience.assistant.title": "IT Assistant",
    "experience.assistant.company": "Afernandes",
    "experience.assistant.period": "jan. de 2022 - abr. de 2022",
    "experience.assistant.description": "Desenvolvimento web utilizando PHP, Laravel e Vue.js.",

    // Education Section
    "education.title": "Educação",
    "education.bachelor": "Bacharelado",
    "education.highschool": "Ensino Médio",
    "education.bachelor.degree": "Bacharelado em Engenharia de Software",
    "education.bachelor.university": "SATC - Associação Beneficente da Indústria Carbonífera de Santa Catarina",
    "education.bachelor.period": "2022 - 2025",
    "education.highschool.degree": "Ensino Médio em Informática",
    "education.highschool.school": "SATC - Associação Beneficente da Indústria Carbonífera de Santa Catarina",
    "education.highschool.period": "2020 - 2021",

    // Projects Section
    "projects.title": "Projetos",
    "projects.status.online": "Online",
    "projects.status.project": "Projeto",

    "projects.whatsapp.title": "Integração de Boletos via WhatsApp",
    "projects.whatsapp.description":
      "Criação de integração para envio de boletos via WhatsApp/Email, utilizando templates de mensagens e a API do Facebook/Meta, com a implementação de um painel moderno e sofisticado para controle.",

    "projects.microservices.title": "Migração para Microserviços",
    "projects.microservices.description":
      "Migração do sistema de uma arquitetura monolítica para microserviços, com foco na parametrização, melhorando o desempenho, aumentando a escalabilidade e reduzindo significativamente os erros.",

    "projects.interfaces.title": "Interfaces Financeiras",
    "projects.interfaces.description":
      "Desenvolvimento de interfaces modernas para funcionalidades de abatimento de contas a receber e contas a pagar, que receberam feedback positivo dos clientes.",

    // Language Switcher
    language: "Idioma",
    "language.en-US": "Inglês (EUA)",
    "language.pt-BR": "Português (Brasil)",
  },
  "en-US": {
    // Navigation
    "nav.aboutMe": "About Me",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.education": "Education",
    "nav.projects": "Projects",

    // About Me Section
    "aboutMe.title": "About Me",
    "aboutMe.name": "Lucas Borba",
    "aboutMe.role": "Full Stack Developer",
    "aboutMe.bio1":
      "Developer with experience in frontend and backend technologies, specialized in creating robust and scalable solutions.",
    "aboutMe.bio2": "Focused on web development with expertise in React.js, C# and ASP.NET Core.",
    "aboutMe.location": "Criciúma, Santa Catarina, Brazil",

    // Skills Section
    "skills.title": "Skills",
    "skills.experience": "years experience",

    // Experience Section
    "experience.title": "Experience",
    "experience.present": "Present",

    "experience.backend.title": "Backend Software Engineer - Financial/Accounting/General",
    "experience.backend.company": "Useall Software",
    "experience.backend.period": "Apr 2024 - Present",
    "experience.backend.description":
      "Development and maintenance of microservices for Financial, General Accounting and Accounting modules, using ASP .NET Core, Oracle database and Azure infrastructure. Agile environment with Kanban. Maintenance and improvement of the microservice responsible for SPED Fiscal.",

    "experience.frontend.title": "Frontend Software Engineer",
    "experience.frontend.company": "Useall Software",
    "experience.frontend.period": "Dec 2022 - Dec 2024",
    "experience.frontend.description":
      "2 years of experience in developing robust and scalable web applications using Ext.js, React.js and Redux.js in the financial, accounting, general team. Creation of integration for sending bills via WhatsApp/Email. Restructuring of the accounts payable process. Migration of the system from a monolithic architecture to microservices.",

    "experience.report.title": "Report Developer",
    "experience.report.company": "Useall Software",
    "experience.report.period": "Apr 2022 - Dec 2022",
    "experience.report.description":
      "Development of reports using Active Reports, Visual Basic, Ext.js and Oracle SQL.",

    "experience.assistant.title": "IT Assistant",
    "experience.assistant.company": "Afernandes",
    "experience.assistant.period": "Jan 2022 - Apr 2022",
    "experience.assistant.description": "Web development using PHP, Laravel and Vue.js.",

    // Education Section
    "education.title": "Education",
    "education.bachelor": "Bachelor's Degree",
    "education.highschool": "High School",
    "education.bachelor.degree": "Bachelor's Degree in Software Engineering",
    "education.bachelor.university": "SATC - Associação Beneficente da Indústria Carbonífera de Santa Catarina",
    "education.bachelor.period": "2022 - 2025",
    "education.highschool.degree": "High School in Informatics",
    "education.highschool.school": "SATC - Associação Beneficente da Indústria Carbonífera de Santa Catarina",
    "education.highschool.period": "2020 - 2021",

    // Projects Section
    "projects.title": "Projects",
    "projects.status.online": "Online",
    "projects.status.project": "Project",

    "projects.whatsapp.title": "WhatsApp Bill Integration",
    "projects.whatsapp.description":
      "Creation of integration for sending bills via WhatsApp/Email, using message templates and the Facebook/Meta API, with the implementation of a modern and sophisticated control panel.",

    "projects.microservices.title": "Microservices Migration",
    "projects.microservices.description":
      "Migration of the system from a monolithic architecture to microservices, focusing on parameterization, improving performance, increasing scalability and significantly reducing errors.",

    "projects.interfaces.title": "Financial Interfaces",
    "projects.interfaces.description":
      "Development of modern interfaces for accounts receivable and accounts payable abatement functionalities, which received positive feedback from customers.",

    // Language Switcher
    language: "Language",
    "language.en-US": "English (US)",
    "language.pt-BR": "Portuguese (Brazil)",
  },
}

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get initial language from localStorage or default to Portuguese
  const [language, setLanguage] = useState<Language>("pt-BR")

  // Load saved language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

