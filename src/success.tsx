// src/Success.tsx
import { useEffect } from "react"; // 👈 useEffect 훅을 import 합니다.
import { Button } from "./components/ui/button";
import { supabase } from "./lib/supabaseClient";

export default function Success() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.replace("/"); // 로그인 페이지로 되돌리기
    };

    // 🔽 [추가된 로직] 페이지가 로드될 때 실행됩니다.
    useEffect(() => {
        /**
         * Supabase에서 현재 세션 정보를 가져와 FastAPI 백엔드로 전송합니다.
         */
        const sendLoginDataToFastAPI = async () => {
            // 1. Supabase에서 현재 사용자 세션 정보를 가져옵니다.
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Supabase 세션 가져오기 오류:", error);
                return;
            }

            if (session) {
                const { user, provider_token } = session;

                // 2. FastAPI의 LoginEvent 모델에 맞게 데이터를 구성합니다.
                const loginEventData = {
                    user_id: user.id,
                    email: user.email,
                    provider: user.app_metadata.provider, // 'github'
                    user_name: user.user_metadata.full_name, // GitHub 사용자 이름
                    avatar_url: user.user_metadata.avatar_url, // GitHub 프로필 사진
                    access_token: provider_token, // GitHub OAuth 액세스 토큰
                };

                // 3. (요청 사항) 개발자 콘솔에 전송할 데이터를 먼저 출력합니다.
                console.log(
                    "Supabase에서 받은 GitHub 로그인 정보 (FastAPI로 전송):",
                    loginEventData
                );

                try {
                    // 4. FastAPI 백엔드(http://localhost:8000/api/login)로 POST 요청을 보냅니다.
                    const response = await fetch(
                        "http://localhost:8000/api/login",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(loginEventData),
                        }
                    );

                    const responseData = await response.json();

                    // 5. (요청 사항) FastAPI 백엔드로부터 받은 응답을 콘솔에 출력합니다.
                    console.log("✅ FastAPI 백엔드 응답:", responseData);
                } catch (fetchError) {
                    console.error("❌ FastAPI 전송 오류:", fetchError);
                    console.log("--- 전송하려던 데이터 ---", loginEventData);
                    console.warn(
                        "ℹ️ 참고: FastAPI 서버(http://localhost:8000)가 실행 중인지, CORS 설정이 올바른지 확인하세요."
                    );
                }
            } else {
                console.log(
                    "Supabase 세션을 찾을 수 없습니다. 로그인 페이지로 리디렉션합니다."
                );
                // 세션이 없으면 로그인 페이지로 돌려보낼 수 있습니다.
                // window.location.replace("/");
            }
        };

        // 함수 실행
        sendLoginDataToFastAPI();
    }, []); // 이 효과는 컴포넌트가 처음 마운트될 때 한 번만 실행됩니다.
    // 🔼 [추가된 로직]

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
                로그인 완료!
            </h1>
            <p className="text-gray-700 mb-6">
                GitHub 계정으로 성공적으로 로그인되었습니다 🎉
            </p>
            {/* 사용자 안내 메시지 추가 */}
            <p className="text-sm text-gray-500 mb-6">
                (개발자 도구 콘솔(F12)을 확인하세요)
            </p>
            <Button
                onClick={handleLogout}
                className="bg-green-600 hover:bg-green-700 text-white"
            >
                로그아웃
            </Button>
        </div>
    );
}
