import Person from "./Person";

const List = ({ list, deletePerson }) => {
  return (
    <>
      {list?.map((listItem) => (
        <Person
          key={listItem.id}
          person={listItem}
          deletePerson={deletePerson}
        />
      ))}
    </>
  );
};

export default List;
