const receiptlistData: {
  receipt_code: string;
  receipt_type: string;
  delivery_date: string;
  receipt_total: number;
  assignment: string;
  vendor: string;
  is_assigned: boolean;
  item: { name: string; qty: number; total_item_price: number }[];
}[] = [
  {
    receipt_code: "00000002",
    receipt_type: "Grabfood",
    delivery_date: "22 Aug 22 17:27",
    receipt_total: 50.0,
    vendor: "Subway - 104AM",
    is_assigned: false,
    assignment: "Not Assigned",
    item: [
      {
        name: "wrap10",
        qty: 3,
        total_item_price: 9.9,
      },
      {
        name: "wrap11",
        qty: 2,
        total_item_price: 8.9,
      },
    ],
  },
  {
    receipt_code: "00000004",
    receipt_type: "Grabfood",
    delivery_date: "22 Aug 22 17:27",
    receipt_total: 50.0,
    vendor: "Subway - 104AM",
    is_assigned: false,
    assignment: "Not Assigned",
    item: [
      {
        name: "wrap10",
        qty: 3,
        total_item_price: 9.9,
      },
      {
        name: "wrap11",
        qty: 2,
        total_item_price: 8.9,
      },
    ],
  },
];

export default receiptlistData;
