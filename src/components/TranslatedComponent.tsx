import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import LanguageSelector from "./LanguageSelector";

interface LanguageOption {
  language: string;
  name: string;
}

interface TranslatedProps {
  translatedText: string;
  targetLanguage: string;
  onTargetLanguageChange: (newTargetLanguage: string) => void;
  languageOptions: LanguageOption[];
}

function TranslatedComponent({
  translatedText,
  targetLanguage,
  onTargetLanguageChange,
  languageOptions,
}: TranslatedProps) {
  const languagesBTN = [
    { language: "en-GB", name: "English" },
    { language: "fr-FR", name: "French" },
    { language: "es-ES", name: "Spanish" },
  ];
  const copyText = () => {
    navigator.clipboard.writeText(translatedText);
  };

  return (
    <div className="bg-[#1e2331] bg-opacity-60 backdrop-filter backdrop-blur-sm border-box p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-gray-400 pb-4">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <LanguageSelector
            languages={languagesBTN}
            selectedLanguage={targetLanguage}
            onLanguageChange={onTargetLanguageChange}
          />
        </div>
        <select
          onChange={(e) => onTargetLanguageChange(e.target.value)}
          className="bg-transparent text-white rounded-md pt-2 md:p-2"
        >
          <option disabled selected>
            Other
          </option>
          {languageOptions.map((option) => (
            <option className="text-black">{option.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <textarea
          value={translatedText}
          readOnly
          className="text-white bg-transparent focus:outline-none rounded-md p-2 mb-7 resize-none w-full max-w-md  h-20 md:h-32"
          placeholder="Translated text..."
        />

        <div className="flex items-end">
          <button
            onClick={copyText}
            className="bg-transparent text-white py-2 px-4 rounded-md mt-2 mr-2 border border-gray-600"
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslatedComponent;
