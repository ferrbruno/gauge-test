import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Chart from "./components/Chart";
import { CssBaseline } from "@material-ui/core";

const getUsers = async () => {
  const response = await fetch("/data/users.json");
  const json = await response.json();

  return json;
};

const getInteractions = async () => {
  const response = await fetch("/data/interactions.json");
  const json = await response.json();

  return json;
};

const getData = async () => {
  const users = await getUsers();
  const interactions = await getInteractions();

  return { users, interactions };
};

export default function App() {
  const [users, setUsers] = useState();
  const [interactions, setInteractions] = useState();
  const [filtered, setFiltered] = useState();

  const onFilter = value => {
    setFiltered(interactions.filter(({ brand }) => {
      return value ? brand === value : true;
    }));
  };

  useEffect(() => {
    getData().then(({ users, interactions }) => {
      setUsers(users);
      setInteractions(interactions);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar onFilter={onFilter} />
      <Chart users={users} interactions={filtered || interactions} />
    </>
  );
}
