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
import { setloginState, setOpenDialog, setRefreshAdmin } from '../../../../Redux/DataSlice';
import { useDispatch, useSelector } from 'react-redux';
import MsgDialogs from '../../../../assets/handleErrors';
const URLServer = "https://goodread-backend.herokuapp.com";

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
  const { refreshAdmin } = useSelector((state) => state.DataReducer);
  const dispatch = useDispatch();
  // get request of the data from categories collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/category`, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(response => {
        setCategoriesData(response.data);
        dispatch(setRefreshAdmin(0))
      })
      .catch(err => console.log(err))
  }, [refreshAdmin])

  // get request of the data from books collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/book`, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(response => {
        setBooksData(response.data)
        dispatch(setRefreshAdmin(0))
      })
      .catch(err => console.log(err))
  }, [refreshAdmin])

  // get request of the data from authors collection and set its state
  useLayoutEffect(() => {
    axios.get(`${URLServer}/author`, {
      headers: {
        token: sessionStorage.getItem("Authorization")
      }
    })
      .then(response => {
        setAuthorsData(response.data)
        dispatch(setRefreshAdmin(0))
      })
      .catch(err => console.log(err))
  }, [refreshAdmin])

  const { openDialog } = useSelector((state) => state.DataReducer);

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
    dispatch(setloginState(false));
    sessionStorage.clear()
    // document.cookie = "Authorization=deleted;max-age=0"
    navigate("/home");
  }

  return (
    <div className="threeTabs">
      <button className="logout btn btn-danger" onClick={() => { logout() }}>Logout</button>
      <Tabs
        defaultActiveKey="first"
        transition={false}
        id="threeTabs"
        className="tabs"
        onSelect={(index) => setTabIndex(index)}
      >

        <Tab eventKey="first" title="Categories" tabClassName='tab' >
          <i className=" plusBtn fa fa-plus fa-1x btn btn-danger me-md-2 rounded-circle float-end"
            onClick={categoryModalShow}></i>
          < Table data={categoriesData}
            column={categoryColumns}
            table={tabIndex} />
          {categoryModalIsOpen && <AddCategoryModal
            state={categoryModalIsOpen}
            close={categoryModalClose}
            onClick={() => { categoryModalClose(); /*dispatch(setOpenDialog(true))*/ }} />}
          {/*console.log(openDialog, categoryModalIsOpen)*/}
          {/*openDialog && !categoryModalIsOpen ?
            <MsgDialogs title="Add Category" msg={"Category added successfully"} state={1} />
          : ""*/}
        </Tab>

        <Tab eventKey="second" title="Books" tabClassName='tab' >
          <i className=" plusBtn fa fa-plus fa-1x btn btn-danger me-md-2 rounded-circle float-end"
            onClick={bookModalShow}></i>
          <Table data={booksData}
            column={bookColumns}
            table={tabIndex}
            categriesData={categoriesData} authorData={authorsData} />
          {bookModalIsOpen && <AddBookModal
            state={bookModalIsOpen}
            onClick={() => { bookModalClose(); /*dispatch(setOpenDialog(true))*/ }}
            close={bookModalClose}
            categriesData={categoriesData}
            authorData={authorsData} />}
          {/*openDialog && !bookModalIsOpen ?
            <MsgDialogs title="Add Book" msg={"Book added successfully"} state={1} />
          : ""*/}
        </Tab>

        <Tab eventKey="third" title="Authors" >
          <i className="plusBtn fa fa-plus fa-1x btn btn-danger me-md-2 rounded-circle float-end"
            onClick={authorModalShow}></i>
          <Table data={authorsData}
            column={authorsColumn}
            table={tabIndex} />
          {authorModalIsOpen &&
            <AddAuthorModal
              state={authorModalIsOpen}
              close={authorModalClose}
              onClick={() => { authorModalClose(); /*dispatch(setOpenDialog(true)) */ }} />}
          {/*openDialog && !authorModalIsOpen ?
            <MsgDialogs title="Add Author" msg={"Author added successfully"} state={1} />
          : ""*/}
        </Tab>
      </Tabs>
    </div>
  );
}

export default ThreeTabs;
