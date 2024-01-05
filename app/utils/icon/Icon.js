export function NoCoffee() {
  return (
    <img
      width="30"
      height="30"
      src="/icons8-no-beverages.png"
      alt="no-beverages"
    />
  );
}

export function SleepIcon() {
  return <img width="28" height="28" src="/icons8-sleep.png" />;
}

export function WakeUpIcon() {
  return <img width="32" height="32" src="/icons8-wake-up.png" />;
}

export function AirplaneDepartIcon({ id }) {
  return (
    <img
      id={id}
      width="30"
      height="30"
      src="/icons8-flight.png"
      alt="airplane-take-off"
    />
  );
}

export function AirplaneArrivalIcon() {
  return (
    <img
      width="30"
      height="30"
      src="/icons8-landing.png"
      alt="airplane-landing"
    />
  );
}

export function BackIcon() {
  return <img width="20" height="20" src="/icons8-back.png" alt="back" />;
}

export function PlusIcon({ id }) {
  return (
    <img
      id={id}
      width="15"
      height="15"
      src="/icons8-plus-math.png"
      alt="plus-math"
    />
  );
}

export function LoadingIcon() {
  return <img width="50" height="50" src="/icons8-loading.gif" alt="loading" />;
}

export function ChatIcon() {
  return (
    <img width="30" height="30" src="/icons8-chat-room.png" alt="loading" />
  );
}

export function TrashIcon() {
  return <img width="30" height="30" src="/icons8-trash.png" alt="loading" />;
}
