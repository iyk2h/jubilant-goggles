import { useTranslations } from "next-intl";

const RecommendSleepLayout = ({ idx, info, recommendItems }) => {
  const t = useTranslations("Result");

  const bg_l = idx % 2 === 0 ? "bg-left-bg" : "bg-right-bg";
  const bg_r = idx % 2 === 0 ? "bg-right-bg" : "bg-left-bg";

  return (
    <>
      <div className="mt-1 text-custom-text-color">
        <div className="flex items-center justify-center relative">
          <div
            className={`absolute left-0 h-full ${bg_l} w-1/2 z-0 flex items-center justify-center rounded-l-xl`}
          ></div>

          <div
            className={`absolute right-0 h-full ${bg_l} w-1/2 z-0 flex items-center justify-center rounded-r-xl`}
          ></div>

          <span className="absolute z-10 top-0">{info}</span>
          <ul
            aria-label="Activity feed"
            role="feed"
            className="relative flex flex-col gap-2 py-4 left-0 before:absolute before:top-0 before:left-[50%] before:h-full before:border before:border-dashed before:border-slate-100 after:absolute after:top-6 after:left-[50%] after:bottom-6 after:border after:border-slate-100"
          >
            {recommendItems.map((item, index) => (
              <li key={index} role="article" className="flex gap-2 mt-5">
                <div
                  className={`flex flex-col w-28 text-right ${
                    index === 3 ? "font-bold" : ""
                  }`}
                >
                  <p className={`text-xs ${index === 3 ? "font-bold" : ""}`}>
                    {item.departDateTime}
                  </p>
                  <h4
                    className={`text-base ${index === 3 ? "font-bold" : ""} `}
                  >
                    {item.departDescription}
                  </h4>
                </div>
                <span
                  className={`flex items-center z-10 justify-center w-10 h-10 rounded-full ${bg_l}  ring-2 ring-white`}
                >
                  <p className="">{item.icon}</p>
                </span>
                <div
                  className={`flex flex-col gap-0 w-28 ${
                    index === 3 ? "font-bold" : ""
                  }`}
                >
                  <p className={`text-xs ${index === 3 ? "font-bold" : ""}`}>
                    {item.arrivalDateTime}
                  </p>
                  <h4
                    className={`text-base ${index === 3 ? "font-bold" : ""} `}
                  >
                    {item.arrivalDescription}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecommendSleepLayout;
