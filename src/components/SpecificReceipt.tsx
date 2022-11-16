import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { SpecificItem } from "./SpecificItem";

interface SpecificReceiptProps {
  receiptCodeSelected: {
    index: number;
    receipt_code: string;
  };
  receipt: any;
  handleUpdateList: (index: number, updatedItem: any) => void;
  handleDeleteList: (index: number) => void;
  setReceiptPage: any;
  userFriends: any;
}

// interface SplitAmountInterface {
//   name: string;
//   amount: number;
// }

export const SpecificReceipt: React.FC<SpecificReceiptProps> = ({
  receiptCodeSelected,
  receipt,
  handleUpdateList,
  handleDeleteList,
  setReceiptPage,
  userFriends,
}) => {
  const [receiptChosen, setReceiptChosen] = useState(receipt);
  const [splitAmount, setSplitAmount] = useState({});

  //calculate subtotal and other fee
  let subTotal = 0;
  for (let item of receipt.item) {
    subTotal += Math.round(parseFloat(item.total_item_price) * 100) / 100;
  }
  let otherFee =
    Math.round((parseFloat(receipt.receipt_total) - subTotal) * 100) / 100; // can be negative due to voucher discount
  console.log(subTotal, otherFee);

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
      let tempSplitAmount = {};
      for (let i = 0; i < receiptChosen.item.length; i++) {
        for (let j = 0; j < receiptChosen.item[i].person.length; j++) {
          if (!(receiptChosen.item[i].person[j] in tempSplitAmount)) {
            let newItem = receiptChosen.item[i].person[j];
            tempSplitAmount[newItem] =
              receiptChosen.item[i].total_item_price /
              receiptChosen.item[i].person.length;
          } else {
            let existingItem = receiptChosen.item[i].person[j];
            let prevAmount = tempSplitAmount[existingItem];
            let newAmount =
              prevAmount +
              receiptChosen.item[i].total_item_price /
                receiptChosen.item[i].person.length;

            tempSplitAmount[existingItem] = newAmount;
          }
        }
      }
      console.log(tempSplitAmount);
      setSplitAmount(tempSplitAmount);

      //need to send [{name: ,id: ,owed: },] as request
      let expenseData = [];
      Object.keys(tempSplitAmount).forEach((key) => {
        let name = key;
        let owed = tempSplitAmount[key];
        let indexInUserFriends = userFriends.map((e) => e.name).indexOf(key);
        let splitwiseId;
        if (name == "Me") {
          splitwiseId = "Me";
        } else {
          splitwiseId = userFriends[indexInUserFriends]["id"];
        }
        let dataTemplate = {
          name: name,
          splitwiseId: splitwiseId,
          owedWithFee:
            owed +
            Math.round((otherFee / Object.keys(tempSplitAmount).length) * 100) /
              100,
        };
        expenseData.push(dataTemplate);
      });
      console.log(expenseData);

      let requestDataForExpense = {
        access_token: JSON.parse(
          localStorage.getItem("splitwise_access_token")
        ),
        expenseData: expenseData,
        vendor: receiptChosen.vendor,
        receipt_total: receiptChosen.receipt_total,
      };

      axiosInstance.post("post-expense/", requestDataForExpense).then((res) => {
        console.log("posting expense");
        console.log(res.data);
      });

      axiosInstance
        .patch("receipt-update/", {
          receipt_code: receiptChosen["receipt_code"],
          assignment: "Split",
        })
        .then((res) => {
          console.log(res.data);
          handleDeleteList(receiptCodeSelected["index"]);
          setReceiptPage("list");
        });
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
            userFriends={userFriends}
          />
        );
      })}
      <p>Receipt total : {receiptChosen.receipt_total}</p>
      <button onClick={(e) => handleCalculateClick()}>Calculate</button>
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
