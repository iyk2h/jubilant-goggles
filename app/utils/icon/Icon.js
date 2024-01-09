import Image from "next/image";

export function NoCoffee() {
  return (
    <Image
      width={30}
      height={30}
      src="/icons8-no-beverages.png"
      alt="no-beverages"
    />
  );
}

export function SleepIcon() {
  return <Image width={28} height={28} src="/icons8-sleep.png" alt="sleep" />;
}

export function WakeUpIcon() {
  return (
    <Image width={32} height={32} src="/icons8-wake-up.png" alt="wake-up" />
  );
}

export function AirplaneDepartIcon({ id }) {
  return (
    <Image
      id={id}
      width={30}
      height={30}
      src="/icons8-flight.png"
      alt="airplane-take-off"
    />
  );
}

export function AirplaneArrivalIcon() {
  return (
    <Image
      width={30}
      height={30}
      src="/icons8-landing.png"
      alt="airplane-landing"
    />
  );
}

export function BackIcon() {
  return <Image width={20} height={20} src="/icons8-back.png" alt="back" />;
}

export function PlusIcon({ id }) {
  return (
    <Image
      id={id}
      width={20}
      height={20}
      src="/icons8-plus-math.png"
      alt="plus-math"
    />
  );
}

export function LoadingIcon() {
  return (
    <Image width={50} height={50} src="/icons8-loading.gif" alt="loading" />
  );
}

export function ChatIcon() {
  return (
    <Image width={30} height={30} src="/icons8-chat-room.png" alt="loading" />
  );
}

export function TrashIcon() {
  return <Image width={30} height={30} src="/icons8-trash.png" alt="loading" />;
}

export function MenuIcon() {
  return <Image width={30} height={30} src="/icons8-menu.png" alt="menu" />;
}

export function DropdownIcon() {
  return (
    <Image width={30} height={30} src="/icons8-dropdown.png" alt="dropdown" />
  );
}

export function CheckIcon() {
  return <Image width={25} height={0} src="/icons8-check.png" alt="check" />;
}
