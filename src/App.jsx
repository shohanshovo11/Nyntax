import { useState } from "react";
import SinglePlayerSide from "./components/SinglePlayerSide";
import axios from "axios";

export default function App() {
  const [playerOneHistoryArray, setPlayerOneHistoryArray] = useState([]);
  const [playerOneText, setPlayerOneText] = useState("Hello");
  const [playerOnePoint, setPlayerOnePoint] = useState(150);
  const [playerOneName, setPlayerOneName] = useState("Shovo");
  const [playerOneTimer, setPlayerOneTimer] = useState(5);
  const [playerOnePlaceholder, setPlayerOnePlaceholder] = useState("");

  const [playerTwoHistoryArray, setPlayerTwoHistoryArray] = useState([]);
  const [playerTwoText, setPlayerTwoText] = useState("");
  const [playerTwoPoint, setPlayerTwoPoint] = useState(150);
  const [playerTwoName, setPlayerTwoName] = useState("Shovos");
  const [playerTwoTimer, setPlayerTwoTimer] = useState(5);
  const [playerTwoPlaceholder, setPlayerTwoPlaceholder] = useState("");

  const [playerTurn, setPlayerTurn] = useState(playerOneName);

  const handlePlayerOneInput = (e) => {
    setPlayerOneText(e.target.value);
  };

  const handlePlayerTwoInput = (e) => {
    setPlayerTwoText(e.target.value);
  };

  const handlePlayerOneSubmit = async () => {
    try {
      const response = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${playerOneText}`
      );
      if (response.status === 200) {
        setPlayerOneHistoryArray([
          ...playerOneHistoryArray,
          { value: playerOneText },
        ]);
        setPlayerOnePlaceholder("");
        setPlayerTwoPlaceholder(playerOneText[playerOneText.length - 1]);
        setPlayerOneText("");
        setPlayerOnePoint(playerOnePoint - 10);
        setPlayerTurn(playerTwoName);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Word not found in dictionary.");
      } else {
        console.log("Error: ", error);
      }
    }
  };

  const handlePlayerTwoSubmit = async () => {
    try {
      const response = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${playerTwoText}`
      );
      if (response.status === 200) {
        setPlayerTwoHistoryArray([
          ...playerTwoHistoryArray,
          { value: playerTwoText },
        ]);
        setPlayerTwoPlaceholder("");
        setPlayerTwoPlaceholder(playerTwoText[playerTwoText.length - 1]);
        setPlayerTwoText("");
        setPlayerTwoPoint(playerTwoPoint - 10);
        setPlayerTurn(playerOneName);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Word not found in dictionary.");
      } else {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex">
        {/* Player 1 */}
        <SinglePlayerSide
          wordHistoryArray={playerOneHistoryArray}
          playerName={playerOneName}
          playerText={playerOneText}
          playerPreviousText={
            playerOneHistoryArray.length > 0
              ? playerOneHistoryArray[playerOneHistoryArray.length - 1]
              : null
          }
          currentPoint={playerOnePoint}
          onChangeInputField={handlePlayerOneInput}
          placeHolderValue={playerOnePlaceholder}
          playerTurn={playerTurn}
          onSubmit={handlePlayerOneSubmit}
        />
        {/* Player 2 */}
        <SinglePlayerSide
          wordHistoryArray={playerTwoHistoryArray}
          playerName={playerTwoName}
          playerText={playerTwoText}
          playerPreviousText={
            playerTwoHistoryArray.length > 0
              ? playerTwoHistoryArray[playerTwoHistoryArray.length - 1]
              : null
          }
          currentPoint={playerTwoPoint}
          onChangeInputField={handlePlayerTwoInput}
          placeHolderValue={playerTwoPlaceholder}
          playerTurn={playerTurn}
          onSubmit={handlePlayerTwoSubmit}
        />
      </div>
    </div>
  );
}
