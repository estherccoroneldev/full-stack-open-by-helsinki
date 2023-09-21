const Person = ({ person, deletePerson }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginBottom: 10,
      }}
    >
      <p>
        {person.name} {person.phoneNumber}
      </p>
      <button onClick={() => deletePerson(person)}>delete</button>
    </div>
  );
};

export default Person;
