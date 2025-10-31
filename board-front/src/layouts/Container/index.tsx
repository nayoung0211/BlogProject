import React from "react";
import {Header} from "../Header";
import Footer from "../Footer";
import {Outlet,useLocation} from 'react-router-dom'

export default function Container() {

  //현재 페이지의 path name 상태
  const {pathname} = useLocation();


  return (
      <>
      <Header />
        <Outlet/>
        {pathname !== '/auth' && <Footer/>}
      </>
  )
}