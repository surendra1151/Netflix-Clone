import { Box, Text } from "@chakra-ui/react";

interface IChipProps {
  label: string;
}

export default function AgeLimitChip({ label, ...props }: IChipProps) {
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
      <Text as="span" p={0}>
        {label}
      </Text>
    </Box>
  );
}
