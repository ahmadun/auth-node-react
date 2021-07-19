import React, { useEffect, useState } from "react";
import Axios from "axios";

import NormalUser from "../components/NormalUser";
import Mod from "../components/Mod";
import Admin from "../components/Admin";

export default function Main() {
  const [role, setRole] = useState("");

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      console.log(response.data.msg);
    });
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
        console.log(response.data.user[0].role);
      } else {
        console.log("ss");
      }
    });
  }, []);

  const ComLogout = () => {
    return <button onClick={logout}></button>;
  };
  return (
    <div>
      {role == "visitor" && <NormalUser />}
      {role == "mod" && <Mod />}
      {role == "admin" && <button onClick={logout}>LOGOUT</button>}
    </div>
  );
}
