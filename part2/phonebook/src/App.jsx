import React, { useState, useEffect } from "react";
import service from "./services/individuals";
import SearchFilter from "./SearchFilter";
import Form from "./Form";
import IndividualsList from "./List";
import Notification from "./Notification";

const TIMEOUT_DURATION = 6000;

const App = () => {
  const [individuals, setIndividuals] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState({});
  const handleChangeNewName = (e) => setNewName(e.target.value);
  const handleChangeNewNumber = (e) => setNewNumber(e.target.value);

  const getInitialData = () => {
    service.getAll().then((initialData) => {
      setIndividuals(initialData);
    });
  };

  useEffect(getInitialData, []);

  const clearNotification = () => {
    setNewName("");
    setNewNumber("");

    setTimeout(() => {
      setNotification({});
    }, TIMEOUT_DURATION);
  };

  const isNameEqual = (newName) => (person) =>
    person.name.toLocaleLowerCase() === newName.toLocaleLowerCase();

  const handleAddPerson = async (e) => {
    e.preventDefault();
    const newIndividuals = [...individuals];

    let message = "Person added successfully";

    const existingPerson = newIndividuals.find(isNameEqual(newName));

    if (typeof existingPerson?.id === "number") {
      message = `This name, ${newName}, already exists in the book. Do you want to update the phone number?`;

      if (!confirm(message)) {
        return;
      }

      try {
        const response = await service.update(existingPerson.id, {
          ...existingPerson,
          phoneNumber: newNumber,
        });

        setIndividuals(
          newIndividuals.map((item) => {
            return item.id === existingPerson.id ? response : item;
          }),
        );

        setNotification({
          message: "This person has been updated successfully",
          kind: "confirm",
        });
      } catch (error) {
        setNotification({
          message: "Something went wrong when updating the person",
          kind: "error",
        });
      }
      clearNotification();

      return;
    }

    const newPersonObject = { name: newName, phoneNumber: newNumber };
    try {
      const responseObject = await service.create(newPersonObject);

      setIndividuals([...newIndividuals, responseObject]);

      setNotification({
        message,
        kind: "confirm",
      });
    } catch (error) {
      setNotification({
        message: "Something went wrong when adding a new person",
        kind: "error",
      });
    }
    clearNotification();
  };

  const handleFilterListByName = (e) => setSearchValue(e.target.value);

  const filteredList = React.useMemo(() => {
    return searchValue === ""
      ? individuals
      : [...(individuals ?? [])].filter((person) =>
          person.name
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase()),
        );
  }, [searchValue, individuals]);

  const deletePerson = async (person) => {
    if (!confirm(`Do you really want to delete ${person.name}?`)) {
      return;
    }
    let newIndividuals = [...individuals];

    try {
      await service.delete(person.id);
      newIndividuals = newIndividuals.filter(
        (individual) => individual.id !== person.id,
      );
      setIndividuals(
        newIndividuals.filter((individual) => individual.id !== person.id),
      );
      setNotification({
        message: "This person has been deleted successfully",
        kind: "confirm",
      });
    } catch (error) {
      setNotification({
        message: "Something went wrong when deleting this person",
        kind: "error",
      });
    }

    clearNotification();
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification {...{ ...notification }} />

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
      <IndividualsList list={filteredList} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
