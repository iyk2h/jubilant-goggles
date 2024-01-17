import Image from "next/image";
import React, { useEffect } from "react";

const KakaoShareButton = ({ url }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Kakao } = window;

      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }
    }
  }, []);

  const handleShareToKakao = () => {
    const { Kakao } = window;

    Kakao.Share.sendScrap({
      requestUrl: url,
    });
  };

  return (
    <div
      className="flex justify-center items-center"
      onClick={handleShareToKakao}
    >
      <Image
        style={{ minWidth: "50px", minHeight: "50px" }}
        width={50}
        height={50}
        src="/kakao-talk.png"
        alt="카카오톡 공유 보내기 버튼"
      />
    </div>
  );
};

export default KakaoShareButton;
