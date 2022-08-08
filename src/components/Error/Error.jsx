import "./Error.scss";
import { useSelector } from "react-redux";

export default function Error() {
  const errorMessage = useSelector(({ errorMessage }) => errorMessage);

  return (
    <div className="error">
      <div className="error__message">{errorMessage && errorMessage}</div>
    </div>
  );
}
