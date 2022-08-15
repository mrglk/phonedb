import "./Table.scss";
import TableRow from "../TableRow/TableRow";
import { uid } from "uid";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhones } from "../../stores";
import { API } from "../../http/phoneAPI";

export default function Table() {
  const dispatch = useDispatch();
  const phones = useSelector(({ phones }) => phones);
  console.log(phones);

  useEffect(() => {
    dispatch(fetchPhones());
  }, [dispatch]);

  const subscribe = () => {
    API.longpoll()
      .then(() => {
        dispatch(fetchPhones());
        subscribe();
      })
      .catch((err) => {
        console.error(err);

        setTimeout(() => {
          subscribe();
        }, 100);
      });
  };

  useEffect(() => {
    subscribe();
  }, []);

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
