/**
 * generates pagination metadata
 * @function paginate
 * @param {number} rowCount
 * @param {number} offset
 * @param {number} limit
 * @param {number} pageSize
 * @return {object} pagination metadata
 */
const paginate = ({ rowCount, offset, limit, pageSize }) => {
  const totalPageCount = Math.ceil(rowCount / limit);
  const currentPage = Math.floor((Number(offset) + Number(limit)) / limit);
  const nextPage = (totalPageCount > currentPage) ? currentPage + 1 : null;
  return {
    totalPageCount,
    currentPage,
    nextPage,
    rowCount,
    pageSize
  };
};

export default paginate;
