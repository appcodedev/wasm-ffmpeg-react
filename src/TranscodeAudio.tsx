import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

type Props = {
  videoFileName: string;
  setAudioSourceUrl: (sourceUrl: string) => void;
};

export const TranscodeAudio: React.FC<Props> = ({
  videoFileName,
  setAudioSourceUrl,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const ffmpeg = createFFmpeg({ log: true });

  const transcodeToAudio = async () => {
    setIsDisabled(true);
    setAudioSourceUrl("");
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
    setIsDisabled(false);
  };

  return (
    <>
      <button
        style={{ width: "20%" }}
        onClick={transcodeToAudio}
        disabled={isDisabled}
      >
        {isDisabled ? <>⏳ Converting... </> : <>🎵 Transcode to Audio</>}
      </button>
    </>
  );
};
