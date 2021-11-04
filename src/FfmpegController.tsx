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

  const transCodeVideo = async () => {
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

  return (
    <button name="transcode" onClick={transCodeVideo}>
      Transcode to Audio
    </button>
  );
};
