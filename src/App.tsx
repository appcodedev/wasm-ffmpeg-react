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
        <h2>FFMPEG.WASM demo</h2>
        <h3>Features: </h3>
        <p>Transcode from video to audio </p>
        <p>Generate sample gif from video</p>
      </div>

      <div className="converter-container">
        <video
          style={{ width: "40%" }}
          id="video-player"
          controls
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        >
          Sorry, your browser doesn't support embedded videos, but don't worry,
          you can{" "}
          <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
          and watch it with your favorite video player!
        </video>
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
          src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
        >
          Sorry, your browser doesn't support embedded videos, but don't worry,
          you can{" "}
          <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
          and watch it with your favorite video player!
        </video>

        <CovertToGif
          videoFileName="sample-video.mp4"
          setImageSourceUrl={handleSetImageSourceUrl}
        />
        <img
          ref={imageRef}
          alt="Gif placeholder"
          style={{ width: "30%", backgroundColor: "red" }}
          id="image"
          src="https://via.placeholder.com/280x160.png/4f4d4d/00d5fe/?text=ffmpeg.wasm demo"
        />
      </div>
    </div>
  );
}

export default App;
