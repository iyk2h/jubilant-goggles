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
      width={25}
      height={25}
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
  return <Image width={25} height={25} src="/icons8-menu.png" alt="menu" />;
}

export function Menu3Icon() {
  return <Image width={25} height={25} src="/icons8-menu-3.png" alt="menu-3" />;
}

export function DropdownIcon() {
  return (
    <Image width={30} height={30} src="/icons8-dropdown.png" alt="dropdown" />
  );
}

export function CheckIcon() {
  return <Image width={25} height={25} src="/icons8-check.png" alt="check" />;
}

export function EnterIcon() {
  return <Image width={20} height={20} src="/icons8-enter.png" alt="enter" />;
}

export function CalendarsIcon() {
  return (
    <Image width={35} height={35} src="/icons8-calendars.png" alt="calendars" />
  );
}

export function CalendarOneIcon() {
  return (
    <Image
      width={35}
      height={35}
      src="/icons8-calendar-one.png"
      alt="calendarOne"
    />
  );
}

export function SearchIcon() {
  return <Image width={25} height={25} src="/icons8-search.png" alt="Search" />;
}

export function CloseIcon() {
  return <Image width={17} height={17} src="/icons8-close.png" alt="close" />;
}

export function ShareIcon() {
  return <Image width={17} height={17} src="/icons8-share.png" alt="share" />;
}

export function HomeIcon() {
  return <Image width={17} height={17} src="/icons8-home.png" alt="home" />;
}
