import React from "react";
import PropTypes from "prop-types";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CircularProgress, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "calc(100vh - 84px)", // Respect header size
  }
}));

export default function Chart({ users, interactions }) {
  const classes = useStyles();

  if (!users || !interactions)
    return (
      <Container className={classes.container}>
        <CircularProgress size="5vw" />
      </Container>
    );

  const result = users.map(({ id, login: { username: userName } }) => {
    const userInteractions = interactions.filter(({ user }) => {
      return id === user;
    });

    return { userName, userInteractions };
  });

  result.sort((a, b) => b.userInteractions.length - a.userInteractions.length);

  const options = {
    chart: {
      type: window.innerWidth > window.innerHeight ? "column" : "bar",
      events: {
        redraw: function() {
          const { chartWidth: width, chartHeight: height, userOptions } = this;
          const { chart: { type: currentType } } = userOptions;
          const type = width > height ? "column" : "bar";

          if (type !== currentType) {
            this.update({
              chart: {
                type: type
              }
            });
          }
        }
      }
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
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: "13px"
      }
    }
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ className: classes.container }}
    />
  );
}

Chart.propTypes = {
  users: PropTypes.array,
  interactions: PropTypes.array
};