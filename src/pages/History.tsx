import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";

import { HistoryItemMui } from "../components/HistoryItemMui";
import historyData from "../data/history";

interface HistoryProps {
  loggedInUser: any;
}

export const History: React.FC<HistoryProps> = ({ loggedInUser }) => {
  const [receiptHistoryList, setReceiptHistoryList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("get-receipt/", {
        email: loggedInUser["email"],
        is_assigned: true,
      })
      .then((res) => {
        console.log(res);
        setReceiptHistoryList(res.data);
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          nav("/login");
        }
      });
  }, []);

  return (
    <>
      {receiptHistoryList && (
        <Row>
          {receiptHistoryList.map((d, i) => {
            return (
              // <HistoryItem
              //   receipt_type={d.receipt_type}
              //   vendor={d.vendor}
              //   receipt_total={d.receipt_total}
              //   delivery_date={d.delivery_date}
              //   assignment={d.assignment}
              // />
              <HistoryItemMui
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
