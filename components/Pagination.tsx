
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const pageNumbers: (number | string)[] = [];
    const pageRange = 2; // How many pages to show around current page

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || // always show first page
            i === totalPages || // always show last page
            (i >= currentPage - pageRange && i <= currentPage + pageRange) // show pages in range
        ) {
            pageNumbers.push(i);
        } else if (
            i === currentPage - pageRange - 1 || // show ellipsis
            i === currentPage + pageRange + 1
        ) {
            if (pageNumbers[pageNumbers.length - 1] !== '...') {
                pageNumbers.push('...');
            }
        }
    }

    return (
        <div className="flex justify-center items-center gap-3 my-10">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn p-3 border-2 border-gray-200 bg-white rounded-lg cursor-pointer transition-all duration-300 font-semibold min-w-[45px] flex justify-center items-center hover:border-[var(--primary)] hover:text-[var(--primary)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <i className="fas fa-chevron-right"></i>
            </button>
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={typeof page !== 'number'}
                    className={`pagination-btn p-3 border-2 border-gray-200 bg-white rounded-lg cursor-pointer transition-all duration-300 font-semibold min-w-[45px] flex justify-center items-center hover:border-[var(--primary)] hover:text-[var(--primary)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${currentPage === page ? 'bg-gradient-to-l from-[var(--primary)] to-[var(--secondary)] text-white border-transparent shadow-lg' : ''}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn p-3 border-2 border-gray-200 bg-white rounded-lg cursor-pointer transition-all duration-300 font-semibold min-w-[45px] flex justify-center items-center hover:border-[var(--primary)] hover:text-[var(--primary)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <i className="fas fa-chevron-left"></i>
            </button>
        </div>
    );
};

export default Pagination;
