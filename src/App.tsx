import React, { useEffect, useRef } from "react";
import "./App.css";
import { FfmpegController } from "./FfmpegController";

function App() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  const handleSetAudioSourceUrl = (sourceUrl: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = sourceUrl;
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <FfmpegController
          videoFileName="sample-video.mp4"
          setAudioSourceUrl={handleSetAudioSourceUrl}
        />
        <div className="video-container">
          <video
            id="video-player"
            controls
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            width="620"
          >
            Sorry, your browser doesn't support embedded videos, but don't
            worry, you can{" "}
            <a href="https://archive.org/details/BigBuckBunny_124">
              download it
            </a>
            and watch it with your favorite video player!
          </video>
          <audio ref={audioPlayerRef} id="audio-player" controls></audio>
        </div>
      </div>
    </div>
  );
}

export default App;
