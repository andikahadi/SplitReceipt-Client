import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { ReceiptListMui } from "../components/ReceiptListMui";
import { SpecificReceiptMui } from "../components/SpecificReceiptMui";
import receiptlist from "../data/receiptlist";

interface ReceiptListProps {
  loggedInUser: {
    email: string | null | undefined;
  };
  activeReceiptList: any;
  setActiveReceiptList: any;
  handleDeleteList: (index: number) => void;
  handleUpdateList: (index: number, updatedItem: any) => void;
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
  setActiveReceiptList,
}) => {
  const nav = useNavigate();
  //fetch and store user Splitwise Friends list
  const [receiptPage, setReceiptPage] = useState<string>("list");
  const [receiptCodeSelected, setReceiptCodeSelected] =
    useState<ReceiptCodeSelectedType>({ index: 0, receipt_code: "" });

  const [userFriends, setUserFriends] = useState([]);

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
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          nav("/login");
        }
      });

    // need an error checking
    let splitwise_access_token = JSON.parse(
      localStorage.getItem("splitwise_access_token")
    );

    axiosInstance
      .post("splitwise-friend/", splitwise_access_token)
      .then((res) => {
        console.log(res);

        setUserFriends(res.data);
      });
  }, []);

  //render page
  let page;
  if (receiptPage === "list") {
    page = (
      <>
        {activeReceiptList && (
          <Row>
            {activeReceiptList.map((d, i) => {
              return (
                // <ReceiptListItem
                //   receipt_code={d.receipt_code}
                //   receipt_type={d.receipt_type}
                //   vendor={d.vendor}
                //   receipt_total={d.receipt_total}
                //   delivery_date={d.delivery_date}
                //   data={d}
                //   index={i}
                //   handleReceiptPageChange={handleReceiptPageChange}
                //   handleReceiptCodeSelectedChange={
                //     handleReceiptCodeSelectedChange
                //   }
                //   handleDeleteList={handleDeleteList}
                // />
                <ReceiptListMui
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
        {/* <SpecificReceipt
          receiptCodeSelected={receiptCodeSelected}
          receipt={activeReceiptList[receiptCodeSelected["index"]]}
          handleUpdateList={handleUpdateList}
          handleDeleteList={handleDeleteList}
          userFriends={userFriends}
          setReceiptPage={setReceiptPage}
          //prop down friendsList
        /> */}
        <SpecificReceiptMui
          receiptCodeSelected={receiptCodeSelected}
          receipt={activeReceiptList[receiptCodeSelected["index"]]}
          handleUpdateList={handleUpdateList}
          handleDeleteList={handleDeleteList}
          userFriends={userFriends}
          setReceiptPage={setReceiptPage}
        />
      </>
    );
  } else {
    page = <h1>Error</h1>;
  }

  return (
    <>
      {!localStorage.getItem("splitwise_access_token") && (
        <p>Please connect to Splitwise at Account page</p>
      )}
      {page}
    </>
  );
};
