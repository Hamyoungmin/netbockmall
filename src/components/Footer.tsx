export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 상단 링크 섹션 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 pb-12 border-b border-gray-200">
          {/* 고객센터 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">고객센터</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/notice" className="hover:text-gray-900 hover:underline">공지사항</a></li>
              <li><a href="/faq" className="hover:text-gray-900 hover:underline">자주 묻는 질문</a></li>
              <li><a href="/contact" className="hover:text-gray-900 hover:underline">1:1 문의</a></li>
            </ul>
            <div className="mt-6 text-xs text-gray-500">
              <p className="font-semibold text-gray-700 mb-1">10:30~18:00</p>
              <p>(점심시간 13:00~14:00)</p>
              <p>주말, 공휴일 휴무</p>
            </div>
          </div>

          {/* 넷북몰 소개 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">넷북몰 소개</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-gray-900 hover:underline">회사소개</a></li>
              <li><a href="/careers" className="hover:text-gray-900 hover:underline">채용</a></li>
              <li><a href="/contact" className="hover:text-gray-900 hover:underline">제휴 광고</a></li>
            </ul>
          </div>

          {/* 쇼핑 안내 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">쇼핑 안내</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/store" className="hover:text-gray-900 hover:underline">스토어</a></li>
              <li><a href="/macbook" className="hover:text-gray-900 hover:underline">맥북</a></li>
              <li><a href="/notebook" className="hover:text-gray-900 hover:underline">노트북</a></li>
              <li><a href="/tablet" className="hover:text-gray-900 hover:underline">태블릿</a></li>
              <li><a href="/accessories" className="hover:text-gray-900 hover:underline">악세서리</a></li>
            </ul>
          </div>

          {/* 계정 안내 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">계정 안내</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/account" className="hover:text-gray-900 hover:underline">내 계정</a></li>
              <li><a href="/orders" className="hover:text-gray-900 hover:underline">주문 조회</a></li>
              <li><a href="/returns" className="hover:text-gray-900 hover:underline">반품/교환</a></li>
              <li><a href="/shipping" className="hover:text-gray-900 hover:underline">배송 조회</a></li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-base">고객 지원</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="/support" className="hover:text-gray-900 hover:underline">고객지원</a></li>
              <li><a href="/shipping" className="hover:text-gray-900 hover:underline">배송 정보</a></li>
              <li><a href="/returns" className="hover:text-gray-900 hover:underline">반품 안내</a></li>
            </ul>
          </div>
        </div>

        {/* 회사 정보 */}
        <div className="space-y-4">
          {/* 브랜드 로고 */}
          <div className="mb-6">
            <a href="/" className="text-2xl font-bold text-gray-900">넷북몰</a>
          </div>

          {/* 회사 상세 정보 */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>
              <span className="font-semibold">(주)넷북몰</span> | 서울시 서초구 서초대로 157 3층 | 
              <span className="font-semibold"> 대표 : 박넷북</span> | 
              <span className="font-semibold"> 사업자정보확인</span>
            </p>
            <p>
              통신판매업신고 : 2018-서울서초-2134 | 
              유통직업소개업등록번호 : 제2021-3210195-14-5-00035호 | 
              <span className="font-semibold"> 고객센터 : 1544-6254</span> | 
              호스팅 사업자: Amazon Web Service(AWS) | 1:1 문의하기 | 
              <a href="mailto:help@netbookmall.com" className="hover:underline">help@netbookmall.com</a>
            </p>
            <p className="leading-relaxed pt-2">
              (주)넷북몰은 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
            </p>
            <p className="leading-relaxed">
              (주)넷북몰 사이트의 상품/판매/거래에 관한 정보, 디자인 및 화면의 구성, UI 등의 무단복제, 배포, 방송 또는 전송, 스크래핑 등의 행위는 저작권법, 콘텐츠산업 진흥법 등 관련법령에 의하여 엄격히 금지됩니다.
            </p>
            <p className="leading-relaxed pb-2">
              (주)넷북몰은 선불전자지급수단 대해 자금보증업할 가입하여 안전하게 보호하고 있습니다.
            </p>
          </div>

          {/* 약관 및 Copyright */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <a href="/terms" className="hover:text-gray-900 hover:underline">이용약관</a>
                <span>|</span>
                <a href="/privacy" className="hover:text-gray-900 hover:underline font-semibold">개인정보처리방침</a>
                <span>|</span>
                <a href="/legal" className="hover:text-gray-900 hover:underline">법적고지</a>
                <span>|</span>
                <a href="/license" className="hover:text-gray-900 hover:underline">사업자 정보확인</a>
              </div>
              <p className="text-xs text-gray-500">Copyright © 2025 넷북몰 Inc. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

