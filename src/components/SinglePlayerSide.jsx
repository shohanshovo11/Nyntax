import HistorySection from "./HistorySection";
import InputField from "./InputField";
import Label from "./Label";

export default function SinglePlayerSide({
  wordHistoryArray,
  playerName,
  playerText,
  currentPoint,
  onChangeInputField,
  placeHolderValue,
  playerTurn,
  onSubmit,
  PlayerRef,
  timer,
}) {
  const turn = playerTurn === playerName ? true : false;
  return (
    <div className="w-80 flex justify-center items-center flex-col">
      <Label name={playerName} />
      <div className="w-full flex justify-between text-left ml-10 text-3xl my-2">
        <div className="  self-start text-gray-400">{currentPoint}</div>
        {turn && (
          <div
            className={`text-2xl mr-10 font-bold ${
              timer <= 3 ? "text-red-500" : "text-blue-500"
            }`}
          >
            Time: {timer}s
          </div>
        )}
      </div>

      <InputField
        playerName={playerName}
        inputValue={playerText}
        onChange={onChangeInputField}
        placeHolderValue={placeHolderValue}
        playerTurn={turn}
        onSubmit={onSubmit}
        PlayerRef={PlayerRef}
      />
      <HistorySection wordHistoryArray={wordHistoryArray} />
    </div>
  );
}
