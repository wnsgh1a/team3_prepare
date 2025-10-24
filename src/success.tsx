// src/Success.tsx
import { Button } from "./components/ui/button";
import { supabase } from "./lib/supabaseClient";

export default function Success() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.replace("/"); // 로그인 페이지로 되돌리기
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            <h1 className="text-4xl font-bold text-green-700 mb-4">
                로그인 완료!
            </h1>
            <p className="text-gray-700 mb-6">
                GitHub 계정으로 성공적으로 로그인되었습니다 🎉
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
