import React from "react";
import "../assets/css/footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <div className="footer">
      <p>Copyright &copy; 2022 ITI-IoT</p>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <a href="#" class="fa fa-facebook"></a>
      <a href="#" class="fa fa-github"></a>
      <a href="#" class="fa fa-linkedin"></a>

    </div>
  );
}
