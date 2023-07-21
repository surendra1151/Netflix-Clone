import { useEffect, useRef } from "react";

import Player from "video.js/dist/types/player";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

export default function VideoJSPlayer({
  options,
  onReady,
}: {
  options: any;
  onReady: (player: Player) => void;
}) {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef?.current?.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // useEffect(() => {
  //   (async function handleVideojs() {
  //     if (!playerRef.current) {
  //       const videoElement = document.createElement("video-js");
  //       videoRef.current?.appendChild(videoElement);
  //       const player = (playerRef.current = videojs(
  //         videoElement,
  //         options,
  //         () => {
  //           onReady && onReady(player);
  //         }
  //       ));
  //     } else {
  //       const player = playerRef.current;
  //           // Check if the player is playing
  //           if (!player.paused()) {
  //               // Pause the player
  //               await player.pause();

  //               // Then change width and height
  //               player.width(options.width);
  //               player.height(options.height);
                
  //               // Then play it again if needed
  //               player.play();
  //           } else {
  //               // If it's not playing, just change width and height
  //               player.width(options.width);
  //               player.height(options.height);
  //           }
  //     }
  //   })();
  // }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
