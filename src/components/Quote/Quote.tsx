import { FormData } from "../QuoteForm/QuoteForm";

export interface QuoteProps {
  source: string;
  formData: FormData;
}

const Quote: React.FC<QuoteProps> = ({ source, formData }) => {
  const { lastname, firstname, release, title, subtitle, edition, publisher, city, access, url, issue, page, volumne, journalname } = formData;
  const quoteFirstPart = `${lastname ? lastname + "," : "o.V."} ${firstname?.charAt(0) ?? ""} (${release ?? "o.J."}): ${title ? title + "." : ""} ${subtitle ? subtitle + "." : ""}`;

  switch (source) {
    case "book":
      return <span>{`${quoteFirstPart} ${edition ? edition + ". Auflage," : ""} ${publisher ? publisher + "," : ""} ${city ? city + "." : "o.V."}`}</span>;

    case "internet resource":
      return <span>{`${quoteFirstPart} (URL: ${url ?? ""} [letzter Zugriff: ${access ?? ''}]).`}</span>;

    default:
      return <span>{`${quoteFirstPart} ${journalname ? `In: ${journalname},` : ""} ${volumne ? volumne + ". Jg.," : ""} ${issue ? `Heft ${issue},` : ""} ${page ? "S. " + page : ""}.`}</span>;
  }
};

export default Quote;
