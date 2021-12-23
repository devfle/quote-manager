import { Card, CardContent, Select, Button, TextField } from "@mui/material";

export default function QuoteForm() {
  return (
    <Card className="qm-card">
      <CardContent>
        <h2 className="qm-card__headline">Insert Quote</h2>
        <Select className="qm-card__input" label="Book"></Select>
        <TextField className="qm-card__input" id="outlined-basic" label="Autor" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField className="qm-card__input" id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="contained">Add Quote</Button>
      </CardContent>
    </Card>
  );
}
