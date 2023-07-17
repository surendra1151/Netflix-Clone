import { Box, Text, BoxProps } from "@chakra-ui/react";

interface IChipProps extends BoxProps {
  label: string;
}

const AgeLimitChip = ({ label, ...props }: IChipProps) => {
  return (
    <Box
      as="span"
      display="inline-block"
      borderRadius="0px"
      borderWidth="1px"
      px={1}
      fontSize="xs"
      height="100%"
      borderColor="#454f5b"
      {...props}
    >
      <Text as="span" p={0} color="white">
        {label}
      </Text>
    </Box>
  );
};

export default AgeLimitChip;
