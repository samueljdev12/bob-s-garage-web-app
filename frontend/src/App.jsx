import './App.css'
import Nav from './components/layouts/Nav';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AboutUs from './components/pages/AboutUs';
import Home from './components/pages/Home';
import Services from './components/Services/Services';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Footer from './components/layouts/Footer';
import Faq from './components/pages/Faq';
import Privacy from './components/pages/Privacy';
import Feedback from './components/Feedback/Feedback';
import Account from './components/User/Account';
import AddService from './components/Admin/Services/AddService';
import AddFeedback from './components/Feedback/Add_Feedback';
import FeedbackList from './components/Admin/Feedback/FeedbackList';
import ServiceList from './components/Admin/Services/ServiceList';
import Header from './components/Admin/layouts/Header';
import EditFeedback from './components/Feedback/EditFeedback';
import EditService from './components/Admin/Services/EditSerrvices';
import EditProfile from './components/User/EditProfile';


//themes
import { toggleTheme, selectTheme } from '../reducers/ThemeSlice';
import {useSelector, useDispatch} from "react-redux";
import NotFound from './components/pages/NotFound';



function App() {

const isAdmin = localStorage.getItem("isAdmin");
const theme = useSelector(selectTheme);

  return (
    <Router>

      {isAdmin  === "true" ? <Header/> : <Nav/>}
      {/* <GlobalStyles/> */}
    <div className={`App ${theme}`}>
      <div className='wrapper'>
      <Routes>
         <Route path='/about_us' element={<AboutUs/>}></Route>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/services' element={<Services/>}></Route>
         {<Route path='/register' element={<Register/>}></Route> }
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/user/edit' element={<EditProfile/>}></Route>
         <Route path='/faq' element={<Faq/>}></Route>
         <Route path='/privacy-policy' element={<Privacy/>}></Route>
         <Route path='/testimonials' element={<Feedback/>}></Route>
         <Route path='/customer-account' element={<Account/>}></Route>
         <Route path='/testimonials/new' element={<AddFeedback/>}></Route>
         <Route path='/testimonials/edit/:id' element={<EditFeedback/>}></Route>
         
         {/* admin routes */}
         <Route path='/admin/add_service' element={<AddService/>}></Route>
         <Route path='/admin/feedbacks' element={<FeedbackList/>}></Route>
          <Route path='/admin/services' element={<ServiceList/>}></Route>
          <Route path='/admin/services/service/edit/:id' element={<EditService/>}></Route>

          {/* Not found */}
          <Route path="*" element={<NotFound/>} />
      </Routes>
      </div>
      </div>
      <Footer/>

    </Router>
  )
}

export default App
