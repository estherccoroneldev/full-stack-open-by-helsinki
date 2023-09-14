import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import Form from "./Form";
import IndividualsList from "./List";

const DUMMY_DATA = [
  { name: "Arto Hellas", phoneNumber: "040-123456", id: 1 },
  { name: "Ada Lovelace", phoneNumber: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", phoneNumber: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", phoneNumber: "39-23-6423122", id: 4 },
];

const App = () => {
  const [individuals, setIndividuals] = useState(DUMMY_DATA);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleChangeNewName = (e) => setNewName(e.target.value);
  const handleChangeNewNumber = (e) => setNewNumber(e.target.value);

  const handleAddPerson = (e) => {
    e.preventDefault();
    const newIndividuals = [...individuals];

    let message = "Person added successfully";

    if (
      newIndividuals.some(
        (person) =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      )
    ) {
      message = `This name, ${newName}, already exists in the book. Please, add a new name.`;
      setNewName("");
      setNewNumber("");

      return alert(message);
    }

    const id = newIndividuals.length + 1;

    setIndividuals([
      ...newIndividuals,
      { id, name: newName, phoneNumber: newNumber },
    ]);

    setTimeout(() => {
      setNewName("");
      setNewNumber("");

      alert(message);
    }, 300);
  };

  const handleFilterListByName = (e) => setSearchValue(e.target.value);

  const filteredList = React.useMemo(() => {
    return searchValue === ""
      ? individuals
      : [...(individuals ?? [])].filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );
  }, [searchValue, individuals]);

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter {...{ searchValue, handleFilterListByName }} />

      <h2>Add a new person</h2>
      <Form
        {...{
          handleAddPerson,
          newName,
          handleChangeNewName,
          newNumber,
          handleChangeNewNumber,
        }}
      />

      <h2>Numbers</h2>
      <IndividualsList list={filteredList} />
    </div>
  );
};

export default App;
