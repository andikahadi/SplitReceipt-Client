import React, { useState } from "react";

interface SpecificItemProps {
  itemData: any;
  itemIndex: number;
  handleItemUpdate: (
    itemIndex: number,
    itemData: any,
    updatedItem: any
  ) => void;
  receiptCodeSelected: {
    index: number;
    receipt_code: string;
  };
}

export const SpecificItem: React.FC<SpecificItemProps> = ({
  itemData,
  itemIndex,
  receiptCodeSelected,
  handleItemUpdate,
}) => {
  const [person1, setPerson1] = useState();
  const [person2, setPerson2] = useState();
  const [person3, setPerson3] = useState();
  const [person, setPerson] = useState({});
  const friends = ["John", "Mary", "Steven", "Smith"];
  const handlePerson1Change = (event: any) => {
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person1: event.target.value };
      return dict;
    });
  };
  const handlePerson2Change = (event: any) => {
    // setPerson2(event.target.value);
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person2: event.target.value };
      return dict;
    });
  };
  const handlePerson3Change = (event: any) => {
    // setPerson3(event.target.value);
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person3: event.target.value };
      return dict;
    });
  };

  const handleSubmitClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const arr = Object.values(person);
    const updatedItem = {
      person: arr,
    };
    handleItemUpdate(itemIndex, itemData, updatedItem);
  };

  return (
    <div>
      {/* <h1>{JSON.stringify(person)}</h1> */}
      {itemData.qty} {itemData.name} ${itemData.total_item_price}
      <input
        list="friends"
        type="text"
        onChange={handlePerson1Change}
        value={person1}
      ></input>
      <input
        list="friends"
        type="text"
        onChange={handlePerson2Change}
        value={person2}
      ></input>
      <input
        list="friends"
        type="text"
        onChange={handlePerson3Change}
        value={person3}
      ></input>
      <datalist id="friends">
        <option value="Me" />
        {friends.sort().map((d, i) => {
          return <option value={d} />;
        })}
      </datalist>
      <button onClick={handleSubmitClick}>Set</button>
    </div>
    //drop down of friends list
  );
};
