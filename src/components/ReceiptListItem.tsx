import React from "react";
import { Button, Card } from "react-bootstrap";
import axiosInstance from "../axios";

interface ReceiptListItemProps {
  receipt_code: string;
  receipt_type: string;
  vendor: string;
  receipt_total: number;
  delivery_date: string;
  data: any;
  index: number;
  handleReceiptPageChange: (input: string) => void;
  handleReceiptCodeSelectedChange: (input: {
    index: number;
    receipt_code: string;
  }) => void;
  handleDeleteList: (index: number) => void;
}

export const ReceiptListItem: React.FC<ReceiptListItemProps> = ({
  receipt_code,
  receipt_type,
  vendor,
  receipt_total,
  delivery_date,
  data,
  index,
  handleReceiptPageChange,
  handleReceiptCodeSelectedChange,
  handleDeleteList,
}) => {
  const handleMineClick = () => {
    axiosInstance
      .patch("receipt-update/", {
        receipt_code: receipt_code,
        assignment: "Mine",
      })
      .then((res) => {
        console.log(res.data);
        handleDeleteList(index);
      });
  };
  return (
    <Card>
      <Card.Header>{receipt_type}</Card.Header>
      <Card.Body>
        <Card.Title>{vendor}</Card.Title>
        <Card.Text>${receipt_total}</Card.Text>
        <Card.Text>Pickup time: {delivery_date}</Card.Text>
        <Button
          variant="primary"
          onClick={() => {
            handleReceiptPageChange("specific");
            handleReceiptCodeSelectedChange({
              index: index,
              receipt_code: receipt_code,
            });
          }}
        >
          Split
        </Button>
        <Button variant="primary" onClick={handleMineClick}>
          Mine
        </Button>
      </Card.Body>
    </Card>
  );
};
