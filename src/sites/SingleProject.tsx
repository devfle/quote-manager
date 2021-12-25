import QuoteForm from "../components/QuoteForm/QuoteForm";
import { Card, CardContent } from "@mui/material";

export default function SingleProject() {
  return (
    <div className="qm-single-project">
      <div className="qm-card-wrapper">
        <QuoteForm />
        <Card className="qm-card">
          <CardContent>
            <h2 className="qm-card__headline">Your Quotes</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
