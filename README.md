# Pomodoro Timer

> 집중력을 높이는 심플한 뽀모도로 타이머

## 주요 기능

- **작업/휴식 타이머**: 기본 25분 작업 + 5분 휴식 사이클
- **커스텀 설정**: 작업 시간, 휴식 시간 자유롭게 조정
- **세션 카운터**: 완료한 뽀모도로 세션 수 추적
- **알림 사운드**: 타이머 완료 시 알림음 재생
- **탭 타이틀 표시**: 브라우저 탭에 남은 시간 실시간 표시
- **상태 저장**: LocalStorage로 설정 및 세션 기록 유지

## 기술 스택

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 16.1.4 |
| **Language** | TypeScript | 5.x |
| **UI Library** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4.x |
| **Deploy** | Vercel | - |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버 실행 후 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 사용 방법

1. **타이머 시작**: 시작 버튼을 눌러 25분 작업 타이머를 시작합니다
2. **집중 작업**: 타이머가 끝날 때까지 집중해서 작업합니다
3. **휴식**: 알림이 울리면 5분 휴식을 취합니다
4. **반복**: 작업-휴식 사이클을 반복합니다
5. **설정 변경**: 원하는 시간으로 작업/휴식 시간을 조정할 수 있습니다

## 라이선스

MIT License - SidequestLab
