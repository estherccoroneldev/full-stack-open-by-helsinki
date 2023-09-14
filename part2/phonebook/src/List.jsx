import Person from "./Person";

const List = ({ list }) => {
  return (
    <>
      {list?.map((listItem) => (
        <Person key={listItem.id} person={listItem} />
      ))}
    </>
  );
};

export default List;
