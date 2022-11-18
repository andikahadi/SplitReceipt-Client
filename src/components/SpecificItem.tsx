import Button from "@mui/material/Button";
import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import styles from "./SpecificItem.module.css";

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
  userFriends: any;
}

export const SpecificItem: React.FC<SpecificItemProps> = ({
  itemData,
  itemIndex,
  receiptCodeSelected,
  handleItemUpdate,
  userFriends,
}) => {
  const [person1, setPerson1] = useState();
  const [person2, setPerson2] = useState();
  const [person3, setPerson3] = useState();
  const [person, setPerson] = useState({});
  const [isItemAssigned, setIsItemAssigned] = useState(false);

  // [
  //   { name: "William", id: 3844740 },
  //   { name: "Albert", id: 5356360 },
  //   { name: "Adrian", id: 5875899 },
  // ];
  const friends = userFriends.map((e) => e.name);
  // ["John", "Mary", "Steven", "Smith"];
  const handlePerson1Change = (event: any) => {
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person1: event.target.value };
      return dict;
    });
    setIsItemAssigned(false);
  };
  const handlePerson2Change = (event: any) => {
    // setPerson2(event.target.value);
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person2: event.target.value };
      return dict;
    });
    setIsItemAssigned(false);
  };
  const handlePerson3Change = (event: any) => {
    // setPerson3(event.target.value);
    setPerson((prevEntry) => {
      const dict = { ...prevEntry, person3: event.target.value };
      return dict;
    });
    setIsItemAssigned(false);
  };

  const handleSubmitClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const arr = Object.values(person);
    const updatedItem = {
      person: arr,
    };
    handleItemUpdate(itemIndex, itemData, updatedItem);
    setIsItemAssigned(true);
  };

  return (
    <div className={styles.itemContainer}>
      {/* <h1>{JSON.stringify(person)}</h1> */}
      <div className={styles.titleContainer}>
        <div className={styles.nameContainer}>
          <div className={styles.qtyContainer}>{itemData.qty}x </div>
          <div>{itemData.name}</div>
        </div>
        ${itemData.total_item_price}
      </div>
      <div className={styles.inputContainer}>
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
      </div>
      <datalist id="friends">
        <option value="You" />
        {friends.sort().map((d, i) => {
          return <option value={d} />;
        })}
      </datalist>
      <div className={styles.buttonContainer}>
        {isItemAssigned && (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmitClick}
          >
            Item is set!
          </Button>
        )}
        {!isItemAssigned && (
          <Button variant="outlined" color="error" onClick={handleSubmitClick}>
            Click to set
          </Button>
        )}
      </div>
      {/* <button onClick={handleSubmitClick}>Set</button> */}
    </div>
    //drop down of friends list
  );
};
