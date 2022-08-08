import "./Table.scss";
import TableRow from "../TableRow/TableRow";
import { uid } from "uid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhones } from "../../stores";

export default function Table() {
  const dispatch = useDispatch();
  const phones = useSelector(({ phones }) => phones);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  if (phones.length === 0) {
    return null;
  }

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th className="table__headData">Телефоны</th>
        </tr>
      </thead>
      <tbody>
        {phones.map((phone, i) => (
          <TableRow key={uid()} phone={phone} />
        ))}
      </tbody>
    </table>
  );
}
