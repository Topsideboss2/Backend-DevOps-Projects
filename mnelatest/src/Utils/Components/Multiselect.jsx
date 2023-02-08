import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, makeStyles } from "@mui/material";
import React, { useState } from "react";



const names = [
  { id: "1", value: "Oliver Hansen" },
  { id: "2", value: "Van Henry" },
  { id: "3", value: "Van Henry" }
];

export default function MultiselectField({array,reportsData}) {
    console.log("eveny", array);
  const classes =null
  const [personName, setPersonName] = React.useState([]);
  const [report, setReport] = useState([]);
  const handleChange = (event) => {
    
    const {
      target: { value }
    } = event;
    setReport((prev) => ([ event.target]));

    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    reportsData(typeof value === "string" ? value.split(",") : value)
    console.log(report);
  };

  return (
    <div>
      <FormControl style={{minWidth: "100%"}}>
        <InputLabel htmlFor="age-native-simple">
         Select Dynamic Field
        </InputLabel>
        <Select
        
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          name="first"
          onChange={handleChange}
          input={<OutlinedInput label="Tag" fullWidth/>}
          renderValue={(selected) =>
         
            // selected.map((obj) => array[obj - 1].name).join(", ")
            selected.map((obj) => array.find(x=>x.id ===obj).name).join(", ")
          }
        >
          {array.map((name) => (
            <MenuItem key={name.id} value={name.id}>
              <Checkbox checked={personName.indexOf(name.id) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
