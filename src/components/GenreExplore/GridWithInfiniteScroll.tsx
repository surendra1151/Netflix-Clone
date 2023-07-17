import { useRef, useEffect } from "react";

import { Box, Container, Grid, Text, GridItem } from "@chakra-ui/react";

import { CustomGenre, Genre } from "src/types/Genre";
import { PaginatedMovieResult } from "src/types/Common";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";
import VideoItemWithHover from "../VideoItemWithHover";

interface GridWithInfiniteScrollProps {
  genre: Genre | CustomGenre;
  data: PaginatedMovieResult;
  handleNext: (page: number) => void;
}

const GridWithInfiniteScroll = ({
  genre,
  data,
  handleNext,
}: GridWithInfiniteScrollProps) => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersectionObserver(intersectionRef);

  useEffect(() => {
    if (
      intersection &&
      intersection.intersectionRatio === 1 &&
      data.page < data.total_pages
    ) {
      handleNext(data.page + 1);
    }
  }, [intersection]);

  return (
    <>
      <Container
        maxW="100%"
        py={4}
        px={{ base: "30px", sm: "60px" }}
        pt="150px"
        bg="inherit"
      >
        <Text fontSize="xl" mb={2} color="white">{`${genre.name} Movies`}</Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
          }}
          gap={2}
        >
          {data.results
            .filter((v) => !!v.backdrop_path)
            .map((video, idx) => (
              <GridItem
                key={`${video.id}_${idx}`}
                colSpan={{ base: 1, sm: 1, md: 1 }}
                zIndex={1}
              >
                <VideoItemWithHover video={video} />
              </GridItem>
            ))}
        </Grid>
      </Container>
      <Box display="none" ref={intersectionRef} />
    </>
  );
};

export default GridWithInfiniteScroll;
