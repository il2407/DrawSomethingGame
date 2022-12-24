import { Card } from "@mui/material";
import { getGameData } from "../../utils/gameDataRequest";
import { getSession } from "../../utils/EndGameRequest";
import { useEffect, useState } from "react";
const BASE_URL = process.env.REACT_APP_API_KEY;

function CurrScore() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isHighScore, setIsHighScore] = useState(false);

  const FetchCurrentScore = async () => {
    //Get the score and time
    const { data:curr } = await getGameData(BASE_URL + "/game-data");
    const { data:best } = await getSession(BASE_URL + "/sessions");

    setScore(curr.gameDatas[0].score);
    setHighScore(best.sessions[0].score);

    if(curr.gameDatas[0].score > best.sessions[0].score)
    setIsHighScore(true)
  };


  useEffect(() => {
    FetchCurrentScore();
  }, []);

  return (
    <>
      <Card className="cont">
        <>Your Score is : {score}</>
        <br></br>
        {!isHighScore ?(
        <>You are : {highScore-score} from the best score ,Keep going! </>)
        :(<>You have the best score ever! Congratulations   !</>)}
      </Card>
      <br></br>
    </>
  );
}

export default CurrScore;