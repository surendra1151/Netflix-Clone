import { Link as RouterLink } from "react-router-dom";

import { Box, BoxProps } from "@chakra-ui/react";

import { MAIN_PATH } from "src/constant";

const Logo = ({ sx }: BoxProps) => {
  return (
    <RouterLink to={`/${MAIN_PATH.browse}`}>
      <Box
        as="img"
        alt="Netflix Logo"
        src="/assets/netflix-logo.png"
        width={87}
        height={25}
        mr="25px"
        sx={{
          ...sx,
        }}
      />
    </RouterLink>
  );
};

export default Logo;
