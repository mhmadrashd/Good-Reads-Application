import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import "../../styles/ThreeTabs.css"
import Table from './Table';
import axios from 'axios';
import { useState, useLayoutEffect } from 'react';
import AddCategoryModal from './addCategoryModal';
import AddBookModal from './addBookModal';
import AddAuthorModal from './addAuthorModal';
import { useNavigate } from 'react-router'
const URLServer = "http://localhost:3000";

function ThreeTabs() {
  // defining the states for the data 
  const [categoriesData, setCategoriesData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);
  //defining the state of the tab index
  const [tabIndex, setTabIndex] = useState("first");

  // defining the headings of the tables and their corresponding value in the database
  // defining the headings of the categories tables and their corresponding value in the database
  const categoryColumns = [
    { heading: "ID", value: '_id' },
    { heading: "Name", value: 'Name' },
    { heading: "Actions" }
  ]
  // defining the headings of the books tables and their corresponding value in the database
  const bookColumns = [
    { heading: "ID", value: '_id' },
    { heading: "Photo", value: 'img' },
    { heading: "Title", value: 'title' },
    { heading: "CategoryID", value: 'category' },
    { heading: "AuthorID", value: 'auhtor' },
    { heading: "Actions" }
  ]
  // defining the headings of the authors tables and their corresponding value in the database
  const authorsColumn = [
    { heading: "ID", value: '_id' },
    { heading: "First Name", value: 'fName' },
    { heading: "last Name", value: 'lName' },
    { heading: "Date Of Birth", value: 'DOB' },
    { heading: "Photo", value: 'img' },
    { heading: "Actions" }
  ]

  // get request of the data from categories collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/category`, { withCredentials: true, credentials: 'include' })
      .then(response => setCategoriesData(response.data))
      .catch(err => console.log(err))
  }, [])

  // get request of the data from books collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/book`, { withCredentials: true, credentials: 'include' })
      .then(response => setBooksData(response.data))
      .catch(err => console.log(err))
  }, [])

  // get request of the data from authors collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/author`, { withCredentials: true, credentials: 'include' })
      .then(response => setAuthorsData(response.data))
      .catch(err => console.log(err))
  }, [])

  // defining the state of the modals
  // defining the state of the addCategoryModal
  const [categoryModalIsOpen, setCategoryModal] = useState(false);
  const categoryModalClose = () => setCategoryModal(false);
  const categoryModalShow = () => setCategoryModal(true);

  // defining the state of the addBookModal
  const [bookModalIsOpen, setBookModal] = useState(false);
  const bookModalClose = () => setBookModal(false);
  const bookModalShow = () => setBookModal(true);

  // defining the state of the addAuthorModal
  const [authorModalIsOpen, setAuthorModal] = useState(false);
  const authorModalClose = () => setAuthorModal(false);
  const authorModalShow = () => setAuthorModal(true);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/home");
    document.cookie = "Authorization=deleted;max-age=0"
    console.log("asdsads")
  }

  return (
    <div className="threeTabs">
      <button className="logout btn btn-danger" onClick={() => { logout() }}>Logout</button>
      <i className=" plusBtn fa fa-plus fa-1x btn btn-danger me-md-2 rounded-circle float-end"
        onClick={categoryModalShow}></i>

      <Tabs
        defaultActiveKey="first"
        transition={false}
        id="threeTabs"
        className="tabs"
        onSelect={(index) => setTabIndex(index)}
      >

        <Tab eventKey="first" title="Categories" tabClassName='tab' >
          < Table data={categoriesData}
            column={categoryColumns}
            table={tabIndex} />
          {categoryModalIsOpen && <AddCategoryModal state={categoryModalIsOpen}
            onClick={categoryModalClose} />}
        </Tab>

        <Tab eventKey="second" title="Books" >
          <i className="fa fa-plus fa-2x btn btn-danger me-md-2 rounded-circle float-end"
            onClick={bookModalShow}></i>
          <Table data={booksData}
            column={bookColumns}
            table={tabIndex}
            categriesData={categoriesData} authorData={authorsData} />
          {bookModalIsOpen && <AddBookModal state={bookModalIsOpen} onClick={bookModalClose}
            categriesData={categoriesData} authorData={authorsData} />}
        </Tab>

        <Tab eventKey="third" title="Authors" >
          <i className="fa fa-plus fa-2x btn btn-danger me-md-2 rounded-circle float-end"
            onClick={authorModalShow}></i>
          <Table data={authorsData}
            column={authorsColumn}
            table={tabIndex} />
          {authorModalIsOpen && <AddAuthorModal state={authorModalIsOpen} onClick={authorModalClose} />}

        </Tab>
      </Tabs>
    </div>
  );
}

export default ThreeTabs;
