import { Card, CardContent, Select, Button, TextField, Typography, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";

export default function QuoteForm() {
  const [quoteResource, setQuoteResource] = React.useState("book");
  const quoteForms: Set<string> = new Set(["book", "e-book", "internet resource", "academic journal", "journal"]);
  const resourceList = [...quoteForms].map((_) => (
    <MenuItem value={_} key={_}>
      {_}
    </MenuItem>
  ));

  const handleSelectSwitch = (_: SelectChangeEvent): void => {
    setQuoteResource(_.target.value);
  };

  return (
    <Card className="qm-card">
      <CardContent>
        <Typography sx={{ marginBlockEnd: "16px" }} variant="h5" className="qm-card__headline">
          Insert Quote
        </Typography>
        <Select onChange={handleSelectSwitch} value={quoteResource} className="qm-card__input" label="Book">
          {resourceList}
        </Select>
        <TextField className="qm-card__input" id="outlined-basic" label="Autor" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Release Year" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Title" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Subtitle" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Edition" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Publisher" variant="outlined" />
        <Button variant="contained">Add Quote</Button>
      </CardContent>
    </Card>
  );
}
