import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import List from "./List";
import CountryDetails from "./CountryDetails";

const BASE_URL_BY_NAME =
  "https://studies.cs.helsinki.fi/restcountries/api/name/";
const BASE_URL_ALL = "https://studies.cs.helsinki.fi/restcountries/api/all/";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [countryDetails, setCountryDetails] = useState(null);

  const getAllCountries = () => {
    if (searchValue.length === 0) {
      return;
    }

    axios
      .get(`${BASE_URL_ALL}`)
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(JSON.stringify(error, null, 2)));
  };

  useEffect(getAllCountries, [searchValue]);

  const handleFilterListByName = (e) => {
    setCountryDetails(null);
    setSearchValue(e.target.value);
  };

  const filteredList = React.useMemo(() => {
    if (!countries) return [];

    return searchValue === ""
      ? countries || []
      : [...(countries ?? [])].filter((country) =>
          country?.name?.common
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );
  }, [searchValue, countries]);

  const handleShowCountryDetails = async (countryName) => {
    try {
      const response = await axios.get(`${BASE_URL_BY_NAME}${countryName}`);
      setCountryDetails(response.data);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Countries Finder</h1>

      <SearchFilter {...{ searchValue, handleFilterListByName }} />
      {!countryDetails ? (
        <List
          data={filteredList}
          showCountryDetails={handleShowCountryDetails}
        />
      ) : (
        <CountryDetails
          name={countryDetails.name.common}
          capital={countryDetails.capital}
          flagUrl={countryDetails.flags.png}
          population={countryDetails.population}
          area={countryDetails.area}
          languages={countryDetails.languages}
        />
      )}
    </div>
  );
};

export default App;
