import React from "react";

interface SpecificReceiptProps {
  receiptCodeSelected: {
    index: number | null | undefined;
    receipt_code: string | null | undefined;
  };
}

export const SpecificReceipt: React.FC<SpecificReceiptProps> = ({
  receiptCodeSelected,
}) => {
  return (
    <>
      <h1>Specific</h1>
      <h1>{receiptCodeSelected["receipt_code"]}</h1>
      {/* <h1>{receipt_type}</h1>
      <h2>{vendor}</h2>
      <text>Pick-up time : {delivery_date}</text>
      {item.map((d, i) => {
        return <div>item</div>;
      })} */}
    </>
  );
};

// receipt_type: string;
//   vendor: string;
//   assignment: string;
//   receipt_total: number;
//   delivery_date: string;
//   handleReceiptPageChange: (string: string) => void;
