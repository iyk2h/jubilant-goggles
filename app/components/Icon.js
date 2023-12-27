export function CoffeeIcon({ color, ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "black"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ paddingTop: "4px" }}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

export function NoCoffee() {
  return (
    <img
      width="30"
      height="30"
      src="https://img.icons8.com/ios/50/no-beverages.png"
      alt="no-beverages"
    />
  );
}

export function SleepIcon() {
  return (
    <img
      width="30"
      height="30"
      src="https://img.icons8.com/ios/50/crescent-moon.png"
      alt="crescent-moon"
    />
  );
}

export function WakeUpIcon() {
  return (
    <img
      width="40"
      height="40"
      src="https://img.icons8.com/ios/50/sun--v1.png"
      alt="sun--v1"
    />
  );
}

export function AirplaneDepartIcon() {
  return (
    <img
      width="30"
      height="30"
      src="https://img.icons8.com/ios/50/airplane-take-off.png"
      alt="airplane-take-off"
    />
  );
}

export function AirplaneArrivalIcon() {
  return (
    <img
      width="30"
      height="30"
      src="https://img.icons8.com/ios/50/airplane-landing.png"
      alt="airplane-landing"
    />
  );
}

export function AirplaneIcon({ rotate, ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="gray"
      style={{ transform: `rotate(${rotate}deg)` || "rotate(0deg)" }}
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

export function BedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="#c7d2fe"
      style={{ paddingTop: "4px" }}
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

export function BackIcon() {
  return (
    <img
      width="20"
      height="20"
      src="https://img.icons8.com/metro/26/back.png"
      alt="back"
    />
  );
}
