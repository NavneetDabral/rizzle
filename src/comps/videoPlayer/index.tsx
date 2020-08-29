import React, { FC, useEffect, useState } from "react";
import { styles } from "./styles";

interface PlayerProps {
  url: string;
  id: string;
  idnext: string;
  idprev: string;
  userName: string;
  views: number;
  title: string;
}

const isInViewport = function (id: string) {
  const bounding = document.getElementById(id)?.getBoundingClientRect();
  if (bounding) {
    return (
      bounding.top >= -20 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) + 20 &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  return false;
};

const VideoPlayer: FC<PlayerProps> = ({
  url,
  id,
  idnext,
  idprev,
  userName,
  views,
  title,
}: PlayerProps) => {
  const [play, setPlay] = useState(false);
  const [dir, setDir] = useState("");
  const [posLeft, setPos] = useState("100%");
  const [textColor, setColor] = useState("#E0E0E0");

  let xDown: any = null;
  let yDown: any = null;

  const handleTouchStart = (evt: any) => {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt: any) => {
    evt.preventDefault();

    if (!xDown || !yDown) {
      return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        setDir("left");
        setPos("0%");
      } else {
        setDir("right");
        setPos("100%");
      }
    } else {
      if (yDiff > 0) {
        setDir("up");
      } else {
        setDir("down");
      }
    }
    xDown = null;
    yDown = null;
  };

  const handleTouchEnd = (evt: any) => {
    switch (dir) {
      case "left":
        setPos("0%");
        setColor("#000000");
        setPlay(false);
        document.body.style.overflowY = "hidden";
        break;
      case "right":
        setPos("100%");
        setPlay(true);
        setColor("#E0E0E0");
        document.body.style.overflowY = "scroll";
        break;

      case "up":
        const next = document.getElementById(idnext)?.getBoundingClientRect();
        if (next && posLeft === "100%") {
          window.scrollTo({
            top: next.y + window.pageYOffset,
            behavior: "smooth",
          });
        }

        break;

      case "down":
        const prev = document.getElementById(idprev)?.getBoundingClientRect();
        if (prev && posLeft === "100%") {
          window.scrollTo({
            top: prev.y + window.pageYOffset,
            behavior: "smooth",
          });
        }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handlePlay);
    window.addEventListener("load", handlePlay);
  });

  const handlePlay = (e: any) => {
    setPlay(isInViewport(id + "video"));
  };

  if (!play) {
    let v = document.getElementById(id + "video");
    if (v) (v as HTMLVideoElement).pause();
  } else {
    let v = document.getElementById(id + "video");
    if (v) (v as HTMLVideoElement).play();
  }

  return (
    <div id={id} style={styles.parentContainer}>
      <video
        id={id + "video"}
        style={styles.container}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        autoPlay={play}
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/ogg" />
        Your browser does not support HTML video.
      </video>
      <div
        style={{ ...styles.nameBlock, ...{ left: posLeft } }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {userName}
      </div>
      <div style={{ ...styles.user, ...{ color: textColor } }}>
        &#9924; {userName}
      </div>
      <div style={{ ...styles.views, ...{ color: textColor } }}>
        &#128064; {views}
      </div>
      <div style={{ ...styles.title, ...{ color: textColor } }}>
        &#127909; {title}
      </div>
    </div>
  );
};

export { VideoPlayer };
