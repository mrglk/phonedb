import "./TableRow.scss";

export default function TableRow({ phone }) {
  return (
    <tr className="row">
      <td className="row__data">{phone}</td>
    </tr>
  );
}
