import React, { FC, useEffect, createRef, useRef, useState } from "react";
import { apiData } from "../data";
import { VideoPlayer } from "../comps/videoPlayer";
import { styles } from "./styles";

const Home: FC = () => {
  return (
    <div style={styles.container}>
      {apiData.map((item, index: number) => {
        return (
          <VideoPlayer
            url={item.video.originalUrl}
            id={item.id}
            poster={item.video.coverImageUrl}
            idnext={apiData[index + 1]?.id ?? item.id}
            idprev={apiData[index - 1]?.id ?? item.id}
          />
        );
      })}
      <div id="main">hi</div>
    </div>
  );
};

export { Home };
