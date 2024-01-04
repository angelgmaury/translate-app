import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faLanguage } from "@fortawesome/free-solid-svg-icons";
import LanguageSelector from "./LanguageSelector";
import CharacterCounter from "./CharacterCounter";

interface LanguageOption {
  language: string;
  name: string;
}

interface TranslateProps {
  onTextTranslate: (text: string) => void;
  sourceLanguage: string;
  targetLanguage: string;
  languageOptions: LanguageOption[];
  setSourceLanguage: React.Dispatch<React.SetStateAction<string>>;
}
const TranslateComponent: React.FC<TranslateProps> = ({
  onTextTranslate,
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  languageOptions,
}) => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  const languagesBTN = [
    { language: "en-GB", name: "English" },
    { language: "fr-FR", name: "French" },
    { language: "es-ES", name: "Spanish" },
  ];

  const translateText = async () => {
    if (textAreaValue.trim() === "") {
      return;
    }

    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          textAreaValue
        )}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      const translatedText = response.data.responseData.translatedText;

      onTextTranslate(translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      alert("Error translating text");
    }
  };

  const copyText = () => {
    navigator.clipboard.writeText(textAreaValue);
  };

  return (
    <div className="bg-[#1e2331] bg-opacity-60 backdrop-filter backdrop-blur-sm border-box p-8 rounded-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-gray-400 pb-4">
        <div className="flex flex-wrap gap-2 md:gap-4">
          <LanguageSelector
            languages={languagesBTN}
            selectedLanguage={sourceLanguage}
            onLanguageChange={setSourceLanguage}
          />
        </div>
        <select
          onChange={(e) => setSourceLanguage(e.target.value)}
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
        <CharacterCounter
          maxCharacters={500}
          initialValue={textAreaValue}
          onTextChange={setTextAreaValue}
        />
        <div className="flex justify-between">
          <div>
            <button
              onClick={copyText}
              className="bg-transparent text-white py-2 px-4 rounded-md self-end mt-2 mr-2 border border-gray-600"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
          <button
            onClick={translateText}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 self-end mt-2"
          >
            <FontAwesomeIcon
              icon={faLanguage}
              className="pr-2 relative top-[1px]"
            />
            Translate
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslateComponent;
