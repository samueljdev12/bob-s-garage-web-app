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
import Blog from './components/Blog/Blog';
import Feedback from './components/Feedback/Feedback';
import Account from './components/User/Account';
import SinglePost from './components/Blog/SinglePost';
import AddPost from './components/Admin/Blog/AddPos';
import AddService from './components/Admin/Services/AddService';
import AddFeedback from './components/Feedback/Add_Feedback';
import FeedbackList from './components/Admin/Feedback/FeedbackList';
import PostList from './components/Admin/Blog/PostList';
import ServiceList from './components/Admin/Services/ServiceList';
import Header from './components/Admin/layouts/Header';
import EditPost from './components/Admin/Blog/EditPost';


function App() {

console.log(localStorage.getItem("isAdmin"));
const isAdmin = localStorage.getItem("isAdmin");
  return (
    <Router>
      {isAdmin  === "true" ? <Header/> : <Nav/>}
      <div className='wrapper'>
      <Routes>
         <Route path='/about_us' element={<AboutUs/>}></Route>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/services' element={<Services/>}></Route>
         {<Route path='/register' element={<Register/>}></Route> }
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/faq' element={<Faq/>}></Route>
         <Route path='/privacy-policy' element={<Privacy/>}></Route>
         <Route path='/blog' element={<Blog/>}></Route>
         <Route path='/testimonials' element={<Feedback/>}></Route>
         <Route path='/customer-account' element={<Account/>}></Route>
         <Route path='/blog/post/:postId' element={<SinglePost/>}></Route>
         <Route path='/testimonials/new' element={<AddFeedback/>}></Route>
         {/* admin routes */}
         <Route path='/admin/add_post' element={<AddPost/>}></Route>
         <Route path='/admin/add_service' element={<AddService/>}></Route>
         <Route path='/admin/feedbacks' element={<FeedbackList/>}></Route>
          <Route path='/admin/posts' element={<PostList/>}></Route>
          <Route path='/admin/services' element={<ServiceList/>}></Route>
          <Route path='/admin/post/edit/:id' element={<EditPost/>}></Route>
         
      </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App
