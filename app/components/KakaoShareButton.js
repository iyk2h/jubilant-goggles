import React, { useEffect } from "react";

const KakaoShareButton = ({ url }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

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
    <div onClick={handleShareToKakao}>
      <a id="kakaotalk-sharing-btn" href="javascript:;">
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="카카오톡 공유 보내기 버튼"
        />
      </a>
    </div>
  );
};

export default KakaoShareButton;
