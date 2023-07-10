import { Box, BoxProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

export default function Logo({ sx }: BoxProps) {
  return (
    <RouterLink to={`/${MAIN_PATH.browse}`}>
      <Box
        as="img"
        alt="Netflix Logo"
        src="/assets/netflix-logo.png"
        width={87}
        height={25}
        mr = "25px"
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
}