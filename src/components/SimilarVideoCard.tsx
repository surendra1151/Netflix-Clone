import { Box, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Movie } from "src/types/Movie";
import NetflixIconButton from "./NetflixIconButton";
import MaxLineTypography from "./MaxLineTypography";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import AgeLimitChip from "./AgeLimitChip";
import { useGetConfigurationQuery } from "../slices/configuration";

interface SimilarVideoCardProps {
  video: Movie;
}

export default function SimilarVideoCard({ video }: SimilarVideoCardProps) {
  const { data: configuration } = useGetConfigurationQuery(undefined);

  return (
    <Box borderWidth="1px" borderRadius="md">
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
          <Text fontSize="sm">
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
          <MaxLineTypography
            maxLine={1}
            width="80%"
            fontWeight="700"
            variant="subtitle1"
          >
            {video.title}
          </MaxLineTypography>
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
              <Text fontSize="sm">{video.release_date.substring(0, 4)}</Text>
            </Stack>
          </Box>
          <Box flexGrow={1} />
          <NetflixIconButton aria-label="add-icon">
            <AddIcon />
          </NetflixIconButton>
        </Stack>
        <MaxLineTypography maxLine={4} variant="subtitle2">
          {video.overview}
        </MaxLineTypography>
      </Stack>
    </Box>
  );
}
