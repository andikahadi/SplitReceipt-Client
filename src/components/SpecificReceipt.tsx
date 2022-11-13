import React, { useEffect, useState } from "react";
import { SpecificItem } from "./SpecificItem";

interface SpecificReceiptProps {
  receiptCodeSelected: {
    index: number;
    receipt_code: string;
  };
  receipt: any;
  handleUpdateList: (index: number, updatedItem: any) => void;
}

export const SpecificReceipt: React.FC<SpecificReceiptProps> = ({
  receiptCodeSelected,
  receipt,
  handleUpdateList,
}) => {
  const [receiptChosen, setReceiptChosen] = useState(receipt);
  const [splitAmount, setSplitAmount] = useState({});
  const handleItemUpdate = (
    itemIndex: number,
    itemData: any,
    updatedItem: any
  ) => {
    setReceiptChosen((prevEntries: any) => {
      const dict = { ...prevEntries };
      dict.item[itemIndex] = { ...itemData, ...updatedItem };
      return dict;
    });
  };

  useEffect(() => {
    handleUpdateList(receiptCodeSelected["index"], receiptChosen);
  }, [receiptChosen]);

  const handleCalculateClick = () => {
    let isSet = true;
    let i = 0;
    while (isSet && i < receiptChosen.item.length) {
      isSet = receiptChosen.item[i].hasOwnProperty("person");
      i += 1;
    }
    if (isSet == true) {
      for (let i = 0; i < receiptChosen.item.length; i++) {
        for (let j = 0; j < receiptChosen.item[i].person.length; j++) {
          if (!(receiptChosen.item[i].person[j] in splitAmount)) {
            setSplitAmount((prevState) => {
              let newItem = receiptChosen.item[i].person[j];
              const dict = { ...prevState };
              dict[newItem] =
                receiptChosen.item[i].total_item_price /
                receiptChosen.item[i].person.length;
              return dict;
            });
          } else {
            setSplitAmount((prevState) => {
              const dict = { ...prevState };
              let existingItem = receiptChosen.item[i].person[j];
              const prevAmount = dict[existingItem];
              const newAmount =
                prevAmount +
                receiptChosen.item[i].total_item_price /
                  receiptChosen.item[i].person.length;
              dict[existingItem] = newAmount;
              return dict;
            });
          }
        }
      }
    } else {
      alert("Please assign all items");
    }
  };

  return (
    <>
      <h1>Specific</h1>
      <p>{JSON.stringify(receiptChosen)}</p>
      <p>{JSON.stringify(splitAmount)}</p>
      <h1>{receiptChosen.receipt_type}</h1>
      <h2>{receiptChosen.vendor}</h2>
      <p>Pick-up time : {receiptChosen.delivery_date}</p>

      {receiptChosen.item.map((data: any, index: number) => {
        return (
          <SpecificItem
            itemData={data}
            itemIndex={index}
            receiptCodeSelected={receiptCodeSelected}
            handleItemUpdate={handleItemUpdate}
          />
        );
      })}
      <p>Receipt total : {receiptChosen.receipt_total}</p>
      <button onClick={(e) => handleCalculateClick()}>Calculate</button>
    </>
  );
};

// receipt_type: string;
//   vendor: string;
//   assignment: string;
//   receipt_total: number;
//   delivery_date: string;
//   handleReceiptPageChange: (string: string) => void;
