import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { ReceiptListItem } from "../components/ReceiptListItem";
import { SpecificReceipt } from "../components/SpecificReceipt";
import receiptlist from "../data/receiptlist";

interface ReceiptListProps {}
interface ReceiptCodeSelectedType {
  index: number;
  receipt_code: string;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({}) => {
  //fetch and store user Splitwise Friends list
  const [receiptPage, setReceiptPage] = useState<string>("list");
  const [receiptCodeSelected, setReceiptCodeSelected] =
    useState<ReceiptCodeSelectedType>({ index: 0, receipt_code: "" });
  const [activeReceiptList, setActiveReceiptList] = useState(receiptlist);

  const handleReceiptPageChange = (input: string) => {
    setReceiptPage(input);
  };
  const handleReceiptCodeSelectedChange = (input: {
    index: number;
    receipt_code: string;
  }) => {
    setReceiptCodeSelected(input);
  };

  // update and delete active receipt list
  const handleUpdateList = (index: number, updatedItem: any) => {
    setActiveReceiptList((prevEntries) => {
      // const arr = [...prevEntries];
      // arr[index] = { ...arr[index], ...updatedItem };
      // return arr;
      const arr = [...prevEntries];
      arr[index] = updatedItem;
      return arr;
    });
    //run fetch patch
  };

  const handleDeleteList = (index: number) => {
    setActiveReceiptList((prevEntry) => {
      const arr = [...prevEntry];
      const filtered = arr.filter((d, i) => i !== index);
      return filtered;
    });
  };

  //render page
  let page;
  if (receiptPage === "list") {
    page = (
      <>
        <h1>Receipt List</h1>
        <Row>
          {activeReceiptList.map((d, i) => {
            return (
              <ReceiptListItem
                receipt_code={d.receipt_code}
                receipt_type={d.receipt_type}
                vendor={d.vendor}
                receipt_total={d.receipt_total}
                delivery_date={d.delivery_date}
                data={d}
                index={i}
                handleReceiptPageChange={handleReceiptPageChange}
                handleReceiptCodeSelectedChange={
                  handleReceiptCodeSelectedChange
                }
                handleDeleteList={handleDeleteList}
              />
            );
          })}
        </Row>
      </>
    );
  } else if (receiptPage === "specific") {
    page = (
      <>
        {/* <p>{JSON.stringify(activeReceiptList)}</p> */}
        <SpecificReceipt
          receiptCodeSelected={receiptCodeSelected}
          receipt={activeReceiptList[receiptCodeSelected["index"]]}
          handleUpdateList={handleUpdateList}
          //prop down friendsList
        />
      </>
    );
  } else {
    page = <h1>Error</h1>;
  }

  return page;
};
