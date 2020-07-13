import React, { useEffect } from "react";

import "../assets/styles/Users.styl";
import loading from "../assets/images/loading.gif";
import location from "../assets/images/location.png";
import twitter from "../assets/images/twitter.png";
import bio from "../assets/images/profile.png";

const api = "https://api.github.com/users/";

const User = (props) => {
  const user = props.state.initialState.item;
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const ac = new AbortController();
    const fetchUser = () => {
      Promise.all([
        fetch(`${api}${user.login}`),
        fetch(`${api}${user.login}/orgs`),
      ])
        .then(([user, orgs]) => Promise.all([user.json(), orgs.json()]))
        .then(([userData, orgsData]) => {
          // console.log(userData);
          setData({
            loading: false,
            data: userData,
            orgs: orgsData,
          });
        });
    };
    fetchUser();
    return () => ac.abort();
  }, [user]);

  if (data.data && data.orgs) {
    // console.log(data);
    const usuario = data.data;
    const orgs = data.orgs.map((org) => {
      return (
        <img
          className="User__org--img"
          key={org.id}
          src={org.avatar_url}
          alt={org.login}
        />
      );
    });
    console.log(orgs);
    return (
      <>
        <div className="User__info">
          <img
            className="User__avatar"
            src={usuario.avatar_url}
            alt="usuario.login"
          />
          <h1>{usuario.name || "N/A"}</h1>
          <h2>{usuario.login || "N/A"}</h2>
          <ul>
            <li>
              <img src={bio} alt="Bio" />
              {`${usuario.bio || "N/A"}`}
            </li>
            <li>
              <img src={location} alt="Location" />
              {`${usuario.location || "N/A"} `}
            </li>
            <li>
              <img src={twitter} alt="Twitter" />
              {`${usuario.twitter_username || "N/A"}`}
            </li>
          </ul>
        </div>
        <div className="User__info">
          <h4>Organizations</h4>
          <div>{orgs.length === 0 ? "N/A" : orgs}</div>
        </div>
        <div className="User__info">
          <h4>Stats</h4>
          <ul>
            <li>{`Repos: ${usuario.public_repos}`}</li>
            <li>{`Followers: ${usuario.followers} `}</li>
            <li>{`Following: ${usuario.following}`}</li>
            <li>{`Gists: ${usuario.public_gists}`}</li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <img src={loading} />
      <h1>Loading</h1>
    </>
  );
};

export default User;
