import React from "react";
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const componentName = () => {

    //this state used to get image from input type=(file) to upload it to firebase
    const [imageUpload, setImageUpload] = useState(null);
    //this state used to load image to img element after choose image
    const [imageUrls, setImageUrls] = useState([]);
    //this function to upload file after click upload btn
    const uploadFile = () => {
        //if no image uploaded return
        if (imageUpload == null) return;
        /* upload image to storage in firebase to spacific path
        * (images/admin) if upload image for admins
        * (images/user) if upload image for users
        * (images/author) if upload image for authors
        * (images/book) if upload image for books
        * V4 this uuid to generate unique name
        */
        const imageRef = ref(storage, `images/author/${imageUpload.name + v4()}`);
        /*
        * this used to uplaod image as bytes and then 
        * get url from firebase respone
        * get this url and send it with (admin/user/book/author) data to mongoDB
        * set this image to element img preview in upload page
        */
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //send this url with data
                console.log(url)
                //set image to img element in page
                setImageUrls(() => [url]);
            });
        });
    };
    return (
        <div className={styles.container}>

            <input
                type="file"
                onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                }}
            />

            <button onClick={uploadFile}> Upload Image</button>

            {imageUrls.map((url) => {
                return <img src={url} alt="" />;
            })}

        </div>
    );
};

export default componentName;
