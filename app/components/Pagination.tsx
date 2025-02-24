import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

interface PaginationProps {
  totalPages: number | undefined;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const generatePages = () => {
    const pages = [];
    const maxPagesToShow = 5; // Máximo de páginas visíveis antes de adicionar '...'

    if (totalPages && totalPages <= maxPagesToShow) {
      // Mostra todas as páginas se for um número pequeno
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (totalPages && currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-end gap-2 py-10 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-neutral-400 disabled:bg-secondary-color4 rounded -z-0 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MdOutlineArrowBackIosNew />
      </button>

      {generatePages().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 cursor-pointer py-1 rounded ${
              currentPage === page
                ? "bg-pink text-white"
                : "bg-transparent border border-secondary-color4 text-neutral-200"
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-neutral-200">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-neutral-400 cursor-pointer rounded disabled:opacity-50 disabled:bg-secondary-color4 disabled:cursor-not-allowed"
      >
        <MdOutlineArrowForwardIos />
      </button>
    </div>
  );
};
