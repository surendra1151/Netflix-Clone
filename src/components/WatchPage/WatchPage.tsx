import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router";

import Player from "video.js/dist/types/player";
import { Box, Text, Stack, IconButton, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";
import { MdOutlineBrandingWatermark, MdFullscreen } from "react-icons/md";
import { MdPause, MdForward10, MdPlayArrow, MdReplay10 } from "react-icons/md";

import useWindowSize from "src/hooks/useWindowSize";
import { formatTime } from "src/utils/common";
import VolumeControllers from "./VolumeControllers";
import VideoJSPlayer from "./VideoJSPlayer";
import PlayerSeekbar from "./PlayerSeekbar";

const WatchPage = () => {
  const playerRef = useRef<Player | null>(null);
  const [playerState, setPlayerState] = useState({
    paused: false,
    muted: false,
    playedSeconds: 0,
    duration: 0,
    volume: 0.8,
    loaded: 0,
  });

  const navigate = useNavigate();
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const windowSize = useWindowSize();
  const videoJsOptions = useMemo(() => {
    return {
      preload: "metadata",
      autoplay: true,
      controls: false,

      width: windowSize.width,
      height: windowSize.height,
      sources: [
        {
          src: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          type: "application/x-mpegurl",
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handlePlayerReady = function (player: Player): void {
    player.on("pause", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: true };
      });
    });

    player.on("play", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: false };
      });
    });

    player.on("timeupdate", () => {
      setPlayerState((draft) => {
        return { ...draft, playedSeconds: player.currentTime() };
      });
    });

    player.one("durationchange", () => {
      setPlayerInitialized(true);
      setPlayerState((draft) => ({ ...draft, duration: player.duration() }));
    });

    playerRef.current = player;

    setPlayerState((draft) => {
      return { ...draft, paused: player.paused() };
    });
  };

  const handleVolumeChange = (value: any) => {
    playerRef.current?.volume(value / 100);
    setPlayerState((draft) => {
      return { ...draft, volume: value / 100 };
    });
  };

  const handleSeekTo = (v: number) => {
    playerRef.current?.currentTime(v);
  };

  const handleGoBack = () => {
    navigate("/browse");
  };

  if (!!videoJsOptions.width) {
    return (
      <Box position="relative">
        <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />
      </Box>
    );
  }
  return null;
};

export default WatchPage;
