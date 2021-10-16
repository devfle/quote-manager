/* React Dependencies */
import React from "react";

/* Material UI */
import { Box, Card, CardContent, Select, Button, TextField, Typography, MenuItem, SelectChangeEvent, InputLabel, FormControl } from "@mui/material";

interface QuoteFormProps {
  persistFormData: (data: FormData) => void;
}

export interface FormData {
  source: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  release?: string | undefined;
  publisher?: string | undefined;
  city?: string | undefined;
  title?: string | undefined;
  subtitle?: string | undefined;
  edition?: string | undefined;
  year?: string | undefined;
  volumne?: string | undefined;
  issue?: string | undefined;
  page?: string | undefined;
  access?: string | undefined;
  url?: string | undefined;
  journalname?: string | undefined;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ persistFormData }) => {
  const [quoteResource, setQuoteResource] = React.useState<string>("book");
  const [formData, setFormData] = React.useState<FormData | null>(null);
  const quoteForms: Set<string> = new Set(["book", "internet resource", "academic journal"]);

  /* prepare select items */
  const resourceList = [...quoteForms].map(
    (_: string): JSX.Element => (
      <MenuItem value={_} key={_}>
        {_}
      </MenuItem>
    )
  );

  const handleSelectSwitch = (_: SelectChangeEvent): void => {
    setQuoteResource(_.target.value);
    setFormData({
      ...formData,
      source: _.target.value,
    });
  };

  const handleInputData = (_: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      source: quoteResource,
      [_.target.name]: _.target.value,
    });
  };

  const handleFormSubmit = (): void => {
    if (!formData) {
      return;
    }

    persistFormData(formData);
    setFormData(null);
  };

  return (
    <Card sx={{ mb: 2, mx: 1 }} className="qm-card">
      <CardContent sx={{ py: 2, px: 3 }}>
        <Typography sx={{ mb: 2 }} variant="h5" className="qm-card__headline">
          Insert Quote
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth>
            <InputLabel id="source-select-label">source</InputLabel>
            <Select labelId="source-select-label" name="source" sx={{ width: "100%" }} onChange={handleSelectSwitch} value={quoteResource} label="source">
              {resourceList}
            </Select>
          </FormControl>
          <TextField
            onChange={handleInputData}
            sx={{ width: "calc(50% - 8px)" }}
            className="qm-card__input"
            id="outlined-basic"
            value={formData?.firstname ?? ""}
            name="firstname"
            label="Firstname"
            variant="outlined"
          />
          <TextField
            onChange={handleInputData}
            sx={{ width: "calc(50% - 8px)", margin: "8px 0 8px 16px" }}
            id="outlined-basic"
            value={formData?.lastname ?? ""}
            name="lastname"
            label="Lastname"
            variant="outlined"
          />
          <TextField
            onChange={handleInputData}
            sx={{ width: "calc(50% - 8px)" }}
            className="qm-card__input"
            id="outlined-basic"
            value={formData?.release ?? ""}
            name="release"
            label="Release Year"
            variant="outlined"
          />
          {quoteResource === "book" && (
            <>
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(50% - 8px)", margin: "8px 0 8px 16px" }}
                value={formData?.publisher ?? ""}
                name="publisher"
                id="outlined-basic"
                label="Publisher"
                variant="outlined"
              />
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(50% - 8px)", margin: "8px 0 8px 0px" }}
                value={formData?.edition ?? ""}
                name="edition"
                id="outlined-basic"
                label="Edition"
                variant="outlined"
              />
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(50% - 8px)", margin: "8px 0 8px 16px" }}
                value={formData?.city ?? ""}
                name="city"
                id="outlined-basic"
                label="City"
                variant="outlined"
              />
            </>
          )}
          <TextField onChange={handleInputData} sx={{ width: "100%" }} className="qm-card__input" id="outlined-basic" value={formData?.title ?? ""} name="title" label="Title" variant="outlined" />
          <TextField
            onChange={handleInputData}
            sx={{ width: "100%" }}
            className="qm-card__input"
            id="outlined-basic"
            value={formData?.subtitle ?? ""}
            name="subtitle"
            label="Subtitle"
            variant="outlined"
          />
          {(quoteResource === "academic journal" || quoteResource === "journal") && (
            <>
              <TextField
                onChange={handleInputData}
                sx={{ width: "100%" }}
                className="qm-card__input"
                id="outlined-basic"
                value={formData?.journalname ?? ""}
                name="journalname"
                label="Journal Name"
                variant="outlined"
              />
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(33.33% - 12px)", margin: "8px 0" }}
                id="outlined-basic"
                value={formData?.volumne ?? ""}
                name="volumne"
                label="Volumne"
                variant="outlined"
              />
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(33.33% - 12px)", margin: "8px 0 8px 16px" }}
                id="outlined-basic"
                value={formData?.issue ?? ""}
                name="issue"
                label="Issue"
                variant="outlined"
              />
              <TextField
                onChange={handleInputData}
                sx={{ width: "calc(33.33% - 12px)", margin: "8px 0 8px 16px" }}
                id="outlined-basic"
                value={formData?.page ?? ""}
                name="page"
                label="Page (from - to)"
                variant="outlined"
              />
            </>
          )}
          {quoteResource === "internet resource" && (
            <>
              <TextField onChange={handleInputData} sx={{ width: "100%" }} className="qm-card__input" id="outlined-basic" value={formData?.url ?? ""} name="url" label="URL" variant="outlined" />
              <TextField
                onChange={handleInputData}
                sx={{ width: "50%" }}
                className="qm-card__input"
                id="outlined-basic"
                value={formData?.access ?? ""}
                name="access"
                label="Last Access"
                variant="outlined"
              />
            </>
          )}
          <Button disabled={formData ? false : true} onClick={handleFormSubmit} sx={{ width: "100%", marginBlockStart: 1 }} variant="contained">
            Add Quote
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuoteForm;
