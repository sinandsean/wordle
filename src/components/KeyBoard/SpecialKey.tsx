import { memo, useCallback } from "react";
import { useRecoilState } from "recoil";
import { DEL_LABEL } from ".";
import { inputWordState } from "../../atoms/InputWord";
import { lineNumberState } from "../../atoms/LineNumber";

function SpecialKey({ label }: { label: string }) {
  const [lineNumber, setLineNumber] = useRecoilState(lineNumberState);
  const [inputWord, setInputWord] = useRecoilState(inputWordState);

  const handleNext = useCallback(() => {
    if (lineNumber === 6) return;
    if (!inputWord[lineNumber]) return;
    if (inputWord[lineNumber].length < 5) return;
    setLineNumber((prev) => prev + 1);
  }, [inputWord, lineNumber, setLineNumber]);
  const handleDeleteAlphabet = useCallback(() => {
    if (lineNumber === 6) return;
    if (inputWord[lineNumber].length === 0) return;
    setInputWord((prev) =>
      prev.map((word, i) => {
        if (i === lineNumber) {
          if (word.length === 1) {
            return [];
          }
          return word.slice(0, word.length - 1);
        }
        return word;
      })
    );
  }, [inputWord, lineNumber, setInputWord]);

  const handleClick = useCallback(() => {
    if (label === DEL_LABEL) {
      handleDeleteAlphabet();
      return;
    }
    handleNext();
  }, [handleDeleteAlphabet, handleNext, label]);

  return (
    <button
      className="flex px-2 rounded-lg bg-gray-500 text-white font-semibold justify-center items-center"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

export default memo(SpecialKey);
