import "./css/App.css";
import "./css/dark.css";
import "./css/light.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./Client/contexts/UserContext"
import NavContextProvider from "./Client/contexts/NavContext"
import Header from "./Client/Components/NavsAndHeaders/Header"
import UserTickets from "./Client/Components/userComps/Pages/UserTickets"
import UserAccount from "./Client/Components/userComps/userProfileActions/UserAccount"
import ChangePassword from './Client/Components/userComps/userProfileActions/ChangePassword'
import ChangeEmail from './Client/Components/userComps/userProfileActions/ChangeEmail'
import ChangeAddress from './Client/Components/userComps/userProfileActions/ChangeAddress'
import ChangePhoneNumber from './Client/Components/userComps/userProfileActions/ChangePhoneNumber'
import ChangeProfileImage from './Client/Components/userComps/userProfileActions/ChangeProfileImage'
import UserHome from "./Client/Components/userComps/Pages/UserHome"
import UserServices from "./Client/Components/userComps/Pages/UserServices"
import CustomerCare from "./Client/Components/userComps/Pages/CustomerCare"
import Login from "./Client/Components/userComps/userProfileActions/Login"
import Signup from "./Client/Components/userComps/userProfileActions/Signup"
import SearchResults from "./Client/Components/userComps/OrtherComps/SearchResults"
import BookTicketsFather from "./Client/Components/userComps/BookingComps/BookTicketsFather"
import AdminHome from "./Admin/components/AdminHome"
import AddBus from "./Admin/components/AddBus";
import AddRoutes from "./Admin/components/AddRoutes";
import ModifyBus from "./Admin/components/modifyBus";
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
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/addbus" element={<AddBus/>}   />
          <Route path="/admin/addroutes" element={<AddRoutes/>}   />
          <Route path="/admin/modifybus" element={<ModifyBus/>}   />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>

  );
}

export default App;
