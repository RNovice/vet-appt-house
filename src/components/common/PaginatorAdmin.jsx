import "@/assets/styles/components/PaginationAdmin.scss"

const PaginationAdmin = ({
  totalPages,
  clinicPerPage,
  setCurrentPage,
  currentPage,
  handlePageChange,
  pageIndex,
  setPageIndex
}) => {
  let pages = [];

  for(let i=1; i<Math.ceil(totalPages/clinicPerPage); i++){
    pages.push(i);
  }

  const handlePageIndex = (pageIndex) => {
    setPageIndex(pageIndex)
  }

  const handleCurrentPage = (index) => {
    setCurrentPage(index)
    handlePageChange(index)
  }

  return (
    <div className="admin-pagination">
      <button onClick={()=>pageIndex>=10?handlePageIndex(pageIndex-10):handlePageIndex(pageIndex)} style={{width:'100px'}}
      > 
        上十頁
      </button>
      {pages.slice(pageIndex,pageIndex+10).map((page, index) => {
        return (
            <button
              key={index}
              onClick={()=>handleCurrentPage(page)}
              className={page==currentPage?"active":""}
            >
              {page}
            </button>
        )
      })}
      <button onClick={()=>pageIndex+10<=totalPages?handlePageIndex(pageIndex+10):handlePageIndex(pageIndex)} style={{width:'100px'}}
      >
        下十頁
      </button>
    </div>
  ) 
}

export default PaginationAdmin;