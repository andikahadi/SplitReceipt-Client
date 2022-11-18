import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosInstance from "../axios";
import { Box } from "@mui/system";

interface ReceiptListMuiProps {
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

export const ReceiptListMui: React.FC<ReceiptListMuiProps> = ({
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
    <Card sx={{ width: "95%", mt: 0.7, mx: "auto" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography gutterBottom variant="subtitle1" component="div">
            {vendor}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary">
            ${receipt_total}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" component="div">
              {receipt_type}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {delivery_date.slice(0, -5)}
            </Typography>
          </Box>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-around" }}>
            <Button
              sx={{ mr: 3 }}
              size="small"
              variant="outlined"
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
            <Button size="small" onClick={handleMineClick} variant="outlined">
              Mine
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
