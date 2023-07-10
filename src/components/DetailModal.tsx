import { useCallback, useRef, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Container,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
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
import VideoJSPlayer from "../layout/watch/VideoJSPlayer";

export default function DetailModal() {
  const { detail, setDetailType } = useDetailModal();
  console.log("detail", detail)
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
        <ModalContent p={0} bgColor="#181818" maxWidth= "900px">
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" mb={3}>
              <Box
                width="100%"
                position="relative"
                height="calc(9 / 16 * 100%)"
              >
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
                  height="14.7vw"
                  opacity={1}
                  top="auto"
                  width="100%"
                />
                <Box
                  position="absolute"
                  left={0}
                  right={0}
                  bottom={16}
                  px={{ xs: 2, sm: 3, md: 5 }}
                >
                  <MaxLineTypography variant="h4" maxLine={1} mb={2}>
                    {detail.mediaDetail?.title}
                  </MaxLineTypography>
                  <Stack direction="row" spacing={2} mb={3}>
                    <PlayButton color="black" py={0} />
                    <NetflixIconButton aria-label="add-icon">
                      <AddIcon />
                    </NetflixIconButton>
                    <NetflixIconButton aria-label="like-icon">
                      <MdThumbUp />
                    </NetflixIconButton>
                    <Box flexGrow={1} />
                    <NetflixIconButton
                      size="large"
                      onClick={() => handleMute(muted)}
                      zIndex={2}
                      aria-label="volume-icon"
                    >
                      {!muted ? <MdVolumeUp /> : <MdVolumeOff />}
                    </NetflixIconButton>
                  </Stack>

                  <Container p="0px !important">
                    <Grid alignItems="center">
                      <GridItem>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Text
                            variant="subtitle1"
                            color="success.main"
                          >{`${getRandomNumber(100)}% Match`}</Text>
                          <Text variant="body2">
                            {detail.mediaDetail?.release_date.substring(0, 4)}
                          </Text>
                          <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                          <Text variant="subtitle2">{`${formatMinuteToReadable(
                            getRandomNumber(180)
                          )}`}</Text>
                          <QualityChip label="HD" />
                        </Stack>

                        <MaxLineTypography maxLine={3} variant="body1" mt={2}>
                          {detail.mediaDetail?.overview}
                        </MaxLineTypography>
                      </GridItem>
                      <GridItem>
                        <Text variant="body2" my={1}>
                          {`Genres: ${detail.mediaDetail?.genres
                            .map((g: any) => g.name)
                            .join(", ")}`}
                        </Text>
                        <Text variant="body2" my={1}>
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
                <Container py={2} px={{ xs: 2, sm: 3, md: 5 }}>
                  <Text variant="h6" mb={2}>
                    More Like This
                  </Text>
                  <Grid>
                    {similarVideos.results.map((sm: any) => (
                      <GridItem key={sm.id}>
                        <SimilarVideoCard video={sm} />
                      </GridItem>
                    ))}
                  </Grid>
                </Container>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
}
