import { Fragment, useEffect, useState, useMemo } from "react";
import { Combobox, Transition } from "@headlessui/react";

function SelectorAirportCode({ data, selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [filteredPeople, setFilteredPeople] = useState(data);

  useEffect(() => {
    const updatedFilteredPeople =
      query === ""
        ? data
        : data.filter(
            (person) =>
              person.iata.startsWith(query.toUpperCase().replace(/\s+/g, "")) &&
              person.iata.length === 2
          );

    setFilteredPeople(updatedFilteredPeople);
  }, [query]);

  const inputQuery = (input) => {
    if (input.length >= 1 && input.length <= 2) {
      setQuery(input);
    }
  };

  return (
    <div className="">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 ">
          <div className="relative cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="outline-none border-none py-2 pl-3 pr-20 mr-2 text-2xl font-bold leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.iata}
              onChange={(event) => {
                let inputValue = event.target.value.trim(); // 앞뒤 공백 제거
                const filteredInput = inputValue
                  .replace(/[^0-9a-zA-Z]/g, "")
                  .slice(0, 2);
                event.target.value = filteredInput;

                inputQuery(filteredInput);
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
              {filteredPeople.length === 0 && query !== "" ? (
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
