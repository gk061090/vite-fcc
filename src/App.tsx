import { useCallback, useState } from "react";
import { Datepicker } from "@fcc/ui";
import spacetime from "spacetime";

function App() {
  const minDate = new Date();
  const [value, setValue] = useState(minDate);
  const handleChange = useCallback((_, data) => setValue(data.value), []);

  console.log("st", spacetime.today());

  return <Datepicker value={value} onChange={handleChange} minDate={minDate} />;
}

export default App;
