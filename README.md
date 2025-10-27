이 프로젝트는 React.js(프론트엔드)와 FastAPI(백엔드)로 구성되어 있습니다.
원활한 실행을 위해서는 **두 개의 터미널**을 사용하여 각각 서버를 실행해야 합니다.

## 1. 프론트엔드 실행 (React)

React 개발 서버를 실행하여 사용자 인터페이스(UI)를 켭니다.

1.  프로젝트 폴더(`TEAM3`)에서 터미널을 엽니다.
2.  (최초 1회) 필요한 Node.js 패키지를 설치합니다.
    ```bash
    npm install
    ```
3.  React 개발 서버를 시작합니다.
    ```bash
    npm run dev
    ```
4.  서버가 `http://localhost:5173`에서 실행되는 것을 확인합니다.

## 2. 백엔드 실행 (FastAPI)

GitHub 로그인 정보를 수신하고 처리할 FastAPI 서버를 켭니다.

1.  **별도의 새 터미널**을 엽니다.
2.  동일한 프로젝트 폴더(`TEAM3`)로 이동합니다.
3.  (권장) 파이썬 가상환경을 생성하고 활성화합니다.
    ```bash
    # Windows에서 가상환경 생성 및 활성화
    python -m venv venv
    .\venv\Scripts\Activate
    ```
4.  `requirements.txt` 파일에 있는 파이썬 라이브러리를 설치합니다.
    ```bash
    pip install -r requirements.txt
    ```
5.  FastAPI 서버를 시작합니다.
    ```bash
    uvicorn main:app --reload
    ```
6.  서버가 `http://localhost:8000`에서 실행되는 것을 확인합니다.

## 실행 확인

1.  프론트엔드(`localhost:5173`)와 백엔드(`localhost:8000`)가 모두 켜진 상태에서, 브라우저로 `http://localhost:5173`에 접속합니다.
2.  GitHub 로그인 버튼을 클릭하여 로그인을 진행합니다.
3.  로그인이 성공하면 `/success` 페이지로 리디렉션됩니다.
4.  **브라우저의 개발자 도구(F12) 콘솔**을 열면 FastAPI 백엔드로부터 받은 `{ok: true}` 응답을 확인할 수 있습니다.
5.  **FastAPI 서버 터미널**(2번 터미널)을 확인하면 GitHub 사용자 정보가 출력된 것을 볼 수 있습니다.
