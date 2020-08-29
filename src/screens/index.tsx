import React, { FC, useEffect, useState } from "react";
import { apiData } from "../data";
import { VideoPlayer } from "../comps/videoPlayer";
import { styles } from "./styles";

const Home: FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (data.length === 0) {
      setData(apiData.slice(0, 3));
    }
    window.addEventListener("scroll", handleDataFetch);
  }, [data.length]);

  const handleDataFetch = () => {
    const rec = document
      .getElementById("main-container")
      ?.getBoundingClientRect();
    if (
      window.pageYOffset + window.innerHeight >=
      Math.abs(rec?.height ?? -1) - 20
    ) {
      setData((prev: any[]) => [
        ...prev,
        ...apiData.slice(prev.length, prev.length + 3),
      ]);
    }
  };

  return (
    <div style={styles.container} id="main-container">
      {data.map((item: any, index: number) => {
        return (
          <VideoPlayer
            url={item.video.originalUrl}
            id={item.id}
            idnext={data[index + 1]?.id ?? item.id}
            idprev={data[index - 1]?.id ?? item.id}
            userName={item?.channel?.user?.name ?? ""}
            title={item?.channel?.title ?? ""}
            views={item?.meta?.viewCount ?? 0}
          />
        );
      })}
    </div>
  );
};

export { Home };
