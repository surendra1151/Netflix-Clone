import { Box, Stack, Text, Card } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { Movie } from "src/types/Movie";
import NetflixIconButton from "./NetflixIconButton";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import AgeLimitChip from "./AgeLimitChip";
import { useGetConfigurationQuery } from "../slices/configuration";

interface SimilarVideoCardProps {
  video: Movie;
}

const SimilarVideoCard = ({ video }: SimilarVideoCardProps) => {
  const { data: configuration } = useGetConfigurationQuery(undefined);

  return (
    <Card
      borderWidth="1px"
      borderRadius="md"
      backgroundColor="main"
      backgroundImage="linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))"
      aspectRatio="21/22"
    >
      <Box position="relative" width="100%" paddingTop="calc(9 / 16 * 100%)">
        <img
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          style={{
            top: 0,
            height: "100%",
            position: "absolute",
          }}
        />
        <Box top="10px" right="15px" position="absolute">
          <Text fontSize="sm" color="white">
            {`${formatMinuteToReadable(getRandomNumber(180))}`}
          </Text>
        </Box>
        <Box
          left={0}
          right={0}
          bottom={0}
          paddingLeft="16px"
          paddingRight="16px"
          paddingBottom="4px"
          position="absolute"
        >
          <Text
            noOfLines={1}
            width="80%"
            fontWeight="700"
            fontSize="1rem"
            color="white"
          >
            {video.title}
          </Text>
        </Box>
      </Box>
      <Stack spacing={1} padding={3}>
        <Stack direction="row" alignItems="center">
          <Box>
            <Text color="green.500" fontSize="sm">{`${getRandomNumber(
              100
            )}% Match`}</Text>
            <Stack direction="row" spacing={1} alignItems="center">
              <AgeLimitChip label={`${getRandomNumber(20)}+`} />
              <Text fontSize="0.875rem" color="white" ml="8px">
                {video.release_date.substring(0, 4)}
              </Text>
            </Stack>
          </Box>
          <Box flexGrow={1} />
          <NetflixIconButton
            icon={<AddIcon />}
            aria-label="add-icon"
            background="transparent"
            border="2px solid #454f5b"
            borderRadius="50%"
            size="md"
          />
        </Stack>
        <Text noOfLines={4} mt="8px" fontSize="0.85rem" color="white">
          {video.overview}
        </Text>
      </Stack>
    </Card>
  );
};

export default SimilarVideoCard;
