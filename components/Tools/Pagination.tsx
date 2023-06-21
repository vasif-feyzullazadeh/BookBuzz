import styled from "styled-components";

interface Props {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (param: number) => void;
}

const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <PaginationBox>
      <PaginationRow>
        {pages.map((page, index) => (
          <PaginationItem
            active={page === currentPage ? true : false}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PaginationItem>
        ))}
      </PaginationRow>
    </PaginationBox>
  );
};

export default Pagination;

const PaginationBox = styled.div`
  margin: 0 0 150px;
`;

const PaginationRow = styled.div`
  display: flex;
`;

const PaginationItem = styled.button<{ active: boolean }>`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 4px;
  border: 1px solid #333;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  background: ${({ active }) => (active ? "#333" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
`;
