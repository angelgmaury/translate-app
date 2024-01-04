interface Language {
  language: string;
  name: string;
}

interface LanguageSelectorProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {languages.map((lang) => (
        <button
          key={lang.language}
          onClick={() => {
            onLanguageChange(lang.language);
          }}
          className={`text-white hover:text-gray-300 focus:outline-none ${
            selectedLanguage === lang.language
              ? "border-b-2 border-gray-500"
              : ""
          }`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
