import { useState } from "react";
import SinglePlayerSide from "./components/SinglePlayerSide";
import axios from "axios";
import { useRef } from "react";

export default function App() {
  const [playerOneHistoryArray, setPlayerOneHistoryArray] = useState([]);
  const [playerOneText, setPlayerOneText] = useState("");
  const [playerOnePoint, setPlayerOnePoint] = useState(150);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerOneTimer, setPlayerOneTimer] = useState(5);
  const [playerOnePlaceholder, setPlayerOnePlaceholder] = useState("");

  const [playerTwoHistoryArray, setPlayerTwoHistoryArray] = useState([]);
  const [playerTwoText, setPlayerTwoText] = useState("");
  const [playerTwoPoint, setPlayerTwoPoint] = useState(150);
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  const [playerTwoTimer, setPlayerTwoTimer] = useState(5);
  const [playerTwoPlaceholder, setPlayerTwoPlaceholder] = useState("");

  const [playerTurn, setPlayerTurn] = useState(playerOneName);

  const PlayerOneRef = useRef(null);
  const PlayerTwoRef = useRef(null);

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
        console.log(PlayerTwoRef, "reff");
        PlayerTwoRef.current.focus();
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
        setPlayerOnePlaceholder(playerTwoText[playerTwoText.length - 1]);
        setPlayerTwoText("");
        setPlayerTwoPoint(playerTwoPoint - 10);
        setPlayerTurn(playerOneName);
        console.log(PlayerOneRef, "reff");
        PlayerOneRef.current.focus();
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
          PlayerRef={PlayerOneRef}
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
          PlayerRef={PlayerTwoRef}
        />
      </div>
    </div>
  );
}
