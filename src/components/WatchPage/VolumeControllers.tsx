import { Stack } from "@chakra-ui/react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { MdVolumeUp, MdVolumeDown } from "react-icons/md";
import PlayerControlButton from "./PlayerControlButton";

export default function VolumeControllers({
  value,
  handleVolume,
  handleVolumeToggle,
  muted,
}: {
  value: number;
  handleVolume: any;
  handleVolumeToggle: React.MouseEventHandler<HTMLButtonElement>;
  muted: boolean;
}) {
  return (
    <Stack direction="row" align="center" spacing={2}>
      <PlayerControlButton
        onClick={handleVolumeToggle}
        icon={!muted ? <MdVolumeUp size = "44px" /> : <MdVolumeDown size="44px" />}
        aria-label="player-control"
      />
      <Slider
        aria-label="slider-ex-2"
        max={100}
        value={value * 100}
        onChange={handleVolume}
        width={{ base: "60px", md: "80px", lg: "100px" }}
        sx={{
          ".chakra-slider__thumb": {
            boxShadow: "none",
            height: "10px",
            width: "10px",
            border: "none",
            bg: "red",
          },
          ".chakra-slider__filled-track": {
            background: "red",
          },
          ".chakra-slider__track": {
            background: "white",
            opacity: 0.85,
          },
          "&:focus": {
            ".chakra-slider__thumb": {
              height: "15px",
              width: "15px",
            },
          },
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Stack>
  );
}
