import clsx from "clsx";
import { memo, useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { inputWordState } from "../../atoms/InputWord";
import { keyColorListState } from "../../atoms/KeyColorList";
import { lineNumberState } from "../../atoms/LineNumber";

function Key({ alphabet }: { alphabet: string }) {
  const lineNumber = useRecoilValue(lineNumberState);
  const [inputWord, setInputWord] = useRecoilState(inputWordState);
  const keyColorList = useRecoilValue(keyColorListState);

  const handleAddAlphabet = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (lineNumber === 6) return;
      const inputAlphabet = e.currentTarget.textContent;
      if (!inputAlphabet) return;
      if (inputWord[lineNumber] && inputWord[lineNumber].length === 5) return;
      setInputWord((prev) => {
        if (!prev[lineNumber]) {
          return prev.concat([inputAlphabet]);
        }
        return prev.map((word, i) => {
          if (i === lineNumber) return word.concat(inputAlphabet);
          return word;
        });
      });
    },
    [inputWord, lineNumber, setInputWord]
  );

  const backgroundColor = useMemo(() => {
    const index = keyColorList.findIndex(
      (keyColor) => keyColor.key === alphabet
    );
    if (index > -1) return keyColorList[index].color;
    return "bg-gray-500";
  }, [alphabet, keyColorList]);

  return (
    <button
      className={clsx(
        "w-10 h-14 flex rounded-lg text-white font-bold justify-center items-center",
        backgroundColor
      )}
      onClick={handleAddAlphabet}
    >
      {alphabet}
    </button>
  );
}

export default memo(Key);
