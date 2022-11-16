import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axiosInstance from "../axios";
import { ReceiptListItem } from "../components/ReceiptListItem";
import { SpecificReceipt } from "../components/SpecificReceipt";
import receiptlist from "../data/receiptlist";

interface ReceiptListProps {
  loggedInUser: {
    email: string | null | undefined;
  };
  activeReceiptList: any;
  setActiveReceiptList: any;
  handleDeleteList: (index: number) => void;
  handleUpdateList: (index: number, updatedItem: any) => void;
  userFriends: any;
}
interface ReceiptCodeSelectedType {
  index: number;
  receipt_code: string;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({
  loggedInUser,
  activeReceiptList,
  handleDeleteList,
  handleUpdateList,
  userFriends,
  setActiveReceiptList,
}) => {
  //fetch and store user Splitwise Friends list
  const [receiptPage, setReceiptPage] = useState<string>("list");
  const [receiptCodeSelected, setReceiptCodeSelected] =
    useState<ReceiptCodeSelectedType>({ index: 0, receipt_code: "" });

  const handleReceiptPageChange = (input: string) => {
    setReceiptPage(input);
  };

  const handleReceiptCodeSelectedChange = (input: {
    index: number;
    receipt_code: string;
  }) => {
    setReceiptCodeSelected(input);
  };

  useEffect(() => {
    axiosInstance
      .post("get-receipt/", {
        email: loggedInUser["email"],
        is_assigned: false,
      })
      .then((res) => {
        console.log(res);
        setActiveReceiptList(res.data);
      });
  }, []);

  //render page
  let page;
  if (receiptPage === "list") {
    page = (
      <>
        <h1>Receipt List</h1>
        {activeReceiptList && (
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
        )}
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
          handleDeleteList={handleDeleteList}
          userFriends={userFriends}
          setReceiptPage={setReceiptPage}
          //prop down friendsList
        />
      </>
    );
  } else {
    page = <h1>Error</h1>;
  }

  return page;
};
