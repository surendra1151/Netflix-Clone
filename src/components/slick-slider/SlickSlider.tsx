import { useState, useRef } from "react";
import styled from "styled-components";
import { Box, Stack, useTheme, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Slider, { Settings } from "react-slick";
import NetflixNavigationLink from "../../common/NetflixNavigationLink";
import MotionContainer from "../../animate/MotionContainer";
import { varFadeIn } from "../../animate/variants/fade/FadeIn";
import { CustomGenre, Genre } from "../../types/Genre";
import { Movie } from "../../types/Movie";
import { PaginatedMovieResult } from "../../types/Common";
import VideoItemWithHover from "../VideoItemWithHover";
import CustomNavigation from "./CustomNavigation";
import { ARROW_MAX_WIDTH } from "src/constant";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const RootStyle = styled("div")(() => ({
  position: "relative",
  overflow: "inherit",
}));

interface StyledSliderProps {
  theme: any;
  padding: number; // Adjust the type based on your actual type
}

const StyledSlider = styled(Slider)<StyledSliderProps>`
  display: flex !important;
  justify-content: center;
  overflow: initial !important;
  & > .slick-list {
    overflow: visible;
  }

  ${({ theme, padding }) => `
    @media (min-width: ${theme.breakpoints.sm}) {
      & > .slick-list {
        width: calc(100% - ${2 * padding}px);
      }
      & .slick-list > .slick-track {
        margin: 0px !important;
      }
      & .slick-list > .slick-track > .slick-current > div > .NetflixBox-root > .NetflixPaper-root:hover {
        transform-origin: 0% 50% !important;
      }
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      & > .slick-list {
        width: calc(100% - ${padding}px);
      }
    }
  `}
`;

interface SlideItemProps {
  item: Movie;
}

function SlideItem({ item }: SlideItemProps) {
  return (
    <Box pr={{ xs: 0.5, sm: 1 }}>
      <VideoItemWithHover video={item} />
    </Box>
  );
}

interface SlickSliderProps {
  data: PaginatedMovieResult;
  genre: Genre | CustomGenre;
}

function SlickSlider({ data, genre }: SlickSliderProps) {
  const sliderRef = useRef<Slider>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const theme = useTheme();

  const beforeChange = async (currentIndex: number, nextIndex: number) => {
    if (currentIndex < nextIndex) {
      setActiveSlideIndex(nextIndex);
    } else if (currentIndex > nextIndex) {
      setIsEnd(false);
    }
    setActiveSlideIndex(nextIndex);
  };

  const settings: Settings = {
    speed: 500,
    arrows: false,
    infinite: false,
    lazyLoad: "ondemand",
    slidesToShow: 6,
    slidesToScroll: 6,
    beforeChange,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <Box overflow="hidden" height="100%" zIndex={1}>
      {data.results.length > 0 && (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            mb={2}
            pl={{ xs: "30px", sm: "60px" }}
          >
            <NetflixNavigationLink
              variant="h5"
              href={`/genre/${
                genre.id || genre.name.toLowerCase().replace(" ", "_")
              }`}
              display="inline-block"
              fontWeight={700}
              onMouseOver={() => {
                setShowExplore(true);
              }}
              onMouseLeave={() => {
                setShowExplore(false);
              }}
            >
              {`${genre.name} Movies `}
              <MotionContainer
                open={showExplore}
                initial="initial"
                display="inline"
                color="success.main"
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer>
            </NetflixNavigationLink>
          </Stack>

          <RootStyle>
            <CustomNavigation
              isEnd={isEnd}
              arrowWidth={ARROW_MAX_WIDTH}
              onNext={handleNext}
              onPrevious={handlePrevious}
              activeSlideIndex={activeSlideIndex}
            >
              <StyledSlider
                ref={sliderRef}
                {...settings}
                padding={ARROW_MAX_WIDTH}
                theme={theme}
              >
                {data.results
                  .filter((i) => !!i.backdrop_path)
                  .map((item) => (
                    <SlideItem key={item.id} item={item} />
                  ))}
              </StyledSlider>
            </CustomNavigation>
          </RootStyle>
        </>
      )}
    </Box>
  );
}

export default SlickSlider;
