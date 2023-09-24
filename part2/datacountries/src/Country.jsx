const Country = ({ country, showCountryDetails }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <p>{country.name.common}</p>
      <button onClick={() => showCountryDetails(country.name.common)}>
        Show
      </button>
    </div>
  );
};

export default Country;
