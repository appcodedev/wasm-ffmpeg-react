import { useRef } from "react";
import { CovertToGif } from "./CovertToGif";
import { TranscodeAudio } from "./TranscodeAudio";

import "./App.css";

function App() {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSetAudioSourceUrl = (sourceUrl: string) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.src = sourceUrl;
    }
  };

  const handleSetImageSourceUrl = (sourceUrl: string) => {
    if (imageRef.current) {
      imageRef.current.src = sourceUrl;
    }
  };

  return (
    <div className="App">
      <div>
        <h2>ffmpeg.wasm demo</h2>
        <h3>Features: </h3>
        <p>Transcode from video to audio </p>
        <p>Generate sample gif from video</p>
      </div>

      <div className="converter-container stripe">
        <video
          style={{ width: "40%" }}
          id="video-player"
          controls
          src="http://localhost:3000/sample-video.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        ></video>
        <TranscodeAudio
          videoFileName="sample-video.mp4"
          setAudioSourceUrl={handleSetAudioSourceUrl}
        />
        <audio
          style={{ width: "30%" }}
          ref={audioPlayerRef}
          id="audio-player"
          controls
        ></audio>
      </div>
      <div className="converter-container">
        <video
          style={{ width: "40%" }}
          id="video-player"
          controls
          src="http://localhost:3000/sample-video.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        ></video>

        <CovertToGif
          videoFileName="sample-video.mp4"
          setImageSourceUrl={handleSetImageSourceUrl}
        />
        <img
          ref={imageRef}
          alt="Gif placeholder"
          style={{ width: "30%", backgroundColor: "red" }}
          id="image"
          src="https://via.placeholder.com/280x160.png/4b4b4b/00d5fe/?text=ffmpeg.wasm demo"
        />
      </div>
      <div className="converter-container stripe">
        <a
          href="https://github.com/ffmpegwasm/ffmpeg.wasm"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          Official ffmpeg.wasm Github
        </a>
      </div>
    </div>
  );
}

export default App;
