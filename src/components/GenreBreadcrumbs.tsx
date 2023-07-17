import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbProps,
} from "@chakra-ui/react";

interface GenreBreadcrumbsProps extends BreadcrumbProps {
  genres: string[];
}

const GenreBreadcrumbs = ({ genres }: GenreBreadcrumbsProps) => {
  return (
    <Breadcrumb
      separator={
        <Box as="span" fontSize="lg" color="#919EAB">
          •
        </Box>
      }
    >
      {genres.map((genre, idx) => (
        <BreadcrumbItem key={idx}>
          <Text color="white">{genre}</Text>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default GenreBreadcrumbs;
