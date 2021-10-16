import { render, screen } from "@testing-library/react";
import Quote from "./Quote";
import { FormData } from "../QuoteForm/QuoteForm";

describe("tests the quotes", () => {
  const formData: FormData = {
    source: "book",
    firstname: "Test",
    lastname: "User",
    release: "2022",
    publisher: "Test",
    city: "Paris",
    title: "This is the Quote Manager",
    subtitle: "",
    edition: "2",
    url: "www.github.com",
    access: "27.06.2022",
    journalname: "Test Journal",
    volumne: "2",
    issue: "4",
    page: "200-212",
  };
  it("test book source", () => {
    render(<Quote source="book" formData={formData} />);
    expect(screen.getByText("User, T (2022): This is the Quote Manager. 2. Auflage, Test, Paris.")).toBeInTheDocument();
  });
  it("test internet resource", () => {
    formData.source = "internet resource";
    render(<Quote source="internet resource" formData={formData} />);
    expect(screen.getByText("User, T (2022): This is the Quote Manager. (URL: www.github.com [letzter Zugriff: 27.06.2022]).")).toBeInTheDocument();
  });
  it("test academic journal source", () => {
    formData.source = "journal";
    render(<Quote source="journal" formData={formData} />);
    expect(screen.getByText("User, T (2022): This is the Quote Manager. In: Test Journal, 2. Jg., Heft 4, S. 200-212.")).toBeInTheDocument();
  });
});
