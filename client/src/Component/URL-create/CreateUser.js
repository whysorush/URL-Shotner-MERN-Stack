import React, { useState } from "react";
import axios from "axios";
const CreateUser = () => {
  const [shortUrl, setshortUrl] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = event.target.url.value;
    console.log("Form submitted", url);
    axios
      .post("http://localhost:8001/url", { url })
      .then((response) => {
        console.log(response.data.id);
        setshortUrl("http://localhost:8001/"+response.data.id, []);
        console.log(shortUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter Url to short : </label>
        <br></br>
        <input type="text" name="url" required />
        <br></br>
        <button>Submit</button>
        <div>{!shortUrl?"":
          <label>Short URL is :  <a href={shortUrl}>{shortUrl}</a></label>
        }
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
