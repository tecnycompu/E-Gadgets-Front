import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import SummaryApi from './common';
import Context from './context';

function App() {

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    console.log("data-user", dataResponse)
  }

  useEffect(() => {
    /** user Details */
    fetchUserDetails()

  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails // user detail fetch
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>

  );
}

export default App;
