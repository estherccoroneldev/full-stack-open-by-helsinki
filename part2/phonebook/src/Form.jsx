const Form = ({
  handleAddPerson,
  newName,
  handleChangeNewName,
  newNumber,
  handleChangeNewNumber,
}) => {
  return (
    <form onSubmit={handleAddPerson} id="form">
      <div>
        name:{" "}
        <input type="text" value={newName} onChange={handleChangeNewName} />
      </div>
      <div>
        phone number:{" "}
        <input type="text" value={newNumber} onChange={handleChangeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
