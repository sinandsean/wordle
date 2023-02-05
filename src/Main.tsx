import React, { useMemo } from "react";
import KeyBoard from "./components/KeyBoard";
import WordLine from "./components/WordLine";
import { times } from "lodash";
import { useRecoilValue } from "recoil";
import { lineNumberState } from "./atoms/LineNumber";
import { inputWordState } from "./atoms/InputWord";
import { answerState } from "./atoms/Answer";
import clsx from "clsx";

function Main() {
  const lineNumber = useRecoilValue(lineNumberState);
  const inputWord = useRecoilValue(inputWordState);
  const answer = useRecoilValue(answerState);

  const result = useMemo(() => {
    if (lineNumber !== 6) return null;
    return inputWord[lineNumber]?.toString() === answer
      ? "You Win!"
      : "You Lost!";
  }, [answer, inputWord, lineNumber]);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute inset-0 flex flex-col space-y-3 justify-center items-center">
        <div className="flex flex-col space-y-1">
          {times(6, (i) => (
            <WordLine line={i} key={i} />
          ))}
        </div>
        <div
          className={clsx(
            "w-24 h-6 flex justify-center items-center rounded-full bg-gray-300 font-bold",
            !result && "invisible"
          )}
        >
          {result}
        </div>
        <KeyBoard />
      </div>
    </div>
  );
}

export default Main;
