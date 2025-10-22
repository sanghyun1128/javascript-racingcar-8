# javascript-racingcar-precourse

## 구현할 기능 목록

1. eslint, prettier 설정
2. 전체 폴더 구조 및 목업 클래스 생성
3. 프로그램에서 사용할 상수들 생성
4. class 별로 테스트 케이스 작성, 함수별로 파일 분리
   - Validator
   - IOManager
   - StringUtil
   - Car
   - RaceManager
   - Application
5. class Validator
   - validateString(string) : 문자열 검증
   - validateNumber(number) : 숫자 검증
   - validateName(name) : 이름 형식 검증
   - validateNumOfParticipants(participants) : 참가자 수 검증
   - validateNumOfRounds : 라운드 수 검증
6. class IOManager
   - getString() : 문자열 입력 받기
   - getNumber() : 숫자 입력 받기
   - printRequestNames() : 이름 요청 문자열 출력
   - printRequestNumOfRounds() : 라운드 요청 문자열 출력
   - printWinner(name[]) : 승자 출력
   - printRoundResult(result) : 각 라운드 결과 출력
   - setErrorMessage(error) : 에러메시지 설정
7. class StringUtil
   - splitByDefaultDelimiter(string) : 기본 구분자로 String.split()
8. class Car
   - constructor(name)
   - getName() : 이름 가져오기
   - getPosition() : 위치 가져오기
   - decideMovement() : 움직일지 말지 결정
   - moveForward() : 앞으로 이동 명령
9. class RaceManager
   - constructor(numOfRounds)
   - addParticipant(name) : 참가자 추가
   - startRace() : 레이스 시작
   - runRound() : 라운드 진행
   - addRoundResult(result) : 라운드 결과 추가
   - getRoundResults() : 라운드결과 리스트 가져오기
   - retrieveWinners() : 우승자 리스트 가져오기
10. class App
    - 메인 로직
    - 에러 처리

## 고려사항

- 적절한 형식의 입력이 들어 왔는가
- 참가자 수가 2 ~ 50 을 만족 하는가
- 라운드 수가 1 ~ 100 을 만족 하는가
