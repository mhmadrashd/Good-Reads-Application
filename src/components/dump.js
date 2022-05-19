const  handle_update_review = (event) => {
    setBookInfo({
     newReview: event.target.value,
   });
 }

 const handle_status_reading = (event) => {
   console.log(event.target.value);
   SetStatusReading({
     'readingStatus': event.target.value,
     'bookId': BookInfo.bookId,
    //  'userId': new Cookies().get("currentUser")._id,
   }).then((data)=>{
     console.log(data);
   })
 }

 const handle_add_review = () => {
   // check if review just space or blank
   if((/^ *$/.test(BookInfo.newReview)) || (/^$/.test(BookInfo.newReview))) {
       alert("please enter valid review");
   }
   else {
      //  let currentUser = new Cookies().get('currentUser');
       AddReview({
       'body': BookInfo.newReview,
      //  'userId': currentUser._id,
       'bookId': BookInfo.bookId,
       }).then(data => {
           console.log(data);
           GetReview(BookInfo.bookId).then((reviews)=> {
              setBookInfo({
               newReview : "",
               reviews: reviews,
           });
           alert("Review added successfully");
           })
         });
   }
 }