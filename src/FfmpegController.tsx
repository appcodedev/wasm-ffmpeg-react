import React from "react";
import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";

type Props = {
  videoFileName: string;
  setAudioSourceUrl: (sourceUrl: string) => void;
};

export const FfmpegController: React.FC<Props> = ({
  videoFileName,
  setAudioSourceUrl,
}) => {
  const ffmpeg = createFFmpeg({ log: true });

  const transcodeToAudio = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS("writeFile", videoFileName, await fetchFile(videoFileName));
    await ffmpeg.run(
      "-i",
      videoFileName,
      "-vn",
      "-acodec",
      "copy",
      "audio-track.m4a"
    );

    const data = ffmpeg.FS("readFile", "audio-track.m4a");

    const audioSourceUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "audio/mp4" })
    );
    setAudioSourceUrl(audioSourceUrl);
  };

  const convertToGif = async () => {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS("writeFile", videoFileName, await fetchFile(videoFileName));
    await ffmpeg.run(
      "-ss",
      "30",
      "-t",
      "10",
      "-i",
      videoFileName,
      "-f",
      "gif",
      "sample.gif"
    );

    const data = ffmpeg.FS("readFile", "sample.gif");
    const gifUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/gif" })
    );
    const image = document.getElementById("image") as HTMLImageElement;
    image.src = gifUrl;
  };

  return (
    <div>
      <button name="transcode" onClick={transcodeToAudio}>
        Transcode to Audio
      </button>
      <button name="convert-to-gif" onClick={convertToGif}>
        Convert to gif
      </button>
    </div>
  );
};
