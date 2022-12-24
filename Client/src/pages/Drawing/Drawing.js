import React from "react";
import { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { GithubPicker } from "react-color";
import { useClickAway } from "../../utils/useClickAway";
import io from "socket.io-client";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { colors, defaultProps } from "./DrawingUtils";
import "../style.css";

import { Button, Input, ButtonGroup, Box } from "@mui/material";
import { getGameData, updateGameData } from "../../utils/gameDataRequest";

const BASE_URL = process.env.REACT_APP_API_KEY;
const socket = io.connect(BASE_URL);

const width = `${Math.ceil(colors.length / 2) * 32}px`;

export default function Drawing() {
  let navigate = useNavigate();
  const canvasRef = React.createRef(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [showColor, setShowColor] = useState(false);
  const [saveData, setSaveData] = useState("a");
  const [word, setWord] = useState("");

  const getImg = () =>
    canvasRef.current.canvasContainer.children[1].toDataURL();

  const paletteRef = useClickAway(() => {
    setShowColor(false);
  });

  const handleClear = () => {
    canvasRef.current.clear();
    setSaveData("a");
  };

  const handleCanvasChange = () => {
    const saveData = getImg();
    setSaveData(saveData);
    sendMessage();
  };

  const handleOnClick = () => {
    sendMessage();
    window.sessionStorage.removeItem("player1");
    setSaveData("");
  };

  const handleOnTextClick = async (event) => {
    const { data } = await getGameData(BASE_URL + "/game-data");

    if (word === data.gameDatas[0].word) {
      sessionStorage.setItem("player1", true);
      var score = data.gameDatas[0].score;
      var scoreSum = score + data.gameDatas[0].points;
      await updateGameData(
        BASE_URL + "/game-data/gameData",
        data.gameDatas[0].word,
        data.gameDatas[0].points,
        data.gameDatas[0].time,
        scoreSum
      );
      alert("Correct Word! ");
      navigate("/WordChoosing");
    } else alert("Wrong Word! Keep Trying");
  };

  const props = {
    ...defaultProps,
    className: classNames("canvas"),
    onChange: handleCanvasChange,
    ref: canvasRef,
    brushColor,
    catenaryColor: brushColor,
  };

  const sendMessage = () => {
    socket.emit("send_draw", { draw: saveData });
  };

  useEffect(() => {
    socket.on("receive_draw", (data) => {
      setSaveData(data.draw);
    });
  }, [socket]);

  return (
    <Box>
      {/* Whenever a draw data inserted by the other player 
      the waiting view trigered to change the guessing view */}
      {saveData ? (
        <Box>
          {/* A query which manages the turns between the main and secondary player
              to see the drawing/guessing view (Accordingly) */}
          {sessionStorage.getItem("player1") ? (
            <div className="draw">
              {/* Draw board  */}
              <Box className="boxWrap">
                <CanvasDraw {...props} />
                <Box class>
                  {/* Buttons group */}
                  <div ref={paletteRef} className="picker-container">
                    <Box className="boxWrap">
                      <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        color="success"
                      >
                        {/* Color picking button */}
                        <Button
                          onClick={() => {
                            setShowColor((s) => !s);
                          }}
                        >
                          <span role="img" aria-label="">
                            🎨
                          </span>{" "}
                          color
                        </Button>
                        {/* Undo button */}
                        <Button
                          onClick={() => {
                            canvasRef.current.undo();
                          }}
                        >
                          <span role="img" aria-label="">
                            ↩️
                          </span>{" "}
                          undo
                        </Button>
                      </ButtonGroup>
                    </Box>
                    <Box>
                      <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        color="success"
                      >
                        {/* Clear button */}
                        <Button onClick={handleClear}>
                          <span role="img" aria-label="">
                            💣
                          </span>{" "}
                          clear
                        </Button>
                        {/* Send button */}
                        <Button onClick={handleOnClick}>
                          <span role="img" aria-label="">
                            🚀
                          </span>{" "}
                          Send
                        </Button>
                      </ButtonGroup>
                    </Box>

                    {showColor && (
                      <div className="picker-popper">
                        <GithubPicker
                          triangle={"hide"}
                          color={brushColor}
                          colors={colors}
                          width={width}
                          onChangeComplete={(c) => setBrushColor(c.hex)}
                        />
                      </div>
                    )}
                  </div>
                </Box>
              </Box>
            </div>
          ) : (
            <>
              {/* Word guessing view */}
              <h1>Guess the word!</h1>
              <img src={saveData} alt="" />
              <Input
                type="text"
                placeholder="Guess the word"
                onInput={(e) => setWord(e.target.value)}
              />
              <Button onClick={handleOnTextClick}>This Is My Guess</Button>
            </>
          )}
        </Box>
      ) : (
        <Box>
          {/* Waiting view */}
          <br></br>
          <br></br>
          <br></br>
          <span class="toto">
            <span>
              <h3>Wait for your friend to guess and draw</h3>
            </span>{" "}
          </span>
        </Box>
      )}
    </Box>
  );
}
