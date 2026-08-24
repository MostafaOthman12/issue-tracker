"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

export const Pagination = ({ pageSize, itemCount, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params}`);
  };

  const pageCount = Math.ceil(itemCount / pageSize);

  return (
    <Flex mt="6" align="center" gap="2" justify="end">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>

      <Button
        color="gray"
        variant="soft"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon />
        Prev
      </Button>

      <Button
        color="gray"
        variant="soft"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
        <ArrowRightIcon />
      </Button>
    </Flex>
  );
};
