import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import axiosInstance from "../axios";
import { HistoryItem } from "../components/HistoryItem";
import historyData from "../data/history";

interface HistoryProps {
  loggedInUser: any;
}

export const History: React.FC<HistoryProps> = ({ loggedInUser }) => {
  const [receiptHistoryList, setReceiptHistoryList] = useState();

  useEffect(() => {
    axiosInstance
      .post("get-receipt/", {
        email: loggedInUser["email"],
        is_assigned: true,
      })
      .then((res) => {
        console.log(res);
        setReceiptHistoryList(res.data);
      });
  }, []);

  return (
    <>
      <h1>History</h1>
      {receiptHistoryList && (
        <Row>
          {receiptHistoryList.map((d, i) => {
            return (
              <HistoryItem
                receipt_type={d.receipt_type}
                vendor={d.vendor}
                receipt_total={d.receipt_total}
                delivery_date={d.delivery_date}
                assignment={d.assignment}
              />
            );
          })}
        </Row>
      )}
    </>
  );
};
