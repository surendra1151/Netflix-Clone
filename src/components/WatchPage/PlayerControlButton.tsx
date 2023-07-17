import { forwardRef } from "react";

import { IconButton, IconButtonProps } from "@chakra-ui/react";

const PlayerControlButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, ...props }, ref) => (
    <IconButton
      ref={ref}
      icon={icon}
      background="transparent"
      _hover={{
        background: "none",
      }}
      color = "white"
      sx={{
        padding: { xs: 0.5, sm: 1 },
        "& svg, & span": { transition: "transform .3s" },
        "&:hover svg, &:hover span": {
          msTransform: "scale(1.3)",
          WebkitTransform: "scale(1.3)",
          transform: "scale(1.3)",
        },
      }}
      {...props}
    />
  )
);

export default PlayerControlButton;
