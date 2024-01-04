import React, { useState } from "react";

interface CharacterCounterProps {
  maxCharacters: number;
  initialValue: string;
  onTextChange: (text: string) => void;
}

const CharacterCounter: React.FC<CharacterCounterProps> = ({
  maxCharacters,
  initialValue,
  onTextChange,
}) => {
  const [textValue, setTextValue] = useState<string>(initialValue);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setTextValue(inputValue);
      onTextChange(inputValue);
    }
  };

  return (
    <div>
      <textarea
        value={textValue}
        onChange={handleTextAreaChange}
        className="text-white bg-transparent focus:outline-none rounded-md md:p-2 md:mb-2 resize-none h-24 md:h-32"
        placeholder="Enter text..."
        maxLength={maxCharacters}
      />
      <div className="flex justify-end text-gray-300 text-sm">
        <p>{textValue.length}</p>
        <span>/</span>
        <p>{maxCharacters - textValue.length}</p>
      </div>
    </div>
  );
};

export default CharacterCounter;
