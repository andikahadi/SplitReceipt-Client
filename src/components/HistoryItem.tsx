import React from "react";
import { Button, Card } from "react-bootstrap";

interface HistoryItemProps {
  receipt_type: string;
  vendor: string;
  assignment: string;
  receipt_total: number;
  delivery_date: string;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  receipt_type,
  vendor,
  receipt_total,
  delivery_date,
  assignment,
}) => {
  return (
    <Card>
      <Card.Header>{receipt_type}</Card.Header>
      <Card.Body>
        <Card.Title>{vendor}</Card.Title>
        <Card.Text>${receipt_total}</Card.Text>
        <Card.Text>Pickup time: {delivery_date}</Card.Text>
        <Button variant="primary">{assignment}</Button>
      </Card.Body>
    </Card>
  );
};

// "delivery_date": "22 Aug 22 17:27",
//     "receipt_total": 50.00,
//     "vendor": "Subway - 104AM",
//     "is_assigned": "True",
//     "assignment": "Mine",
//     "item": [{
//         "name": "wrap10",
//         "qty" : 3,
//         "total_item_price" : 9.9
//     },
//     {
//         "name": "wrap11",
//         "qty" : 2,
//         "total_item_price" : 8.9
//     }]
