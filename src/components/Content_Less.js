import React, { useState } from "react";
import "./review.css";
  
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};
  
const Content = () => {
  return (
    <div className="container2">
    
      <h2>
        <ReadMore>
        Maine, 1969. After losing her parents in a car accident, aspiring artist Annalisa Mancuso lives with her grandmother and their large Italian family in the stifling factory town of Payton Mills. Inspired by her mother, whose own artistic dreams disappeared in a damaged marriage, Annalisa is dedicated only to painting. Closed off to love, and driven as much by her innate talent as she is the disillusionment of her past, Annalisa just wants to come into her own.
        </ReadMore>
      </h2>
    </div>
  );
};
  
export default Content;