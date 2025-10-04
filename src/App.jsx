import { useState, useEffect } from "react";
import SinglePlayerSide from "./components/SinglePlayerSide";
import axios from "axios";
import { useRef } from "react";

export default function App() {
  const [playerOneHistoryArray, setPlayerOneHistoryArray] = useState([]);
  const [playerOneText, setPlayerOneText] = useState("");
  const [playerOnePoint, setPlayerOnePoint] = useState(150);
  const [playerOneName, setPlayerOneName] = useState("Player 1");
  const [playerOneTimer, setPlayerOneTimer] = useState(5);

  const [playerTwoHistoryArray, setPlayerTwoHistoryArray] = useState([]);
  const [playerTwoText, setPlayerTwoText] = useState("");
  const [playerTwoPoint, setPlayerTwoPoint] = useState(150);
  const [playerTwoName, setPlayerTwoName] = useState("Player 2");
  const [playerTwoTimer, setPlayerTwoTimer] = useState(5);

  // Single placeholder state
  const getRandomCharacter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
  };
  const [placeholder, setPlaceholder] = useState(getRandomCharacter());

  const [playerTurn, setPlayerTurn] = useState(playerOneName);
  const [timer, setTimer] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const PlayerOneRef = useRef(null);
  const PlayerTwoRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;

    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      if (playerTurn === playerOneName) {
        setPlayerOneHistoryArray((prev) => [...prev, { value: "Pass" }]);
        setPlayerOneText(""); // Clear Player 1's input text
        setPlayerTurn(playerTwoName);
        setTimeout(() => {
          PlayerTwoRef.current?.focus();
        }, 50);
      } else {
        setPlayerTwoHistoryArray((prev) => [...prev, { value: "Pass" }]);
        setPlayerTwoText("");
        setPlayerTurn(playerOneName);
        setTimeout(() => {
          PlayerOneRef.current?.focus();
        }, 50);
      }
      setTimer(15);
    }
  }, [timer, playerTurn, playerOneName, playerTwoName, gameOver]);

  const calculatePoints = (wordLength, currentTimer) => {
    if (wordLength >= 8) {
      return currentTimer > 5 ? 13 : 10;
    } else {
      return 8;
    }
  };

  const checkGameOver = (playerOnePoints, playerTwoPoints) => {
    if (playerOnePoints <= 0) {
      setGameOver(true);
      setWinner(playerTwoName);
      return true;
    } else if (playerTwoPoints <= 0) {
      setGameOver(true);
      setWinner(playerOneName);
      return true;
    }
    return false;
  };

  const checkDuplicateWord = (word) => {
    const allUsedWords = [
      ...playerOneHistoryArray.map((item) => item.value.toLowerCase()),
      ...playerTwoHistoryArray.map((item) => item.value.toLowerCase()),
    ];
    return allUsedWords.includes(word.toLowerCase());
  };

  const restartGame = () => {
    setPlayerOneHistoryArray([]);
    setPlayerOneText("");
    setPlayerOnePoint(150);
    setPlayerTwoHistoryArray([]);
    setPlayerTwoText("");
    setPlayerTwoPoint(150);
    setPlayerTurn(playerOneName);
    setTimer(15);
    setGameOver(false);
    setWinner("");
    setPlaceholder(getRandomCharacter());
  };

  const handlePlayerOneInput = (e) => {
    setPlayerOneText(e.target.value);
  };

  const handlePlayerTwoInput = (e) => {
    setPlayerTwoText(e.target.value);
  };

  const handlePlayerOneSubmit = async () => {
    // Check if word is at least 4 characters long
    if (playerOneText.length < 4) {
      alert("Word must be at least 4 characters long!");
      return;
    }

    // Check if word has already been used
    if (checkDuplicateWord(playerOneText)) {
      alert("This word has already been used! Try a different word.");
      return;
    }

    try {
      const response = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${playerOneText}`
      );
      if (response.status === 200) {
        setPlayerOneHistoryArray([
          ...playerOneHistoryArray,
          { value: playerOneText },
        ]);
        setPlaceholder(playerOneText[playerOneText.length - 1]);
        setPlayerOneText("");
        const pointsToReduce = calculatePoints(playerOneText.length, timer);
        const newPlayerOnePoints = playerOnePoint - pointsToReduce;
        setPlayerOnePoint(newPlayerOnePoints);

        if (checkGameOver(newPlayerOnePoints, playerTwoPoint)) {
          return;
        }

        setPlayerTurn(playerTwoName);
        setTimer(15);
        setTimeout(() => {
          PlayerTwoRef.current?.focus();
        }, 50);
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
    if (playerTwoText.length < 4) {
      alert("Word must be at least 4 characters long!");
      return;
    }

    if (checkDuplicateWord(playerTwoText)) {
      alert("This word has already been used! Try a different word.");
      return;
    }

    try {
      const response = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${playerTwoText}`
      );
      if (response.status === 200) {
        setPlayerTwoHistoryArray([
          ...playerTwoHistoryArray,
          { value: playerTwoText },
        ]);
        setPlaceholder(playerTwoText[playerTwoText.length - 1]);
        setPlayerTwoText("");
        const pointsToReduce = calculatePoints(playerTwoText.length, timer);
        const newPlayerTwoPoints = playerTwoPoint - pointsToReduce;
        setPlayerTwoPoint(newPlayerTwoPoints);

        if (checkGameOver(playerOnePoint, newPlayerTwoPoints)) {
          return;
        }

        setPlayerTurn(playerOneName);
        setTimer(15);
        setTimeout(() => {
          PlayerOneRef.current?.focus();
        }, 50);
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
      {gameOver ? (
        // Game Over Screen
        <div className="text-center">
          <h1 className="text-6xl font-bold text-green-500 mb-8">
            {winner} Wins!
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Game Over! Click below to start a new game.
          </p>
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition duration-300"
          >
            Start New Game
          </button>
        </div>
      ) : (
        // Game Screen
        <div className="flex">
          {/* Player 1 */}
          <SinglePlayerSide
            wordHistoryArray={playerOneHistoryArray}
            playerName={playerOneName}
            playerText={playerOneText}
            currentPoint={playerOnePoint}
            onChangeInputField={handlePlayerOneInput}
            placeHolderValue={placeholder}
            playerTurn={playerTurn}
            onSubmit={handlePlayerOneSubmit}
            PlayerRef={PlayerOneRef}
            timer={timer}
          />
          {/* Player 2 */}
          <SinglePlayerSide
            wordHistoryArray={playerTwoHistoryArray}
            playerName={playerTwoName}
            playerText={playerTwoText}
            currentPoint={playerTwoPoint}
            onChangeInputField={handlePlayerTwoInput}
            placeHolderValue={placeholder}
            playerTurn={playerTurn}
            onSubmit={handlePlayerTwoSubmit}
            PlayerRef={PlayerTwoRef}
            timer={timer}
          />
        </div>
      )}
    </div>
  );
}
