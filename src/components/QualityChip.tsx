import { Box, BoxProps, Text } from "@chakra-ui/react";

interface QualityChipProps extends BoxProps {
  label: string;
}

const QualityChip = ({ label, ...props }: QualityChipProps) => {
  return (
    <Box
      as="span"
      display="inline-block"
      borderRadius="4px"
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

export default QualityChip;
