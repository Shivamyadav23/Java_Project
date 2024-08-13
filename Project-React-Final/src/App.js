import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
// Lazy-loaded pages

const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const LoginPage = React.lazy(() => import('./pages/Login'));
const UserForm = React.lazy(() => import('./pages/UserForm'));
const DropdownPage = React.lazy(() => import('./pages/DropDownPage'));
const Configure1 = React.lazy(() => import('./pages/Configure1'));
const Configure2 = React.lazy(() => import('./pages/Configure2'));
const ConfirmOrder = React.lazy(() => import('./pages/ConfirmOrder'));
const AccountCreatedResponse = React.lazy(() => import('./pages/AccountCreatedResponse'));
const Logic1 = React.lazy(() => import('./pages/Logic1'));
const InvoicePage = React.lazy(() => import('./pages/InvoicePage'));

const MyFetch = React.lazy(()=>import ('./pages/MyFetch'));

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<UserForm />} />
          <Route path='/dropdownpage' element={<DropdownPage />} />
          <Route path='/configure1' element={<Configure1 />} />
          <Route path='/configure2' element={<Configure2 />} />
          <Route path='/confirmorder' element={<ConfirmOrder />} />
          <Route path='/accountcreatedresponse' element={<AccountCreatedResponse />} />
          <Route path='/logic1' element={<Logic1 />} />
          <Route path='/invoicePage' element={<InvoicePage />} />
          
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path='/myFetch' element={<MyFetch />} />
        </Routes>
      </Suspense>
      <FooterWithConditionalRender />
    </BrowserRouter>
  );
}
//Ignoring footer for this pages
function FooterWithConditionalRender() {
  const location = useLocation();
  const noFooterRoutes = ['/dropdownpage', '/register', '/configure1', '/configure2', '/confirmorder']; // Routes where Footer should not be displayed

  if (noFooterRoutes.includes(location.pathname.toLowerCase())) {
    return null; // Do not render Footer
  }

  return <Footer />; // Render Footer for other routes
}

export default App;
