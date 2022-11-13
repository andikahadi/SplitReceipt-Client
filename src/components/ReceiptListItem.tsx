import React from "react";
import { Button, Card } from "react-bootstrap";

interface ReceiptListItemProps {
  receipt_code: string;
  receipt_type: string;
  vendor: string;
  assignment: string;
  receipt_total: number;
  delivery_date: string;
  index: number;
  handleReceiptPageChange: (input: string) => void;
  handleReceiptCodeSelectedChange: (input: {
    index: number | null | undefined;
    receipt_code: string | null | undefined;
  }) => void;
}

export const ReceiptListItem: React.FC<ReceiptListItemProps> = ({
  receipt_code,
  receipt_type,
  vendor,
  assignment,
  receipt_total,
  delivery_date,
  index,
  handleReceiptPageChange,
  handleReceiptCodeSelectedChange,
}) => {
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
        <Button variant="primary">Mine</Button>
      </Card.Body>
    </Card>
  );
};
