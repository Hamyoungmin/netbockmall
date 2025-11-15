# 넷북몰 (NetbockMall)

Next.js와 Supabase로 구축된 쇼핑몰 프로젝트입니다.

## 기술 스택

- **프론트엔드**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **백엔드**: Supabase (추후 연동 예정)

## 시작하기

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
netbockmall/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   ├── page.tsx      # 홈 페이지
│   │   └── globals.css   # 전역 CSS
│   └── styles/
│       └── custom.css    # 커스텀 CSS 스타일
├── public/               # 정적 파일
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 주요 기능 (예정)

- 🛍️ 상품 관리
- 👥 사용자 인증 (Supabase Auth)
- 🛒 장바구니
- 💳 결제 시스템
- 📦 주문 관리

## 다음 단계

- Supabase 프로젝트 생성 및 연동
- 데이터베이스 스키마 설계
- 인증 시스템 구현
- 상품 관리 페이지 개발




