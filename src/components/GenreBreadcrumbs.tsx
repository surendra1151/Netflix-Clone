import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbProps,
} from "@chakra-ui/react";

const Separator = (
  <Box as="span" w={4} h={4} borderRadius="50%" bg="gray.500" />
);

interface GenreBreadcrumbsProps extends BreadcrumbProps {
  genres: string[];
}

export default function GenreBreadcrumbs({ genres }: GenreBreadcrumbsProps) {
  return (
    <Breadcrumb separator={Separator}>
      {genres.map((genre, idx) => (
        <BreadcrumbItem key={idx}>
          <Text color="gray.800">{genre}</Text>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
