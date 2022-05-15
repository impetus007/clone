import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";

function Form() {
  const [show, setShow] = useState(0);
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [res1, setRes1] = useState([]);
  const [res2, setRes2] = useState([]);
  const [res3, setRes3] = useState([]);
  const [res4, setRes4] = useState([]);
  const [res5, setRes5] = useState([]);
  const [res6, setRes6] = useState([]);
  const [res7, setRes7] = useState([]);
  const [res8, setRes8] = useState([]);
  const [res9, setRes9] = useState([]);

  const Access_Key = "GoYpg5xw0sWJ0H5b_u4evHhb-XfiahwA5aqXW7SrV_s";

  const changePhoto = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}`
      )
      .then((response) => {
        console.log(response.data.results[0].urls.small);
        setRes(response.data.results[0].urls.small);
        setRes1(response.data.results[1].urls.small);
        setRes2(response.data.results[2].urls.small);
        setRes3(response.data.results[3].urls.small);
        setRes4(response.data.results[4].urls.small);
        setRes5(response.data.results[5].urls.small);
        setRes6(response.data.results[6].urls.small);
        setRes7(response.data.results[7].urls.small);
        setRes8(response.data.results[8].urls.small);
        setRes9(response.data.results[9].urls.small);
      });
    // setImg("");
    setShow(1);
  };

  return (
    <>
      <div className="form">
        <input
          className="input"
          value={img}
          type="text"
          placeholder="Search anything..."
          onChange={(e) => setImg(e.target.value)}
        ></input>
        <button className="btn" onClick={changePhoto} type="submit">
          Search
        </button>
      </div>
      {show === 1 && (
        <div class="imgs">
          <img class="a" src={res} />
          <img class="a" src={res1} />
          <img class="a" src={res2} />
          <img class="a" src={res3} />
          <img class="a" src={res4} />
          <img class="a" src={res5} />
          <img class="a" src={res6} />
          <img class="a" src={res7} />
          <img class="a" src={res8} />
          <img class="a" src={res9} />
        </div>
      )}
    </>
  );
}

export default Form;
