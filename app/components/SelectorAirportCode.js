import { Fragment, useEffect, useState, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";

function SelectorAirportCode({ data, selected, setSelected, setCode, setNum }) {
  const [query, setQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(data);

  useEffect(() => {
    const querySlice = query.slice(0, 2);
    const updatedFilteredPeople =
      querySlice === ""
        ? data
        : data.filter(
            (person) =>
              person.iata.startsWith(
                querySlice.toUpperCase().replace(/\s+/g, "")
              ) && person.iata.length === 2
          );

    setFilteredPeople(updatedFilteredPeople);

    if (
      updatedFilteredPeople.length === 1 &&
      updatedFilteredPeople[0].iata === querySlice
    ) {
      setCode(updatedFilteredPeople[0]);
      setNum(query.slice(2));
    }
    setSelected({ iata: query });
  }, [query]);

  useEffect(() => {
    setSelected({ iata: "OZ0123" });
  }, []);

  const inputQuery = (input) => {
    if (input.length >= 1 && input.length <= 6) {
      setQuery(input);
    }
  };

  return (
    <div className="">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 ">
          <div className="relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="outline-none border-none py-2 mx-2 w-12 text-base font-bold leading-5 text-gray-900 focus:ring-0 text-center"
              displayValue={(person) => person.iata}
              onChange={(event) => {
                let inputValue = event.target.value.trim();

                let code = "";
                let num = "";
                if (inputValue.length <= 2) {
                  code = inputValue.replace(/[^0-9a-zA-Z]/g, "").toUpperCase();
                } else {
                  code = inputValue.slice(0, 2);
                  num = inputValue.slice(2, 6).replace(/[^0-9]/g, "");
                }

                event.target.value = code + num;
                inputQuery(code + num);
              }}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Combobox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
              {query.length <= 2 &&
              filteredPeople.length === 0 &&
              query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person, index) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? "bg-gray-300 text-black" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.iata}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default SelectorAirportCode;
