import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="d-flex side-bar">
      <CDBSidebar backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="/" className="text-decoration-none text-white ">
            Home
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent>
          <CDBSidebarMenu>
            <NavLink to="/" className="side-bar-hover">
              <CDBSidebarMenuItem icon="fa-solid fa-book-bookmark" title="All">
                All
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/" title="Read" className="side-bar-hover">
              <CDBSidebarMenuItem icon="book">Read</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/"
              title="Currently Reading"
              className="side-bar-hover"
            >
              <CDBSidebarMenuItem icon="fa-solid fa-book-open-reader">
                Currently Reading
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/" title="Want To Read" className="side-bar-hover">
              <CDBSidebarMenuItem icon="fa-solid fa-book-open">
                Want To Read
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
