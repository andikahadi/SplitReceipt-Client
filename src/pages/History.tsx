import React from "react";
import { Row } from "react-bootstrap";
import { HistoryItem } from "../components/HistoryItem";
import historyData from "../data/history";

interface HistoryProps {}

export const History: React.FC<HistoryProps> = ({}) => {
  return (
    <>
      <h1>History</h1>
      <Row>
        {historyData.map((d, i) => {
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
    </>
  );
};
