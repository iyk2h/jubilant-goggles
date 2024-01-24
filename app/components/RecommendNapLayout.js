import { useTranslations } from "next-intl";

const RecommendNapLayout = ({ idx, info, recommendItems }) => {
  const t = useTranslations("Result");

  const bg_l = idx % 2 === 0 ? "bg-left-bg" : "bg-right-bg";
  const bg_r = idx % 2 === 0 ? "bg-right-bg" : "bg-left-bg";

  return (
    <>
      <div className="mt-1 text-custom-text-color">
        <div className="flex items-center justify-center relative">
          <div
            className={`absolute left-0 ${bg_l} h-full w-1/2 z-0 flex items-center justify-center rounded-l-xl`}
          >
            <div className="rotate-90 origin-center pt-20 text-7xl text-custom-third text-center whitespace-nowrap">
              {info.departCity}
            </div>
            <div className="absolute z-1 text-xs font-bold top-0 mt-8 text-right">
              {t("departure_country_time")}
            </div>
          </div>

          <div
            className={`absolute right-0 ${bg_r} h-full w-1/2 z-0 flex items-center justify-center rounded-r-xl`}
          >
            <div className="rotate-90 origin-center pb-20 text-7xl text-custom-third whitespace-nowrap">
              {info.arrivalCity}
            </div>
            <div className="absolute z-1 text-xs font-bold top-0 mt-8 text-left">
              {t("arrival_country_time")}
            </div>
          </div>

          <ul
            aria-label="Activity feed"
            role="feed"
            className="relative flex flex-col gap-3 py-12 left-0 before:absolute before:top-0 before:left-[50%] before:h-full before:border before:border-dashed before:border-slate-100 after:absolute after:top-6 after:left-[50%] after:bottom-6 after:border after:border-slate-100"
          >
            {recommendItems.map((item, index) => (
              <li key={index} role="article" className="flex gap-2 mt-5">
                <div className={`flex flex-col w-28 text-right `}>
                  <p className={`text-xs `}>{item.departDateTime}</p>
                  <h4 className={`text-base `}>{item.departDescription}</h4>
                </div>
                <span
                  className={`flex items-center z-10 justify-center w-10 h-10 rounded-full  ring-2 ring-custom-third
                  ${index === 1 || index === 2 ? `${bg_r} ` : `${bg_l}  `}
                    `}
                >
                  <p className="`">{item.icon}</p>
                </span>
                <div className={`flex flex-col gap-0 w-28 `}>
                  <p className={`text-xs `}>{item.arrivalDateTime}</p>
                  <h4 className={`text-base `}>{item.arrivalDescription}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecommendNapLayout;
