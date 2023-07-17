import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { varWrapBoth } from "./variants/Wrap";

interface MotionContainerProps extends BoxProps {
  initial?: boolean | string;
  open?: boolean;
}

const MotionContainer = ({
  open,
  children,
  ...other
}: MotionContainerProps) => {
  return (
    <Box
      initial={false}
      variants={varWrapBoth}
      as={motion.div}
      animate={open ? "animate" : "exit"}
      {...other}
    >
      {children}
    </Box>
  );
};

export default MotionContainer;
