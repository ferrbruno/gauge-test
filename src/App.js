import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
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

const buildChart = (users, interactions) => {
  if (!users || !interactions) return;

  const result = users.map(({ id, login: { username: userName } }) => {
    const userInteractions = interactions.filter(({ user }) => {
      return id === user;
    });

    return { userName, userInteractions };
  });

  result.sort((a, b) => b.userInteractions.length - a.userInteractions.length);

  console.log(result);

  const options = {
    chart: {
      type: "column"
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif"
        }
      }
    },
    yAxis: {
      allowDecimals: false,
      title: {
        text: "Interactions"
      }
    },
    title: {
      text: "User Interactions"
    },
    legend: {
      enabled: false
    },
    series: [{
      name: "Interactions",
      data: result.map(({ userName, userInteractions: { length } }) => {
        return [userName, length];
      })
    }],
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: "#FFFFFF",
      align: "right",
      format: "{point.y} Interactions",
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: "13px"
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default function App() {
  const [users, setUsers] = useState();
  const [interactions, setInteractions] = useState();

  useEffect(() => {
    getData().then(({ users, interactions }) => {
      setUsers(users);
      setInteractions(interactions);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      {buildChart(users, interactions)}
    </>
  );
}
