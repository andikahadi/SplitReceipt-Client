import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HistoryIcon from "@mui/icons-material/History";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RecentActorsIcon from "@mui/icons-material/RecentActors";

import { Link } from "react-router-dom";

export default function BottomNavBar() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 390 }}>
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Receipts"
            component={Link}
            to="/"
            icon={<ReceiptLongIcon />}
          />
          <BottomNavigationAction
            label="History"
            component={Link}
            to="/history"
            icon={<HistoryIcon />}
          />
          <BottomNavigationAction
            label="Account"
            component={Link}
            to="/account"
            icon={<ManageAccountsIcon />}
          />
          {localStorage.getItem("admin_role") === "true" && (
            <BottomNavigationAction
              label="Users List"
              component={Link}
              to="/userlist"
              icon={<RecentActorsIcon />}
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
