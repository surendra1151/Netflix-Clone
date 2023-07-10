import { Button, ButtonProps } from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

export default function MoreInfoButton({ ...props }: ButtonProps) {
  return (
    <Button
      variant="solid"
      leftIcon={<InfoOutlineIcon boxSize={["24px", "32px", "40px"]} />}
      background="#6d6d6e"
      px={["8px", "16px"]}
      py={["4px", "8px"]}
      display="flex"
      fontWeight="500"
      fontSize={["18px", "24px"]}
      whiteSpace="nowrap"
      textTransform="capitalize"
      lineHeight={1.5}
      opacity = "1"
      justifyContent="center"
      borderRadius="4px"
      color="white"
      _hover={{
        bgcolor: "#6d6d6e",
        opacity: 0.7,
      }}
      ml = "16px"
      {...props}
    >
      More Info
    </Button>
  );
}
