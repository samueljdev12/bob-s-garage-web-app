import './App.css'
import Nav from './components/layouts/Nav';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AboutUs from './components/pages/AboutUs';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
// import Register from './components/Register.Jsx';
import Login from './components/User/Login';
import Footer from './components/layouts/Footer';
import Faq from './components/pages/Faq';
import Privacy from './components/pages/Privacy';
import Blog from './components/Blog/Blog';
import Feedback from './components/Feedback/Feedback';
import OurWork from './components/pages/OurWork';
import Account from './components/User/Account';
import SinglePost from './components/Blog/SinglePost';

function App() {


  return (
    <Router>
      <Nav />
      <div className='wrapper'>
      <Routes>
         <Route path='/about_us' element={<AboutUs/>}></Route>
         <Route path='/' element={<Home/>}></Route>
         <Route path='/services' element={<Services/>}></Route>
         {/* <Route path='/register' element={<Register/>}></Route> */}
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/faq' element={<Faq/>}></Route>
         <Route path='/privacy-policy' element={<Privacy/>}></Route>
         <Route path='/blog' element={<Blog/>}></Route>
         <Route path='/testimonials' element={<Feedback/>}></Route>
         <Route path='/our-work' element={<OurWork/>}></Route>
         <Route path='/customer-account' element={<Account/>}></Route>
         <Route path='/blog/post/:postId' element={<SinglePost/>}></Route>
      </Routes>
      </div>
      <Footer/>
    </Router>
  )
}

export default App
