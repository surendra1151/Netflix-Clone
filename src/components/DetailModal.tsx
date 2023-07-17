import { useCallback, useRef, useState } from "react";

import {
  Box,
  Grid,
  GridItem,
  Container,
  Stack,
  Modal,
  ModalContent,
  ModalBody,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { MdVolumeOff, MdVolumeUp, MdThumbUp } from "react-icons/md";
import Player from "video.js/dist/types/player";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "../common/PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "../providers/DetailModalProviders";
import { useGetSimilarVideosQuery } from "../slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import VideoJSPlayer from "./WatchPage/VideoJSPlayer";

const DetailModal = () => {
  const { detail, setDetailType } = useDetailModal();
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
    { skip: !detail.id }
  );
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  return (
    <Modal
      isOpen={!!detail.mediaDetail}
      onClose={() => {
        setDetailType({ mediaType: undefined, id: undefined });
      }}
    >
      <ModalContent
        bgColor="#181818"
        width="calc(100% - 150px)"
        maxWidth="1100px"
        borderRadius="6px"
        my="2em"
      >
        <ModalBody
          position="relative"
          p={0}
          width="100%"
          fontFamily="Roboto, Helvetica, Arial, sans-serif"
          mb="40px"
        >
          <Box width="100%" position="relative" height="calc(9 / 16 * 100%)">
            <VideoJSPlayer
              options={{
                loop: true,
                autoplay: true,
                controls: false,
                responsive: true,
                fluid: true,
                techOrder: ["youtube"],
                sources: [
                  {
                    type: "video/youtube",
                    src: `https://www.youtube.com/watch?v=${
                      detail.mediaDetail?.videos.results[0]?.key ||
                      "L3oOldViIgY"
                    }`,
                  },
                ],
              }}
              onReady={handleReady}
            />
            <Box
              background="linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)"
              top={0}
              left={0}
              bottom={0}
              right="26.09%"
              opacity={1}
              position="absolute"
              transition="opacity .5s"
            />
            <Box
              backgroundColor="transparent"
              backgroundImage="linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)"
              backgroundRepeat="repeat-x"
              backgroundPosition="0px top"
              backgroundSize="100% 100%"
              bottom={0}
              position="absolute"
              height="12.7vw"
              opacity={1}
              top="auto"
              width="100%"
            />
            <IconButton
              icon={<CloseIcon color="white" width="16px" height="16px" />}
              aria-label="close-button"
              position="absolute"
              top="15px"
              right="15px"
              width={["22px", "36px"]}
              height={["22px", "36px"]}
              background="#181818"
              borderRadius="50%"
              _hover={{
                background: "main",
              }}
              onClick={() => {
                setDetailType({ mediaType: undefined, id: undefined });
              }}
            />
            <Box
              position="absolute"
              left="10px"
              right={0}
              bottom="16px"
              px={["16px", "24px", "40px"]}
            >
              <MaxLineTypography
                as="h4"
                maxLine={1}
                mb="16px"
                color="white"
                fontSize="2.125rem"
                fontWeight="400"
              >
                {detail.mediaDetail?.title}
              </MaxLineTypography>
              <Stack direction="row" spacing={2} mb={3} alignItems="center">
                <PlayButton color="black" size="large" />
                <NetflixIconButton
                  icon={<AddIcon />}
                  aria-label="add-icon"
                  background="transparent"
                  border="2px solid #454f5b"
                  borderRadius="50%"
                  size="lg"
                />
                <NetflixIconButton
                  icon={<MdThumbUp />}
                  aria-label="like-icon"
                  background="transparent"
                  border="2px solid #454f5b"
                  borderRadius="50%"
                  size="lg"
                />
                <Box flexGrow={1} />
                <NetflixIconButton
                  size="lg"
                  onClick={() => handleMute(muted)}
                  zIndex={2}
                  aria-label="volume-icon"
                  icon={!muted ? <MdVolumeUp /> : <MdVolumeOff />}
                  background="transparent"
                  border="2px solid #454f5b"
                  borderRadius="50%"
                />
              </Stack>

              <Container p="0px !important" maxWidth="100%" textAlign="left">
                <Grid
                  templateColumns="minmax(0,2fr) minmax(0,1fr)"
                  columnGap="2em"
                >
                  <GridItem>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Text as="h6" color="#66bb6a">{`${getRandomNumber(
                        100
                      )}% Match`}</Text>
                      <Text
                        fontSize="0.875rem"
                        fontWeight="400"
                        ml="8px"
                        color="white"
                      >
                        {detail.mediaDetail?.release_date.substring(0, 4)}
                      </Text>
                      <AgeLimitChip
                        label={`${getRandomNumber(20)}+`}
                        ml="8px"
                      />
                      <Text
                        fontSize="0.875rem"
                        fontWeight="500"
                        ml="8px"
                        color="white"
                      >{`${formatMinuteToReadable(
                        getRandomNumber(180)
                      )}`}</Text>
                      <QualityChip label="HD" ml="8px" />
                    </Stack>
                    <Text
                      noOfLines={3}
                      mt="16px"
                      fontSize="1rem"
                      color="white"
                      fontWeight="400"
                    >
                      {detail.mediaDetail?.overview}
                    </Text>
                  </GridItem>
                  <GridItem>
                    <Text
                      fontSize="0.875rem"
                      fontWeight="500"
                      ml="8px"
                      color="white"
                      my={1}
                    >
                      {`Genres: ${detail.mediaDetail?.genres
                        .map((g: any) => g.name)
                        .join(", ")}`}
                    </Text>
                    <Text
                      fontSize="0.875rem"
                      fontWeight="500"
                      ml="8px"
                      color="white"
                      my={1}
                    >
                      {`Available in: ${detail.mediaDetail?.spoken_languages
                        .map((l: any) => l.name)
                        .join(", ")}`}
                    </Text>
                  </GridItem>
                </Grid>
              </Container>
            </Box>
          </Box>
          {similarVideos && similarVideos.results.length > 0 && (
            <Container py="2px" px={["16px", "24px", "40px"]} maxWidth="100%">
              <Text fontSize="1.25rem" fontWeight="400" my="16px" color="white">
                More Like This
              </Text>
              <Grid templateColumns="repeat(3,1fr)" gridGap="1em">
                {similarVideos.results.map((sm: any) => (
                  <GridItem key={sm.id}>
                    <SimilarVideoCard video={sm} />
                  </GridItem>
                ))}
              </Grid>
            </Container>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DetailModal;
