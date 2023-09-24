const SearchFilter = ({ searchValue, handleFilterListByName }) => (
  <div>
    search <input value={searchValue} onChange={handleFilterListByName} />
  </div>
);

export default SearchFilter;
