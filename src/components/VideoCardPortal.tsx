import { useNavigate } from "react-router-dom";

import { Box, Stack, Text, Image, Card } from "@chakra-ui/react";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { MdVolumeUp, MdThumbUpOffAlt, MdPlayCircle } from "react-icons/md";

import { usePortal } from "src/providers/PortalProvider";
import { useDetailModal } from "src/providers/DetailModalProviders";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import GenreBreadcrumbs from "./GenreBreadcrumbs";
import { useGetConfigurationQuery } from "src/slices/configuration";
import { MEDIA_TYPE } from "src/types/Common";
import { useGetGenresQuery } from "src/slices/genre";
import { MAIN_PATH } from "src/constant";
import { Movie } from "src/types/Movie";

interface VideoCardModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

const VideoCardModal = ({ video, anchorElement }: VideoCardModalProps) => {
  const navigate = useNavigate();
  const { data: configuration } = useGetConfigurationQuery(undefined);
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const setPortal = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setDetailType } = useDetailModal();

  return (
    <Card
      onMouseLeave={() => {
        setPortal(null, null);
      }}
      w={rect.width * 1.5}
      h="100%"
      backgroundColor="main"
    >
      <Box w="100%" pos="relative" pb="calc(9 / 16 * 100%)">
        <Image
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          pos="absolute"
          top={0}
          h="100%"
          w="100%"
          objectFit="cover"
          backgroundPosition="50%"
        />
        <Stack
          direction="row"
          alignItems="center"
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          px={4}
          pb={2}
        >
          <Text
            noOfLines={2}
            w="80%"
            fontWeight={700}
            fontSize="xl"
            color="white"
          >
            {video.title}
          </Text>
          <Box flex={1} />
          <NetflixIconButton
            size="md"
            zIndex={2}
            aria-label="volumeup-icon"
            icon={<MdVolumeUp />}
            background="transparent"
            border="2px solid #454f5b"
            borderRadius="50%"
          />
        </Stack>
      </Box>
      <Box p={4}>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <NetflixIconButton
              p={0}
              onClick={() => navigate(`/${MAIN_PATH.watch}`)}
              aria-label="play-circle-icon"
              size="md"
              zIndex={2}
              icon={<Box as={MdPlayCircle} width="40px" height="40px" />}
              background="transparent"
              border="2px solid #454f5b"
              borderRadius="50%"
            />
            <NetflixIconButton
              size="md"
              zIndex={2}
              aria-label="add-icon"
              icon={<AddIcon />}
              background="transparent"
              border="2px solid #454f5b"
              borderRadius="50%"
            />
            <NetflixIconButton
              size="md"
              zIndex={2}
              aria-label="thumbs-up"
              icon={<MdThumbUpOffAlt />}
              background="transparent"
              border="2px solid #454f5b"
              borderRadius="50%"
            />
            <Box flex={1} />
            <NetflixIconButton
              size="md"
              zIndex={2}
              aria-label="chevron-down"
              icon={<ChevronDownIcon />}
              background="transparent"
              border="2px solid #454f5b"
              borderRadius="50%"
              onClick={() => {
                setDetailType({ mediaType: MEDIA_TYPE.Movie, id: video.id });
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mt="5px">
            <Text color="green.500">{`${getRandomNumber(100)}% Match`}</Text>
            <AgeLimitChip label={`${getRandomNumber(20)}+`} ml="8px" />
            <Text color="white" ml="8px">{`${formatMinuteToReadable(
              getRandomNumber(180)
            )}`}</Text>
            <QualityChip label="HD" ml="8px" />
          </Stack>
          {genres && (
            <GenreBreadcrumbs
              genres={genres
                .filter((genre: any) => video.genre_ids.includes(genre.id))
                .map((genre: any) => genre.name)}
            />
          )}
        </Stack>
      </Box>
    </Card>
  );
};

export default VideoCardModal;
