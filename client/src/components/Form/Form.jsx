import "./Form.scss";
import * as cx from "classnames";
import { phoneCodes } from "../../config";
import { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../stores";
import SelectInput from "../SelectInput/SelectInput";
import { postPhone } from "../../stores";

export default function Form() {
  const dispatch = useDispatch();
  const codes = phoneCodes;
  const [inputValue, setInputValue] = useState("");
  const [selectedCodeIndex, setSelectedCodeIndex] = useState(0);
  const errorMessage = useSelector(({ errorMessage }) => errorMessage);

  const classInput = cx("form__input", {
    form__input_error: errorMessage,
  });

  const validate = (input) => {
    if (input.length === 0) {
      dispatch(setError("Введите номер"));
      return false;
    }

    if (3 > input.length) {
      dispatch(setError("Слишком короткий номер"));
      return false;
    }

    dispatch(setError(""));
    return true;
  };

  const handleChangeInput = (e) => {
    dispatch(setError(""));
    let value = e.target.value
      .trimStart()
      .replace(/ +/g, " ")
      .replace(/[^\d]/g, "");
    setInputValue(value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(setError(""));

      if (validate(inputValue)) {
        let fullPhone = codes[selectedCodeIndex].code + inputValue;
        dispatch(postPhone(fullPhone));
        setInputValue("");
        dispatch(setError(""));
      }
    },
    [dispatch, validate, setInputValue]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="form__inputs">
          <SelectInput
            codes={codes}
            selectedCodeIndex={selectedCodeIndex}
            onSelect={(e) => setSelectedCodeIndex(e)}
          />
          <input
            className={classInput}
            type="tel"
            name="tel"
            maxLength="10"
            onBlur={(e) => validate(e.target.value)}
            value={inputValue}
            onChange={(e) => handleChangeInput(e)}
          />
        </div>
        <input className="form__button" type="submit" value="Отправить" />
      </div>
    </form>
  );
}
