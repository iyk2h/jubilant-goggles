import { useTranslations } from "next-intl";

const RecommendNapLayout = ({ idx, info, recommendItems }) => {
  const t = useTranslations("Result");

  const bg_l = idx % 2 === 0 ? "bg-left-bg" : "bg-right-bg";
  const bg_r = idx % 2 === 0 ? "bg-right-bg" : "bg-left-bg";
  const bg_text_l = idx % 2 === 0 ? "text-custom-third" : "text-left-bg";
  const bg_text_r = idx % 2 === 0 ? "text-left-bg" : "text-custom-third";

  return (
    <>
      <div className="mt-1 text-custom-text-color">
        <div className="flex items-center justify-center relative">
          <div
            className={`absolute left-0 ${bg_l} h-full w-1/2 z-0 flex items-center justify-center rounded-l-xl overflow-hidden border-r-2 border-custom-third pr-20 pl-10`}
          >
            <div
              className={`rotate-90 origin-center text-7xl ${bg_text_l} text-center whitespace-nowrap`}
            >
              {info.departCity}
            </div>
            <div className="absolute z-1 text-xs font-bold top-1 right-8 mt-8 text-right">
              {info.departureAirportCode}
              {t("departure_country_time")}
            </div>
          </div>

          <div
            className={`absolute top-2 w-1/2 z-10 flex items-center justify-center rounded-r-xl text-sm`}
          >
            {info.flightTime}
          </div>

          <div
            className={`absolute right-0 ${bg_r} h-full w-1/2 z-0 flex items-center justify-center rounded-r-xl overflow-hidden border-l-2 border-custom-third pl-20`}
          >
            <div
              id="right-back-ground"
              className={`rotate-90 origin-center relative right-0 text-7xl ${bg_text_r} whitespace-nowrap`}
            >
              {info.arrivalCity}
            </div>
            <div className="absolute z-1 text-xs font-bold top-1 left-8 mt-8 text-left">
              {info.arrivalAirportCode}
              {t("arrival_country_time")}
            </div>
          </div>

          <ul
            aria-label="Activity feed"
            role="feed"
            className="relative flex justify-center items-center flex-col gap-3 py-12 w-full left-0"
          >
            {recommendItems.map((item, index) => (
              <li key={index} role="article" className="flex gap-2 mt-5">
                <div className={`flex flex-col w-28 text-right text-xs`}>
                  <div
                    className={`flex justify-end gap-1 text-sm whitespace-nowrap`}
                  >
                    <h4 className={`font-bold`}>{item.departDescription}</h4>
                    {item.departDateTime.split(",")[0]}
                  </div>

                  {item.departDateTime.split(",")[1]}
                </div>
                <span
                  className={`flex items-center z-10 justify-center w-10 h-10 rounded-full border-2 border-custom-third
                  ${index === 1 || index === 2 ? `${bg_r} ` : `${bg_l}  `}
                    `}
                >
                  <p>{item.icon}</p>
                </span>
                <div className={`flex flex-col w-28 text-left text-xs`}>
                  <div className={`flex justify-start gap-1 text-sm `}>
                    {item.arrivalDateTime.split(",")[0]}
                    <h4 className={` font-bold`}>{item.arrivalDescription}</h4>
                  </div>
                  {item.arrivalDateTime.split(",")[1]}
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
