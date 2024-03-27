import "./css/App.css";
import "./css/dark.css";
import "./css/light.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserHome from "./components/userComps/Pages/UserHome";
import Header from "./components/NavsAndHeaders/Header";
import UserServices from "./components/userComps/Pages/UserServices";
import UserAccount from "./components/userComps/userProfileActions/UserAccount";
import UserTickets from "./components/userComps/Pages/UserTickets";
import CustomerCare from "./components/userComps/Pages/CustomerCare";
import NavContextProvider from "./contexts/NavContext";
import Login from "./components/userComps/userProfileActions/Login";
import Signup from "./components/userComps/userProfileActions/Signup";
import UserContextProvider from "./contexts/UserContext";
import ChangePassword from "./components/userComps/userProfileActions/ChangePassword";
import ChangeEmail from "./components/userComps/userProfileActions/ChangeEmail";
import ChangeAddress from "./components/userComps/userProfileActions/ChangeAddress";
import ChangePhoneNumber from "./components/userComps/userProfileActions/ChangePhoneNumber";
import ChangeProfileImage from "./components/userComps/userProfileActions/ChangeProfileImage";
import SearchResults from "./components/userComps/OrtherComps/SearchResults";
import BookTicketsFather from "./components/userComps/BookingComps/BookTicketsFather";
function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <NavContextProvider>
          <Header />
        </NavContextProvider>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/services" element={<UserServices />} />
          <Route path="/mytickets" element={<UserTickets />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/customer_care" element={<CustomerCare />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/changeEmail" element={<ChangeEmail />} />
          <Route path="/changeAddress" element={<ChangeAddress />} />
          <Route path="/changePhone" element={<ChangePhoneNumber />} />
          <Route path="/changeProfileImage" element={<ChangeProfileImage />} />
          <Route path="/searchResults" element={<SearchResults />} />

          <Route path="/bookTickets" element={<BookTicketsFather />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
