const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.phoneNumber}
    </p>
  );
};

export default Person;
