import { ReactNode } from "react";

import { Box } from "@chakra-ui/react";

const MaturityRate = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      py="1"
      pl="1.5"
      pr="3"
      fontSize="22px"
      display="flex"
      alignItems="center"
      color="#fff"
      border="3px #dcdcdc"
      borderLeftStyle="solid"
      bgColor="#33333399"
    >
      {children}
    </Box>
  );
};

export default MaturityRate;
