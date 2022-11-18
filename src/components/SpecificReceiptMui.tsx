import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosInstance from "../axios";
import { SpecificItem } from "./SpecificItem";

interface SpecificReceiptMuiProps {
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

export const SpecificReceiptMui: React.FC<SpecificReceiptMuiProps> = ({
  receiptCodeSelected,
  receipt,
  handleUpdateList,
  handleDeleteList,
  setReceiptPage,
  userFriends,
}) => {
  const [receiptChosen, setReceiptChosen] = useState(receipt); // receiptChosen initially contains receipt info, and will get additional info of person the items are assigned to
  const [splitAmount, setSplitAmount] = useState({}); // will store info on owedAmount {name:owedAmount, name:owedAmount}
  const [text, setText] = useState([]);
  //calculate subtotal and other fee
  let subTotal = 0;
  for (let item of receipt.item) {
    subTotal += Math.round(parseFloat(item.total_item_price) * 100) / 100;
  }
  let otherFee =
    Math.round((parseFloat(receipt.receipt_total) - subTotal) * 100) / 100; // can be negative due to voucher discount
  // console.log(subTotal, otherFee);

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

  const handleCheckClick = () => {
    console.log(splitAmount);
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

      let expenseData = [];
      Object.keys(tempSplitAmount).forEach((key) => {
        let name = key;
        let owed = tempSplitAmount[key];
        let indexInUserFriends = userFriends.map((e) => e.name).indexOf(key);
        let splitwiseId;
        if (name == "You") {
          splitwiseId = "You";
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

      setText([`You paid $${receiptChosen.receipt_total}`]);
      for (let user of expenseData) {
        console.log(user);

        console.log(
          `${user.name} owes ${tempSplitAmount[user.name]}, other fee ${
            Math.round((otherFee / Object.keys(tempSplitAmount).length) * 100) /
            100
          }, total $${user.owedWithFee}`
        );
        setText((prevState) => {
          let newArr = [...prevState];
          newArr.push(
            `${user.name} owes ${tempSplitAmount[user.name]}, other fee ${
              Math.round(
                (otherFee / Object.keys(tempSplitAmount).length) * 100
              ) / 100
            }, total $${user.owedWithFee}`
          );
          return newArr;
        });
      }
    }
  };

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
        if (name == "You") {
          splitwiseId = "You";
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
    <Card sx={{ width: "100%", mt: 1, pb: 5 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            {receiptChosen.vendor}
          </Typography>
          <Typography variant="h6" component="div">
            ${receiptChosen.receipt_total}
          </Typography>
        </Box>
        <Typography color="text.secondary">
          {receiptChosen.receipt_type}
        </Typography>
        <Typography color="text.secondary">
          Pick-up time : {receiptChosen.delivery_date.slice(0, -5)}
        </Typography>
      </CardContent>
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
      <div style={{ whiteSpace: "pre-wrap", paddingLeft: 16 }}>
        {text.join("\n")}
      </div>
      <CardActions>
        <Button size="large" onClick={(e) => handleCheckClick()}>
          Check split amount
        </Button>
      </CardActions>
      <div>
        <Button
          size="large"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={(e) => handleCalculateClick()}
        >
          Split Receipt in Splitwise
        </Button>
      </div>
    </Card>
  );
};

{
  /* <h1>Specific</h1>
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
<button onClick={(e) => handleCalculateClick()}>Calculate</button> */
}
