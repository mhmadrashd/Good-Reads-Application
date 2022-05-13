import React from 'react';
import Image from 'react-bootstrap/Image';
import userlogo from '../assets/userimages/userlogo.png';
const UserLogoComponent = () => {
  return (
    <div className="d-flex m-2">
      <Image roundedCircle src={userlogo} width={80} height={80} />
      <button className="btn btn-outline-success m-2" title="logout">
        <i className="fa fa-sign-out " aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default UserLogoComponent;
