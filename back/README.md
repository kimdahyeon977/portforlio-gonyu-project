# 포트폴리오 공유 서비스 백엔드 코드


## 파일 구조 설명

1. src폴더는 크게는 routers, services, db의 3개 폴더로 3계층 구조입니다.

- routers:
  - request와 response가 처리됩니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
  - award: 포트폴리오 중 수상이력 관련 라우터
  - certificate: 포트폴리오 중 자격증 관련 라우터
  - education : 포트폴리오 중 학력 관련 라우터
  - project : 포트폴리오 중 프로젝트 관련 라우터 
  - user : 포트폴리오 중 사용자 관련 라우터
  - like : 좋아요 기능 관련 라우터
- services:
  - 백엔드 로직 코드가 있습니다. MVP 별로 1개씩, 총 5개 파일이 있게 됩니다.
  - award : 포트폴리오 중 수상이력 관련 서비스
  - certificate : 포트폴리오 중 자격증 관련 서비스
  - education : 포트폴리오 중 학력 관련 서비스
  - project : 포트폴리오 중 프로젝트 관련 서비스 
  - user : 포트폴리오 중 사용자 관련 서비스
  - like : 좋아요 기능 관련 서비스
- db:
  - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
  - Mongoose 스키마가 있는 schemas 폴더,
    - 위와 같은 방식으로 총 6개 파일이 있습니다.
  - Mongoose 모델 ORM 코드가 있는 models 폴더
    - 위와 같은 방식으로 총 6개 파일이 있습니다.
2. 이외 폴더는 아래와 같습니다.

- src/middlewares:
  - jwt토큰을 다루는 미들웨어인 login_required.js
  - 학습 편의를 위해 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js

  - 디버그를 위해 에러를 터미널에 노란색으로 출력하는 errorMiddlewares.js
  
  - RBAC 구현을 위한 사용자 권한 검사하는 핸들러인 utils.js
