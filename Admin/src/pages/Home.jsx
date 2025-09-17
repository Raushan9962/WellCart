import React from 'react'
import Nav from '../components/nav.jsx'
import Sidebar from '../components/Sidebar.jsx';

const Home = () => {
  return (
    <div>
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative'>
            <Sidebar/>
          <Nav/>
        
          hello sir my name is  Chor        </div>
    </div>
  )
}

export default Home;