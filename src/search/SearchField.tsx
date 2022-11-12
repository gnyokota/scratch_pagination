import "./SearchField.css";

type Props = {
  searchTerm: string;
  handleSearchOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SearchField = ({searchTerm, handleSearchOnChange}: Props) => {
  return (
    <input
      className="search"
      type="text"
      value={searchTerm}
      onChange={handleSearchOnChange}
    />
  );
};

export default SearchField;
