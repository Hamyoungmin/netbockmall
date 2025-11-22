# 넷북몰 (NetbockMall)

Next.js와 Supabase로 구축된 쇼핑몰 프로젝트입니다.

## 기술 스택

- **프론트엔드**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **백엔드/DB**: Supabase

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트 생성
2. SQL Editor에서 `supabase-schema.sql` 파일 실행하여 테이블 생성
3. `.env.local` 파일 생성 (프로젝트 루트에)

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
netbockmall/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── product/[id]/ # 동적 제품 상세 페이지
│   │   ├── admin/        # 관리자 페이지
│   │   │   └── products/ # 상품 관리 (CRUD)
│   │   ├── macbook/      # 맥북 카테고리
│   │   ├── notebook/     # 노트북 카테고리
│   │   ├── tablet/       # 태블릿 카테고리
│   │   ├── accessories/  # 악세서리 카테고리
│   │   └── ...
│   ├── components/       # 재사용 컴포넌트
│   ├── lib/              # 라이브러리 (Supabase 클라이언트)
│   └── data/             # 정적 데이터
├── public/               # 정적 파일 (이미지)
└── supabase-schema.sql   # 데이터베이스 스키마
```

## 주요 기능

### ✅ 구현 완료
- 🛍️ **동적 제품 상세 페이지** - `/product/[id]` 라우트로 모든 제품 상세 보기
- 👨‍💼 **관리자 상품 관리** - 상품 추가/수정/삭제 (CRUD)
- 📊 **실시간 DB 연동** - Supabase를 통한 실시간 데이터 관리
- 🏷️ **카테고리별 제품 목록** - 맥북, 노트북, 태블릿, 악세서리
- 🎨 **반응형 디자인** - 모바일/태블릿/데스크톱 대응
- 🛒 **장바구니 기능** - 로컬스토리지 기반
- 👥 **사용자 인증** - 로그인/회원가입
- 📦 **주문 관리**
- 🔍 **검색 기능**

### 🚀 사용 방법

#### 일반 사용자
1. 홈페이지에서 제품 둘러보기
2. 카테고리별 제품 보기 (맥북/노트북/태블릿/악세서리)
3. 제품 클릭 → 상세 페이지에서 정보 확인
4. 장바구니 담기 또는 바로 구매
5. 주문하기

#### 관리자
1. `/admin/login`에서 관리자 로그인
2. `/admin/products`에서 상품 관리
   - **상품 추가**: "상품 추가" 버튼 클릭
     - 상품명, 카테고리, 가격, 재고, 이미지 URL, 설명 입력
     - 이미지는 `public` 폴더에 업로드 후 경로 입력 (예: `/image.jpg`)
   - **상품 수정**: 테이블에서 연필 아이콘 클릭
   - **상품 삭제**: 테이블에서 휴지통 아이콘 클릭
3. 추가한 상품은 자동으로 해당 카테고리 페이지와 제품 상세 페이지에 표시됨

### 💡 상품 이미지 업로드 방법

1. `public` 폴더에 이미지 파일 업로드
2. 관리자 페이지에서 이미지 URL을 `/파일명.jpg` 형식으로 입력
   - 예: `/macbook-air.jpg`

## 데이터베이스 스키마

주요 테이블:
- `products` - 상품 정보
- `orders` - 주문 내역
- `members` - 회원 정보
- `notices` - 공지사항
- `faqs` - 자주 묻는 질문

자세한 스키마는 `supabase-schema.sql` 파일을 참고하세요.

## 환경 변수

`.env.local` 파일에 다음 환경 변수를 설정해야 합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 다음 단계

- [ ] 결제 시스템 연동 (토스페이먼츠)
- [ ] 리뷰/평점 시스템
- [ ] 위시리스트 기능
- [ ] 제품 비교 기능
- [ ] 실시간 채팅 상담
- [ ] 주문 추적
- [ ] 쿠폰/할인 시스템
- [ ] 소셜 로그인 (구글, 카카오, 네이버)
- [ ] 이미지 업로드 기능 (Supabase Storage)
- [ ] 관리자 대시보드 완성

## 라이센스

MIT