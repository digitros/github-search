import React from "react";

import Result from "../components/Result";

import "../assets/styles/Main.styl";
import logo from "../assets/images/gh-logo.png";

const api = "https://api.github.com/search/users?q=";

const Main = () => {
  const [data, setData] = React.useState([]);
  const [input, setInput] = React.useState([]);
  const fetchUsers = (api) => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setData({
          loading: false,
          data: data.items,
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchUsers(`${api}${input.form}`);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setInput({ form: e.target.value });
  };

  return (
    <>
      <div className="Search">
        <img src={logo} alt="GitHub" />
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} placeholder="Search for users" />
          <button type="submit">Search</button>
        </form>
      </div>
      <Result data={data} isRepoProp={false} />
    </>
  );
};

export default Main;
