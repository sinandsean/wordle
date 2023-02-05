import clsx from "clsx";
import { memo } from "react";
import Key from "./Key";
import SpecialKey from "./SpecialKey";

export const DEL_LABEL = "DEL";
const ENTER_LABEL = "ENTER";

function KeyBoard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "flex flex-col space-y-2 justify-center items-center",
        className
      )}
    >
      <div className="flex space-x-1.5">
        <Key alphabet="Q" />
        <Key alphabet="W" />
        <Key alphabet="E" />
        <Key alphabet="R" />
        <Key alphabet="T" />
        <Key alphabet="Y" />
        <Key alphabet="U" />
        <Key alphabet="I" />
        <Key alphabet="O" />
        <Key alphabet="P" />
      </div>
      <div className="flex space-x-1.5">
        <Key alphabet="A" />
        <Key alphabet="S" />
        <Key alphabet="D" />
        <Key alphabet="F" />
        <Key alphabet="G" />
        <Key alphabet="H" />
        <Key alphabet="J" />
        <Key alphabet="K" />
        <Key alphabet="L" />
      </div>
      <div className="flex space-x-1.5">
        <SpecialKey label={DEL_LABEL} />
        <Key alphabet="Z" />
        <Key alphabet="X" />
        <Key alphabet="C" />
        <Key alphabet="V" />
        <Key alphabet="B" />
        <Key alphabet="N" />
        <Key alphabet="M" />
        <SpecialKey label={ENTER_LABEL} />
      </div>
    </div>
  );
}

export default memo(KeyBoard);
