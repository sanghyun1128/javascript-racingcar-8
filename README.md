# javascript-racingcar-precourse

## 구현할 기능 목록

1. eslint, prettier 설정
   - indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용한다.
   - 3항 연산자를 쓰지 않는다.
2. 전체 폴더 구조 및 목업 클래스 생성
3. 프로그램에서 사용할 상수들 생성
4. class 별로 테스트 케이스 작성, 기능 단위 별로 describe로 묶기

- Jest를 이용하여 정리한 기능 목록이 정상적으로 작동하는지 테스트 코드로 확인한다.
  - Validator
  - StringUtil
  - Car
  - RaceManager
  - IOManager

5. class Validator
   - validateString(string) : 문자열 검증
   - validateNumber(number) : 숫자 검증
   - validateNoDuplicates(array) : Array 안에 중복이 없는지 검사
   - validateName(name) : 이름 형식 검증
     - 이름은 5자 이하만 가능하다.
   - validateNumOfParticipants(participants) : 참가자 수 검증
   - validateNumOfRounds : 라운드 수 검증
6. class IOManager
   - getString() : 문자열 입력 받기
   - getNumber() : 숫자 입력 받기
     - 사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.
   - printEmptyLine() : 빈 줄 출력
   - printRequestNames() : 이름 요청 문자열 출력
   - printRequestNumOfRounds() : 라운드 요청 문자열 출력
   - printWinner(name[]) : 승자 출력
     - 우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.
   - printResultHeader() : 실행 결과 헤더 출력
   - printRoundResult(result) : 각 라운드 결과 출력
     - 전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.
   - applyErrorMessageFormat(errorMessage) : 에러메시지 형식 적용
     - 사용자가 잘못된 값을 입력할 경우 "[ERROR]"로 시작하는 메시지와 함께 Error를 발생시킨 후 애플리케이션은 종료되어야 한다.
7. class StringUtil
   - splitByDefaultDelimiter(string) : 기본 구분자로 String.split()
     - 자동차 이름은 쉼표(,)를 기준으로 구분한다.
8. class Car
   - constructor(name) : name, position 초기값 설정
     - 각 자동차에 이름을 부여할 수 있다.
   - getName() : 이름 가져오기
   - getPosition() : 위치 가져오기
   - moveForward() : 앞으로 이동 명령
   - #decideMovement() : 움직일지 말지 결정
     - 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
9. class RaceManager
   - constructor(numOfRounds) : numOfRounds, roundResult, participants 초기값 설정
   - getNumOfRounds() : 진행할 라운드 수 가져오기
   - addParticipant(name) : 참가자 추가
   - getParticipants() : 참가자 목록 가져오기
   - startRace() : 레이스 시작
     - 주어진 횟수 동안 n대의 자동차는 전진 또는 멈출 수 있다.
   - runRound() : 라운드 진행
   - addRoundResult(result) : 라운드 결과 추가
   - getRoundResults() : 라운드결과 리스트 가져오기
   - retrieveWinners() : 우승자 리스트 가져오기
10. class App
    - 메인 로직
      - 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. 우승자는 한 명 이상일 수 있다.
    - 에러 처리 : 에러 객체에 형식에 맞는 메시지를 설정

## 고려사항

- 모든 입력에 trim() 적용하여 사용자 실수 예방
- 사용자에게 입력을 받을 때 문자열인지, 숫자로 변환가능한지 검증하여 이후 처리에서 타입 보장
- 추가 제한 사항
  - 이름이 겹치지 않는가
  - 이름에 영어, 한글, 숫자, 공백 만 허용
  - 참가자 수가 2 ~ 50 을 만족 하는가
  - 라운드 수가 1 ~ 100 을 만족 하는가
- 테스트 작성시 기능별로 분리하여 파악하기 쉽게 함
