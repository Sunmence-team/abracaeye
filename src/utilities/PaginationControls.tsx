import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }: { currentPage: number, totalPages: number, setCurrentPage: React.Dispatch<React.SetStateAction<number>> }) => {

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 3;
        const boundaryPages = 1;

        if (totalPages <= maxPagesToShow + (boundaryPages * 2) -2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            let startMiddle = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
            let endMiddle = Math.min(totalPages - 1, currentPage + Math.ceil(maxPagesToShow / 2) - 1);
            
            if (currentPage <= boundaryPages + Math.floor(maxPagesToShow / 2)) {
                startMiddle = 2;
                endMiddle = maxPagesToShow;
            }
            
            if (currentPage >= totalPages - boundaryPages - Math.floor(maxPagesToShow / 2) +1) {
                endMiddle = totalPages - 1;
                startMiddle = totalPages - maxPagesToShow +1;
            }

            if (startMiddle > 2) {
                pages.push("...");
            }

            for (let i = startMiddle; i <= endMiddle; i++) {
                pages.push(i);
            }

            if (endMiddle < totalPages - 1) {
                pages.push("...");
            }

            if (totalPages > 1 && !pages.includes(totalPages)) {
                pages.push(totalPages);
            }
        }
        return pages;
    };

    const displayedPageNumbers = getPageNumbers();

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center items-center gap-1">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                className="text-lg px-3 py-2.5 opacity-100 rounded-md hover:bg-pryClr/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
            >
                <MdKeyboardArrowLeft />
            </button>
            <span className="font-medium flex items-center gap-2">
                {displayedPageNumbers.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-1 text-gray-500"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page as number)}
                            className={`px-3 py-1 rounded-lg cursor-pointer transition-all font-[Inter]! duration-200 ${
                                currentPage === page
                                    ? "bg-(--primary-color) text-white"
                                    : "bg-transparent hover:bg-(--primary-color)/20"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                className="text-lg px-3 py-2.5 opacity-100 rounded-md hover:bg-pryClr/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-25"
            >
                <MdKeyboardArrowRight />
            </button>
        </div>
    );
};

export default PaginationControls;