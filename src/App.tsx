import { useCallback, useState } from "react";
import { Datepicker } from "@fcc/ui";
import spacetime from "spacetime";
import { getMinMaxEarlyRepaymentDatePicker } from "./utils";

function App() {
  const { minDate, maxDate } = getMinMaxEarlyRepaymentDatePicker([
    "2022-08-27",
    "2022-08-28",
  ]);
  const [value, setValue] = useState(minDate);
  const handleChange = useCallback((_, data) => setValue(data.value), []);

  console.log("st now", spacetime.now().toNativeDate());

  return (
    <Datepicker
      value={value}
      onChange={handleChange}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
}

export default App;
