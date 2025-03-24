import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FaAngleDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import clsx from "clsx";

export default function ExpiringTime({
  selectedTime,
  setSelectedTime,
  expiringtimes,
}: {
  selectedTime: { id: number; name: string };
  setSelectedTime: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }>
  >;
  expiringtimes: { id: number; name: string }[];
}) {
  return (
    <div className="mx-auto w-full">
      <Listbox value={selectedTime} onChange={setSelectedTime}>
        <ListboxButton
          className={clsx(
            "relative block w-full rounded-lg bg-white/5 py-2 pr-8 pl-3 text-left text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
          )}
        >
          {selectedTime.name}
          <FaAngleDown
            className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
            aria-hidden="true"
          />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--button-width)] rounded-xl border border-white/5 bg-gray-900/90 backdrop-blur-md p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {expiringtimes.map((time) => (
            <ListboxOption
              key={time.id}
              value={time}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <FaCheck className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white">{time.name}</div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
