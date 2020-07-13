import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Repos from "../components/Repos";

import "../assets/styles/Result.styl";

const Result = ({ data, isRepoProp }) => {
  const [currentPage, setPage] = React.useState(1);
  const [isRepo, setIsRepo] = React.useState(isRepoProp);
  const [repo, setRepo] = React.useState([]);
  const users = data.data;
  const userPerPage = 5;
  const pages = [];

  useEffect(() => {
    const ac = new AbortController();

    return () => {
      setIsRepo(false);
      ac.abort();
    };
  }, [data]);

  if (!users) {
    return <div>No hay usuarios</div>;
  }

  const handleUserClick = (item) => {
    setIsRepo(true);
    setRepo(item.repos_url);
  };

  const usuarios = users.map((item) => {
    // console.log(item);
    return (
      <div className="User__container" key={item.id}>
        <div className="User">
          <img src={item.avatar_url} />
          <h3>{item.login}</h3>
        </div>
        <div className="User__github">
          <a href={item.url}>
            <p>View on Github</p>
          </a>
          <Link
            to={{
              pathname: "/",
              state: { item },
            }}
            onClick={() => handleUserClick(item)}
          >
            Quick view
          </Link>
        </div>
      </div>
    );
  });

  const indexOfLastTodo = currentPage * userPerPage;
  const indexOfFirstTodo = indexOfLastTodo - userPerPage;
  const currentTodos = usuarios.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderUsers = currentTodos.map((todo, index) => {
    return <li key={index}>{todo}</li>;
  });

  for (let i = 1; i <= Math.ceil(usuarios.length / userPerPage); i++) {
    pages.push(i);
  }

  const handleClick = (event) => {
    setPage(Number(event.target.id));
  };

  const renderPages = pages.map((number) => {
    return (
      <li
        className={currentPage === number ? "active" : "no"}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });

  if (!isRepo) {
    return (
      <div className="Main__results">
        <div>
          <p>Total results: {users.length}</p>
        </div>
        <div className="Results">{renderUsers}</div>
        <div className="PageList">
          <ul>{renderPages}</ul>
        </div>
      </div>
    );
  }
  if (isRepo) {
    return (
      <div className="Main__results Repos">
        <Repos api={repo} />
      </div>
    );
  }
};

export default Result;
