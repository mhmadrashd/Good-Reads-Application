import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchBar(props) {
  const [filteredData, setFilteredData] = useState([]);
  /*
    **Types**
    Books
    Categories
    Authors
  */
  const [data, setData] = useState(JSON.parse(sessionStorage.getItem("BooksData")));
  const navigate = useNavigate()

  const navigetion = (value) => {
    props.action();
    return props.type === 'Books' ? navigate(`/book/${value}`) :
      props.type === 'Categories' ? navigate(`/category/${value}`) :
        value.fName + " " + navigate(`/author/${value}`);
  }

  useEffect(() => {
    props.type === "Books" ? setData(JSON.parse(sessionStorage.getItem("BooksData"))) :
      props.type === "Categories" ? setData(JSON.parse(sessionStorage.getItem("CategoriesData"))) :
        setData(JSON.parse(sessionStorage.getItem("AuthorsData")));
  }, [props.type]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
      return props.type === 'Books' ? value.title.toLowerCase().includes(searchWord.toLowerCase()) :
        props.type === 'Categories' ? value.Name.toLowerCase().includes(searchWord.toLowerCase()) :
          value.fName.toLowerCase().includes(searchWord.toLowerCase()) ||
          value.lName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <Search className="mr-3 max-w-[100%] border-1">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ width: "100%" }}
            placeholder="Search...."
            onChange={handleFilter}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <h5 className="dataItem"
                onClick={() => navigetion(value._id)}
                key={key} >
                <p>{props.type === 'Books' ? value.title :
                  props.type === 'Categories' ? value.Name :
                    value.fName + " " + value.lName} </p>
              </h5>
            );
          })}
        </div>
      )
      }
    </div >
  );
}

export default SearchBar;
