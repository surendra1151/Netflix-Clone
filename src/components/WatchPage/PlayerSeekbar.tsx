import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

const PlayerSeekbar = ({
  playedSeconds,
  duration,
  seekTo,
}: {
  playedSeconds: number;
  duration: number;
  seekTo: (value: number) => void;
}) => {
  return (
    <Slider
      value={playedSeconds}
      max={duration}
      onChange={(value) => seekTo(value)}
      colorScheme="red"
      height="4px"
    >
      <SliderTrack bg="gray.200">
        <SliderFilledTrack bg="red" borderRadius="full" />
      </SliderTrack>
      <SliderThumb
        boxSize="10px"
        _focus={{ boxShadow: "none" }}
        _hover={{ transform: "scale(1.2) translateY(-30%)" }}
        bg="red"
        borderRadius="full"
      />
    </Slider>
  );
};

export default PlayerSeekbar;
