import { useRef } from "react";
import { useImperativeHandle } from "react";

export default function InputField({
  playerName,
  inputValue,
  placeHolderValue,
  onChange,
  playerPreviousText,
  playerTurn,
  onSubmit,
  PlayerRef,
}) {
  const inputRef = useRef(null);

  useImperativeHandle(PlayerRef, () => ({
    focus() {
      inputRef?.current?.focus();
    },
  }));
  // useEffect(() => {
  //   const handlePlaceHolder = () => {
  //     if (placeHolderValue === null) return;
  //     if (inputValue.length === 0 || inputValue === null) {
  //       return placeHolderValue;
  //     }
  //     return null;
  //   };
  //   handlePlaceHolder();
  // }, [inputValue, placeHolderValue]);

  return (
    <div>
      <input
        className="pr-6 pl-3 py-2 min-w-60 border-2 rounded-md text-lg"
        autoFocus
        name={playerName}
        value={inputValue}
        placeholder={playerPreviousText === null ? "" : placeHolderValue}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        disabled={!playerTurn}
        ref={PlayerRef}
      />
    </div>
  );
}
