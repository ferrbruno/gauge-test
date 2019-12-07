import React, { useState, useEffect } from "react";
import { AppBar, FormControl, FormHelperText, InputLabel, MenuItem, Select, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const getBrands = async () => {
  const response = await fetch("/data/brands.json");
  const json = await response.json();

  return json;
};

export default function NavBar() {
  const classes = useStyles();
  const [brand, setBrand] = useState("");
  const [brandList, setBrandList] = useState("");

  useEffect(() => {
    getBrands().then(data => setBrandList(data));
  }, []);

  const handleChange = ({ target: { value } }) => {
    setBrand(value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Gauge</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel id="brand-select-label">Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            value={brand}
            onChange={handleChange}
          >
            {brand && <MenuItem value="">None</MenuItem>}
            {brandList && brandList.map((item, index) => {
              const { id, name, image } = item;
              return <MenuItem key={index} value={id}>{name}</MenuItem>;
            })}
          </Select>
          <FormHelperText>Filter result by brand</FormHelperText>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}