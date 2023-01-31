import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate"; //instalar esa dependencia para q funcione el paginado  ---- npm install react-paginate --save


export const Pagination = ({ pageNumber, info, updatePageNumber }) => {
  let pageChange = (data) => {
    updatePageNumber(data.selected + 1);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <style jsx>
        {`
          @media (max-width: 768px) {
            .pagination {
              font-size: 12px;
            }
            .next,
            .prev {
              display: none;
            }
          }
          @media (max-width: 768px) {
            .pagination {
              font-size: 14px;
            }
          }
        `}
      </style>
      <ReactPaginate
        className="pagination justify-content-center my-4 gap-4"
        nextLabel="Next"
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        previousLabel="Prev"
        previousClassName="btn btn-primary fs-5 prev"
        nextClassName="btn btn-primary fs-5 next"
        activeClassName="active"
        marginPagesDisplayed={width < 576 ? 1 : 2}
        pageRangeDisplayed={width < 576 ? 1 : 2}
        pageCount={info?.pages}
        onPageChange={pageChange}
        pageClassName="page-item"
        pageLinkClassName="page-link"
      />
    </>
  );
};


// import React from "react";

// const Pagination = ({ cardsPerPage, allDogs, pagination, activePage }) => {
// const pageNumbers = Array.from({ length: Math.ceil(allDogs.length / cardsPerPage) }, (_, i) => i + 1);

// return (
// <nav>
// {pageNumbers.map((number) => {
// const isActive = activePage === number;
// return (
// <button key={number} onClick={() => pagination(number)} className={isActive ? "active" : ""}>
// {number}
// </button>
// );
// })}
// </nav>
// );
// };

export default Pagination;

// import React from "react";

// export default function Pagination ({cardsPerPage,allDogs,pagination,activePage}) {
//     const pageNumbers = [];
//     for (let i = 0; i < Math.ceil(allDogs.length/cardsPerPage); i++) {
//         pageNumbers.push(i+1);
//     }

//     return (
//         <nav>
//             {pageNumbers?.map(number => {
//                 let active = (activePage === number);
//                 return (
//                     <button 
//                         key={number} 
//                         onClick={() => pagination(number)}>
//                         {number}
//                     </button>
//                 )})}
//         </nav>
//     )
// }