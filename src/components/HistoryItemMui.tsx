import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosInstance from "../axios";
import { Box } from "@mui/system";
import { Directions } from "@mui/icons-material";

interface HistoryItemMuiProps {
  receipt_type: string;
  vendor: string;
  assignment: string;
  receipt_total: number;
  delivery_date: string;
}

export const HistoryItemMui: React.FC<HistoryItemMuiProps> = ({
  receipt_type,
  vendor,
  receipt_total,
  delivery_date,
  assignment,
}) => {
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

        <Typography variant="body2" component="div">
          {receipt_type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Pickup time: {delivery_date.slice(0, -5)}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", justifyContent: "right" }}>
          <Button size="small" variant="contained" color="success">
            Assigned as {assignment}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
