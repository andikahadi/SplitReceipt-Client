import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ReceiptList } from "./pages/ReceiptList";
import { History } from "./pages/History";
import { Account } from "./pages/Account";
import { Navbar } from "./components/Navbar";
import SignUp from "./components/Signup";
import { Authorize } from "./pages/Authorize";
import { Testing } from "./pages/Testing";
import { useState } from "react";
import { Login } from "./components/Login";

interface LoggedInUserInterface {
  email: string | null | undefined;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUserInterface>({
    email: "",
  });
  const [activeReceiptList, setActiveReceiptList] = useState([]);

  const handleLoggedInUserChange = (input: string) => {
    setLoggedInUser({ email: input });
  };

  const handleCreateList = (input: any) => {
    setActiveReceiptList(input);
  };
  // update and delete active receipt list
  const handleUpdateList = (index: number, updatedItem: any) => {
    setActiveReceiptList((prevEntries) => {
      // const arr = [...prevEntries];
      // arr[index] = { ...arr[index], ...updatedItem };
      // return arr;
      const arr = [...prevEntries];
      arr[index] = updatedItem;
      return arr;
    });
    //run fetch patch
  };

  const handleDeleteList = (index: number) => {
    setActiveReceiptList((prevEntry) => {
      const arr = [...prevEntry];
      const filtered = arr.filter((d, i) => i !== index);
      return filtered;
    });
  };

  return (
    <>
      <Navbar />
      {/* <p>{JSON.stringify(loggedInUser)}</p>
      <p>{JSON.stringify(activeReceiptList)}</p> */}
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <ReceiptList
                activeReceiptList={activeReceiptList}
                handleDeleteList={handleDeleteList}
                handleUpdateList={handleUpdateList}
                loggedInUser={loggedInUser}
              />
            }
          />
          <Route path="/authorize" element={<Authorize />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/account"
            element={
              <Account
                loggedInUser={loggedInUser}
                handleCreateList={handleCreateList}
              />
            }
          />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <Login handleLoggedInUserChange={handleLoggedInUserChange} />
            }
          />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
