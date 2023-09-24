import Country from "./Country";
import CountryDetails from "./CountryDetails";
const List = ({ data, showCountryDetails }) => {
  if (!data) return null;

  return (
    <>
      {data.length > 1 && data.length <= 10 ? (
        data.map((country) => (
          <Country
            key={country.cca2}
            country={country}
            showCountryDetails={showCountryDetails}
          />
        ))
      ) : data.length === 1 ? (
        <CountryDetails
          name={data[0].name.common}
          capital={data[0].capital}
          flagUrl={data[0].flags.png}
          population={data[0].population}
          area={data[0].area}
          languages={data[0].languages}
        />
      ) : data.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : null}
    </>
  );
};

export default List;
