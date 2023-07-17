import { useNavigate } from "react-router-dom";

import { Button } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

const PlayButton = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      color="black"
      variant="solid"
      leftIcon={
        <TriangleUpIcon
          style={{ transform: "rotate(90deg)" }}
          boxSize={["16px", "24px", "32px"]}
        />
      }
      background="white"
      fontSize={["18px", "24px", "24px"]}
      px={["8px", "8px", "8px", "16px"]}
      py={["4px", "8px", "8px"]}
      display="flex"
      fontWeight="500"
      whiteSpace="nowrap"
      textTransform="capitalize"
      lineHeight={1.5}
      opacity={1}
      justifyContent="center"
      borderRadius="4px"
      onClick={() => navigate("/watch")}
      _hover={{
        bgcolor: "white",
        opacity: 0.7,
      }}
      {...props}
    >
      Play
    </Button>
  );
};

export default PlayButton;
