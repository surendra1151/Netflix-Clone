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
        {/* <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} /> */}
        {/* {playerRef.current && playerInitialized && ( */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            w="full"
            h="full"
          >
            <Box px={2} position="absolute" top="60px" left="10px">
              <IconButton
                aria-label="back-icon"
                background="transparent"
                _hover={{
                  background: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleGoBack()}
                icon={
                  <ArrowBackIcon color="white" width="44px" height="44px" />
                }
              />
            </Box>
            <Box
              px={{ base: 1, sm: 2 }}
              position="absolute"
              bottom="20px"
              left={0}
              right={0}
            >
              {/* Seekbar */}
              <Stack direction="row" alignItems="center" spacing={1} py="13px">
                <PlayerSeekbar
                  playedSeconds={playerState.playedSeconds}
                  duration={playerState.duration}
                  seekTo={handleSeekTo}
                />
              </Stack>
              {/* end Seekbar */}
              {/* Controller */}
              <Flex justifyContent="space-between" alignItems="center">
                {/* left controller */}
                <Stack
                  direction="row"
                  spacing={{ base: 1, sm: 3, md: 4 }}
                  alignItems="center"
                >
                  {!playerState.paused ? (
                    <IconButton
                      aria-label="pause-icon"
                      background="transparent"
                      _hover={{
                        background: "none",
                      }}
                      onClick={() => playerRef.current?.pause()}
                      icon={<MdPause size="44px" color="white" />}
                    />
                  ) : (
                    <IconButton
                      aria-label="play-icon"
                      background="transparent"
                      _hover={{
                        background: "none",
                      }}
                      onClick={() => playerRef.current?.play()}
                      icon={<MdPlayArrow size="44px" color="white" />}
                    />
                  )}
                  <IconButton
                    background="transparent"
                    _hover={{
                      background: "none",
                    }}
                    aria-label="forward-icon"
                    icon={<MdForward10 size="44px" color="white" />}
                  />
                  <IconButton
                    background="transparent"
                    _hover={{
                      background: "none",
                    }}
                    aria-label="replay-icon"
                    icon={<MdReplay10 size="44px" color="white" />}
                  />
                  <VolumeControllers
                    muted={playerState.muted}
                    handleVolumeToggle={() => {
                      playerRef.current?.muted(!playerState.muted);
                      setPlayerState((draft) => {
                        return { ...draft, muted: !draft.muted };
                      });
                    }}
                    value={playerState.volume}
                    handleVolume={handleVolumeChange}
                  />
                  <Text fontSize="xs" color="white">
                    {`${formatTime(playerState.playedSeconds)} / ${formatTime(
                      playerState.duration
                    )}`}
                  </Text>
                </Stack>
                {/* end left controller */}
                {/* middle time */}
                <Flex alignItems="center">
                  <Text
                    noOfLines={1}
                    fontSize="20px"
                    textAlign="center"
                    color="white"
                    maxWidth="300px"
                  >
                    Title - Description
                  </Text>
                </Flex>
                {/* end middle time */}
                {/* right controller */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ base: 1, sm: 3, md: 4 }}
                >
                  <IconButton
                    aria-label="settings-icon"
                    background="transparent"
                    _hover={{
                      background: "none",
                    }}
                    color="white"
                    icon={<SettingsIcon boxSize="40px" />}
                  />
                  <IconButton
                    aria-label="view-icon"
                    background="transparent"
                    _hover={{
                      background: "none",
                    }}
                    icon={
                      <MdOutlineBrandingWatermark size="44px" color="white" />
                    }
                  />
                  <IconButton
                    aria-label="view-icon"
                    background="transparent"
                    _hover={{
                      background: "none",
                    }}
                    icon={<MdFullscreen size="44px" color="white" />}
                  />
                </Stack>
                {/* end right controller */}
              </Flex>
              {/* end Controller */}
            </Box>
          </Box>
        {/* )} */}
      </Box>
    );
  }
  return null;
};

export default WatchPage;
