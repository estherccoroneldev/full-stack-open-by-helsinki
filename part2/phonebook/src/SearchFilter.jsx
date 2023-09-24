const SearchFilter = ({ searchValue, handleFilterListByName }) => (
  <div>
    search by name{" "}
    <input value={searchValue} onChange={handleFilterListByName} />
  </div>
);

export default SearchFilter;
