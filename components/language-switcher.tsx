"use client"

import { useState } from "react"
import { Check, Globe } from "lucide-react"
import { useLanguage, type Language } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Language; name: string }[] = [
    { code: "en-US", name: t("language.en-US") },
    { code: "pt-BR", name: t("language.pt-BR") },
  ]

  const toggleDropdown = () => setIsOpen(!isOpen)

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors text-dark-blue"
        aria-label={t("language")}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm">{t("language")}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
          <ul className="py-1">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => changeLanguage(lang.code)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-dark-blue hover:bg-gray-100"
                >
                  <span>{lang.name}</span>
                  {language === lang.code && <Check className="w-4 h-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

