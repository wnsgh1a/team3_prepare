# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional

# 1. FastAPI 앱 생성
app = FastAPI()

# 2. CORS 미들웨어 설정
# React 앱이 실행되는 http://localhost:5173의 요청을 허용합니다.
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# 3. React에서 보낼 데이터 모델 정의 (Pydantic BaseModel)
class LoginEvent(BaseModel):
    user_id: str
    email: Optional[EmailStr] = None
    provider: Optional[str] = None
    user_name: Optional[str] = None
    avatar_url: Optional[str] = None
    access_token: Optional[str] = None

# 4. /api/login 엔드포인트 생성
@app.post("/api/login")
async def on_login(evt: LoginEvent):
    """
    React 앱에서 GitHub 로그인 정보를 받아서 터미널에 출력합니다.
    """
    print("\n=== LOGIN EVENT ===")
    print(f"user_id    : {evt.user_id}")
    print(f"email      : {evt.email}")
    print(f"provider   : {evt.provider}")
    print(f"user_name  : {evt.user_name}")
    print(f"avatar_url : {evt.avatar_url}")
    print("===================\n")
    
    # React 앱으로 성공 응답을 보냅니다.
    return {"ok": True}