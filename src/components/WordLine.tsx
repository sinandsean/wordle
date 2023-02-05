import clsx from "clsx";
import { times } from "lodash";
import { memo, useCallback, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { answerState } from "../atoms/Answer";
import { inputWordState } from "../atoms/InputWord";
import { keyColorListState } from "../atoms/KeyColorList";
import { lineNumberState } from "../atoms/LineNumber";

const RIGHT_STYLE = "bg-green-700";
const ONLY_POSITION_STYLE = "bg-yellow-500";
const WRONG_STYLE = "bg-gray-800";

function WordLine({ line }: { line: number }) {
  const lineNumber = useRecoilValue(lineNumberState);
  const inputWord = useRecoilValue(inputWordState);
  const answer = useRecoilValue(answerState);
  const setKeyColorList = useSetRecoilState(keyColorListState);

  const getBackgroundColor = useCallback(
    (i: number) => {
      if (line >= lineNumber) return "";
      const inputText = inputWord[line][i];
      if (answer[i] === inputText) {
        setKeyColorList((prev) => {
          const index = prev.findIndex(
            (keyColor) => keyColor.key === inputText
          );
          if (index > -1) {
            return prev
              .filter((keyColor) => keyColor.key !== inputText)
              .concat({ key: inputText, color: RIGHT_STYLE });
          }
          return prev.concat({ key: inputText, color: RIGHT_STYLE });
        });
        return RIGHT_STYLE;
      }
      if (answer.includes(inputText)) {
        setKeyColorList((prev) => {
          if (prev.find((keyColor) => keyColor.key === inputText)) return prev;
          return prev.concat({ key: inputText, color: ONLY_POSITION_STYLE });
        });
        return ONLY_POSITION_STYLE;
      }
      setKeyColorList((prev) => {
        if (prev.find((keyColor) => keyColor.key === inputText)) return prev;
        return prev.concat({ key: inputText, color: WRONG_STYLE });
      });
      return WRONG_STYLE;
    },
    [answer, inputWord, line, lineNumber, setKeyColorList]
  );

  useEffect(() => {
    console.log({ inputWord });
  }, [inputWord]);

  return (
    <div className="flex space-x-1">
      {times(5, (i) => (
        <div
          key={i}
          className={clsx(
            "flex w-14 h-14 justify-center items-center rounded-md border",
            getBackgroundColor(i),
            !!inputWord[line]?.[i]
              ? "border-gray-400 animate-scale"
              : "border-gray-600",
            line < lineNumber && "animate-rotate"
          )}
        >
          <span className="text-xl font-extrabold text-white">
            {inputWord[line] ? inputWord[line][i] : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export default memo(WordLine);
