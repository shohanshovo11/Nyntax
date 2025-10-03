import HistorySection from "./HistorySection";
import InputField from "./InputField";
import Label from "./Label";

export default function SinglePlayerSide({
  wordHistoryArray,
  playerName,
  playerText,
  playerPreviousText,
  currentPoint,
  onChangeInputField,
  placeHolderValue,
  playerTurn,
  onSubmit,
}) {
  console.log(playerName, playerTurn);
  const turn = playerTurn === playerName ? true : false;
  return (
    <div className="w-80 flex justify-center items-center flex-col">
      <Label name={playerName} />
      <div className="ml-10 text-3xl my-2 text-left self-start text-gray-400">
        {currentPoint}
      </div>
      <InputField
        inputValue={playerText}
        onChange={onChangeInputField}
        playerPreviousText={playerPreviousText}
        placeHolderValue={placeHolderValue}
        playerTurn={turn}
        onSubmit={onSubmit}
      />
      <HistorySection wordHistoryArray={wordHistoryArray} />
    </div>
  );
}
