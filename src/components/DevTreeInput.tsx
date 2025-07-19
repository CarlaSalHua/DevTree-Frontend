import { Switch } from "@headlessui/react";
import { classNames } from "../utils";
import type { DevTreeLink } from "../types/User";

type DevTreeInputProps = {
  item: DevTreeLink;
  handleUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnableLink: (socialNetwork: string) => void;
};

export default function DevTreeInput({
  item,
  handleUrlChange,
  handleEnableLink,
}: DevTreeInputProps) {
  return (
    <div className="bg-white shadow-md p-4 md:p-5 rounded-xl flex items-center gap-4 border border-gray-100">
      <div
        className="w-12 h-12 bg-cover rounded-full border border-gray-200 shadow-sm"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>

      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
        value={item.url}
        onChange={handleUrlChange}
        name={item.name}
        placeholder={`Enlace de ${item.name}`}
      />

      <Switch
        checked={item.enabled}
        name={item.name}
        onChange={() => handleEnableLink(item.name)}
        className={classNames(
          item.enabled ? "bg-green-500" : "bg-gray-300",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-300 ease-in-out"
          )}
        />
      </Switch>
    </div>
  );
}
