import React, { useEffect } from "react";

import "../assets/styles/Repos.styl";
import loading from "../assets/images/loading.gif";
import fork from "../assets/images/fork.png";

const Repos = ({ api }) => {
  const [repos, setRepos] = React.useState(0);

  useEffect(() => {
    const ac = new AbortController();
    const signal = ac.signal;
    const fetchRepo = (api) => {
      fetch(api, { signal })
        .then((response) => response.json())
        .then((data) => {
          setRepos({
            loading: false,
            repos: data,
          });
        });
    };
    fetchRepo(api);
    return () => ac.abort();
  }, [repos]);

  if (repos !== 0) {
    return repos.repos.map((repo) => {
      //   console.log(repo);
      return (
        <div className="Repo" key={repo.id}>
          <li>
            <a href={repo.html_url} rel="noreferrer" target="_blank">
              <h3>{repo.name}</h3>
            </a>
          </li>
          <li>
            <p>{repo.description}</p>
          </li>
          <li>
            <p>{repo.language}</p>
          </li>
          <li>
            <img src={fork} alt="Forks" />
            <p>{repo.forks}</p>
          </li>
        </div>
      );
    });
  }
  return (
    <>
      <img src={loading} />
      <h1>Loading</h1>
    </>
  );
};

export default Repos;
