import { useState, ReactElement } from "react";
import { SearchProps, ILocation, IOption } from "../interfaces";
import AsyncSelect from "react-select/async";
import axios from "axios";

export function AsyncSearchBar({
  setCity,
  backendUrl,
}: SearchProps): ReactElement {
  // https://dev.to/wlytle/implementing-a-searchable-async-dropdown-in-react-5hce

  const [timeoutId, setTimeoutId] = useState<number>(0);

  // fetch filters search results for dropdown
  const loadOptions = (
    inputValue: string,
    callback: (options: IOption[]) => void
  ) => {
    // Need to explicitly use the "window" version fo setTimeout to avoid confusion between NodeJs and browser versions
    window.clearTimeout(timeoutId); //setting timeout to wait to send API request 1 second after user stops typing

    const newTimeoutId = window.setTimeout(() => {
      axios.get(`${backendUrl}/cities/${inputValue}`).then((resp) => {
        const options = resp.data.map((loc: ILocation) => ({
          value: loc.display_name,
          label: loc.display_name,
        }));

        callback(options); // provide fetched options to AsyncSelect component
      });
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const handleChange = (value: IOption | null) => {
    const city = value!.label;
    setCity(city);
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      onChange={handleChange}
      placeholder="Enter city name...."
    />
  );
}
