import { Box, BoxProps } from "@chakra-ui/react";

interface QualityChipProps extends BoxProps {
  label: string;
}

export default function QualityChip({ label, ...props }: QualityChipProps) {
  return (
    <Box
      as="span"
      display="inline-block"
      borderRadius="md"
      borderWidth="1px"
      px={1}
      fontSize="xs"
      height="100%"
      {...props}
    >
      {label}
    </Box>
  );
}
