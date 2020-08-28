import React, { FC, useRef, useEffect, useState } from "react";
import { styles } from "./styles";

interface PlayerProps {
  url: string;
  id: string;
  idnext: string;
  idprev: string;
  poster: string;
}

const isInViewport = function (id: string) {
  const bounding = document.getElementById(id)?.getBoundingClientRect();
  if (bounding) {
    return (
      bounding.top >= -20 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) +
          20 /* or $(window).height() */ &&
      bounding.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth) /* or $(window).width() */
    );
  }
  return false;
};

const VideoPlayer: FC<PlayerProps> = ({
  url,
  id,
  idnext,
  idprev,
  poster,
}: PlayerProps) => {
  const [play, setPlay] = useState(false);
  let xDown: any = null;
  let yDown: any = null;

  function handleTouchStart(evt: any) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt: any) {
    if (!xDown || !yDown) {
      return;
    }
    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;
    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        console.log("left");
      } else {
        console.log("right");
      }
    } else {
      if (yDiff > 0) {
        console.log(idnext);
        const next = document.getElementById(idnext)?.getBoundingClientRect();
        if (next) {
          window.scrollTo({
            top: next.y + window.pageYOffset,
            behavior: "smooth",
          });
        }
      } else {
        const prev = document.getElementById(idprev)?.getBoundingClientRect();
        if (prev) {
          window.scrollTo({
            top: prev.y + window.pageYOffset,
            behavior: "smooth",
          });
        }
      }
    }
    xDown = null;
    yDown = null;
  }

  useEffect(() => {
    window.addEventListener("scroll", handlePlay);
    window.addEventListener("load", handlePlay);
  });

  const handlePlay = () => {
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
        poster={poster}
        id={id + "video"}
        style={styles.container}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        autoPlay={play}
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/ogg" />
        Your browser does not support HTML video.
      </video>
      <div style={styles.user}>'Adi'</div>
      <div style={styles.views}>'view: 344444'</div>
      <div style={styles.title}>'title: Me, Myself and I'</div>
    </div>
  );
};

export { VideoPlayer };
