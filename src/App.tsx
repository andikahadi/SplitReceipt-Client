import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ReceiptList } from "./pages/ReceiptList";
import { History } from "./pages/History";
import { Account } from "./pages/Account";
import { Navbar } from "./components/Navbar";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ReceiptList />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
