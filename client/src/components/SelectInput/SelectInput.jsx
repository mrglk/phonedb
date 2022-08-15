import "./SelectInput.scss";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function SelectInput({ codes, selectedCodeIndex, onSelect }) {
  const animatedComponents = makeAnimated();
  const options = [];

  for (let i = 0; i < codes.length; i++) {
    let newOption = { value: i, label: codes[i].country + " " + codes[i].code };
    options.push(newOption);
  }

  return (
    <Select
      classNamePrefix="customSelect"
      value={options[selectedCodeIndex]}
      onChange={(e) => onSelect(e.value)}
      options={options}
      components={animatedComponents}
    />
  );
}
