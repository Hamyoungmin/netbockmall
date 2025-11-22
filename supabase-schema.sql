-- 넷북몰 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. 상품 테이블
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  description TEXT,
  status VARCHAR(50) DEFAULT '판매중',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 주문 테이블
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  product_name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT '결제완료',
  payment_method VARCHAR(50),
  address TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 회원 테이블
CREATE TABLE members (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  grade VARCHAR(50) DEFAULT '일반',
  status VARCHAR(50) DEFAULT '정상',
  order_count INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- 4. 공지사항 테이블
CREATE TABLE notices (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) DEFAULT '공지',
  author VARCHAR(100) DEFAULT '관리자',
  is_pinned BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT '게시중',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 문의 테이블
CREATE TABLE inquiries (
  id BIGSERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category VARCHAR(50),
  status VARCHAR(50) DEFAULT '답변대기',
  answer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  answered_at TIMESTAMP WITH TIME ZONE
);

-- 6. FAQ 테이블
CREATE TABLE faqs (
  id BIGSERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50),
  views INTEGER DEFAULT 0,
  helpful INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 쿠폰 테이블
CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  discount_value INTEGER NOT NULL,
  min_amount INTEGER DEFAULT 0,
  max_discount INTEGER,
  valid_until DATE,
  issued_count INTEGER DEFAULT 0,
  used_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT '활성',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 배송 테이블
CREATE TABLE shipping (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  customer_name VARCHAR(100),
  product_name TEXT,
  address TEXT,
  courier VARCHAR(100),
  tracking_number TEXT,
  status VARCHAR(50) DEFAULT '배송준비',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 반품/교환 테이블
CREATE TABLE returns (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  customer_name VARCHAR(100),
  product_name TEXT,
  type VARCHAR(50),
  reason TEXT,
  status VARCHAR(50) DEFAULT '접수',
  amount INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- 10. 배송지 테이블
CREATE TABLE addresses (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  zipcode VARCHAR(10) NOT NULL,
  address TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. 결제수단 테이블
CREATE TABLE payment_methods (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  card_number VARCHAR(16) NOT NULL,
  card_name VARCHAR(100) NOT NULL,
  expiry_date VARCHAR(5) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. 위시리스트 테이블
CREATE TABLE wishlists (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_email, product_id)
);

-- 13. 최근 본 상품 테이블
CREATE TABLE recently_viewed (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL,
  product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. 채팅 상담 테이블
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_email VARCHAR(255),
  user_name VARCHAR(100),
  message TEXT NOT NULL,
  sender_type VARCHAR(20) NOT NULL, -- 'user' or 'admin'
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE chat_sessions (
  id TEXT PRIMARY KEY,
  user_email VARCHAR(255),
  user_name VARCHAR(100),
  status VARCHAR(50) DEFAULT '대기중', -- 대기중, 상담중, 종료
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 샘플 데이터 삽입

-- 상품 샘플
INSERT INTO products (name, category, price, stock, image_url) VALUES
('MacBook Pro 14', '맥북', 2890000, 15, '/Rectangle 37.png'),
('MacBook Air 13', '맥북', 1690000, 2, '/Rectangle 37.png'),
('iPad Pro 12.9', '태블릿', 1790000, 8, '/Rectangle 46.png'),
('Galaxy Book3', '노트북', 1590000, 12, '/Rectangle 45.png'),
('AirPods Pro', '악세서리', 329000, 25, '/Rectangle 5.png'),
('Galaxy Buds3', '악세서리', 329000, 18, '/Rectangle 5.png');

-- 주문 샘플
INSERT INTO orders (id, customer_name, customer_email, customer_phone, product_name, amount, status, payment_method, address) VALUES
('ORD-2024-001', '김철수', 'kim@example.com', '010-1234-5678', 'MacBook Pro 14', 2890000, '배송중', '신용카드', '서울시 강남구 테헤란로 123'),
('ORD-2024-002', '이영희', 'lee@example.com', '010-2345-6789', 'iPad Pro', 1350000, '결제완료', '무통장입금', '서울시 송파구 올림픽로 456');

-- 회원 샘플
INSERT INTO members (name, email, phone, grade, order_count, total_spent) VALUES
('김철수', 'kim@example.com', '010-1234-5678', 'VIP', 5, 5680000),
('이영희', 'lee@example.com', '010-2345-6789', '일반', 2, 2190000),
('박민수', 'park@example.com', '010-3456-7890', 'VIP', 8, 8920000);

-- 공지사항 샘플
INSERT INTO notices (title, content, category, is_pinned, views) VALUES
('2024년 설날 배송 안내', '설날 연휴 기간 동안의 배송 일정을 안내드립니다.', '공지', true, 1250),
('신제품 MacBook Pro 출시', '최신 MacBook Pro가 출시되었습니다.', '이벤트', true, 2340);

-- Row Level Security (RLS) 활성화 - 관리자만 접근 가능하도록 설정
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- 모든 데이터 읽기 허용 (개발 단계에서만)
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON orders FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON members FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON notices FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON inquiries FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON faqs FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON coupons FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON shipping FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON returns FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON addresses FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON payment_methods FOR SELECT USING (true);

-- 모든 데이터 쓰기 허용 (개발 단계에서만 - 나중에 인증 추가 필요)
CREATE POLICY "Enable insert for all users" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON products FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON products FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON orders FOR UPDATE USING (true);

CREATE POLICY "Enable insert for all users" ON members FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON members FOR UPDATE USING (true);

CREATE POLICY "Enable insert for all users" ON addresses FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON addresses FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON addresses FOR DELETE USING (true);

CREATE POLICY "Enable insert for all users" ON payment_methods FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON payment_methods FOR UPDATE USING (true);
CREATE POLICY "Enable delete for all users" ON payment_methods FOR DELETE USING (true);

-- 위시리스트 정책
CREATE POLICY "Enable read access for all users" ON wishlists FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON wishlists FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON wishlists FOR DELETE USING (true);

-- 최근 본 상품 정책
CREATE POLICY "Enable read access for all users" ON recently_viewed FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON recently_viewed FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable delete for all users" ON recently_viewed FOR DELETE USING (true);

-- 채팅 정책
CREATE POLICY "Enable read access for all users" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON chat_messages FOR UPDATE USING (true);

CREATE POLICY "Enable read access for all users" ON chat_sessions FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON chat_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON chat_sessions FOR UPDATE USING (true);

