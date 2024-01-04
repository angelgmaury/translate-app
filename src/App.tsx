import { useEffect, useState } from "react";
import TranslateComponent from "./components/TranslateComponent";
import TranslatedComponent from "./components/TranslatedComponent";
import languages from "./data/Languajes";

interface LanguageOption {
  language: string;
  name: string;
}

function App() {
  const [translatedText, setTranslatedText] = useState<string>("");
  const [sourceLanguage, setSourceLanguage] = useState<string>("en-GB");
  const [targetLanguage, setTargetLanguage] = useState<string>("es-ES");
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>([]);

  useEffect(() => {
    // Transforma la lista de idiomas a un formato compatible con LanguageOption
    const formattedLanguages: LanguageOption[] = languages.map((lang) => {
      const key = Object.keys(lang)[0];
      const value = Object.values(lang)[0];
      return { language: key, name: value };
    });
    setLanguageOptions(formattedLanguages);
  }, []);

  const handleTranslatedText = (text: string) => {
    setTranslatedText(text);
  };

  const handleTargetLanguageChange = (newTargetLanguage: string) => {
    setTargetLanguage(newTargetLanguage);
  };

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:w-full gap-4 mt-8 md:mt-0 px-5 md:px-10 md:content-center md:h-screen">
      <TranslateComponent
        onTextTranslate={handleTranslatedText}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        setSourceLanguage={setSourceLanguage}
        languageOptions={languageOptions}
      />
      <TranslatedComponent
        translatedText={translatedText}
        targetLanguage={targetLanguage}
        onTargetLanguageChange={handleTargetLanguageChange}
        languageOptions={languageOptions}
      />
    </div>
  );
}

export default App;
