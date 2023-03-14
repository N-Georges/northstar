import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

type DropdownProps = {
  button: React.ReactNode;
  children: React.ReactNode;
};

const Dropdown = ({ button, children }: DropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block">
      <div>
        <Menu.Button>{button}</Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items>{children}</Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
