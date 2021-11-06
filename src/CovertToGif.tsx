import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

type Props = {
  videoFileName: string;
  setImageSourceUrl: (sourceUrl: string) => void;
};

export const CovertToGif: React.FC<Props> = ({
  videoFileName,
  setImageSourceUrl,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const ffmpeg = createFFmpeg({ log: true });

  const convertToGif = async () => {
    setIsDisabled(true);
    setImageSourceUrl(
      "https://via.placeholder.com/280x160.png/4f4d4d/00d5fe/?text=ffmpeg.wasm demo"
    );

    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    ffmpeg.FS("writeFile", videoFileName, await fetchFile(videoFileName));
    await ffmpeg.run(
      "-ss",
      "60",
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
    setImageSourceUrl(gifUrl);
    setIsDisabled(false);
  };

  return (
    <>
      <button
        style={{ width: "20%" }}
        onClick={convertToGif}
        disabled={isDisabled}
      >
        {isDisabled ? <>⏳ Converting... </> : <>🎵 📸 Convert to gif</>}
      </button>
    </>
  );
};
