# Node.js 기반 이미지 사용 (알파인으로 경량화)
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위해 package.json과 lock 파일 복사
COPY package.json package-lock.json ./

# 의존성 설치
RUN npm install

# 앱 코드 복사
COPY . .

# Next.js 앱 빌드
RUN npm run build

# Next.js가 사용할 포트 설정
EXPOSE 3000

# 앱 실행 명령어
CMD ["npm", "start"]
