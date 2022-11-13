import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { ReceiptListItem } from "../components/ReceiptListItem";
import { SpecificReceipt } from "../components/SpecificReceipt";
import receiptlist from "../data/receiptlist";

interface ReceiptListProps {}
interface ReceiptCodeSelectedType {
  index: number | null | undefined;
  receipt_code: string | null | undefined;
}

export const ReceiptList: React.FC<ReceiptListProps> = ({}) => {
  const [receiptPage, setReceiptPage] = useState<string>("list");
  const [receiptCodeSelected, setReceiptCodeSelected] =
    useState<ReceiptCodeSelectedType>({ index: null, receipt_code: null });
  const handleReceiptPageChange = (input: string) => {
    setReceiptPage(input);
  };
  const handleReceiptCodeSelectedChange = (input: {
    index: number | null | undefined;
    receipt_code: string | null | undefined;
  }) => {
    setReceiptCodeSelected(input);
  };

  let page;
  if (receiptPage === "list") {
    page = (
      <>
        <h1>Receipt List</h1>
        <Row>
          {receiptlist.map((d, i) => {
            return (
              <ReceiptListItem
                receipt_code={d.receipt_code}
                receipt_type={d.receipt_type}
                vendor={d.vendor}
                receipt_total={d.receipt_total}
                delivery_date={d.delivery_date}
                assignment={d.assignment}
                index={i}
                handleReceiptPageChange={handleReceiptPageChange}
                handleReceiptCodeSelectedChange={
                  handleReceiptCodeSelectedChange
                }
              />
            );
          })}
        </Row>
      </>
    );
  } else if (receiptPage === "specific") {
    page = <SpecificReceipt receiptCodeSelected={receiptCodeSelected} />;
  } else {
    page = <h1>Error</h1>;
  }

  return page;
};
