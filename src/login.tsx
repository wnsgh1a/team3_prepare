import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "./components/ui/card";
import { Github } from "lucide-react";
import { supabase } from "./lib/supabaseClient";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            if (data.session) window.location.replace("/");
        });
        const { data: sub } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) window.location.replace("/");
            }
        );
        return () => {
            mounted = false;
            sub.subscription.unsubscribe();
        };
    }, []);

    const loginWithGithub = async () => {
        try {
            setLoading(true);
            setErrorMsg(null);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo: `${window.location.origin}/success`, // 로그인 후 이동할 주소
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setErrorMsg(err?.message ?? "로그인 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-4">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        로그인
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                        GitHub 계정으로 간편하게 로그인하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {errorMsg ? (
                        <p className="text-sm text-destructive">{errorMsg}</p>
                    ) : null}

                    <Button
                        variant="default"
                        className="w-full bg-[#171515] hover:bg-[#24292f] text-white font-semibold text-lg py-6 transition-colors"
                        onClick={loginWithGithub}
                        disabled={loading}
                    >
                        <Github className="mr-3 h-5 w-5" />
                        {loading ? "GitHub로 이동 중..." : "GitHub로 계속하기"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        로그인 시 서비스 약관 및 개인정보 처리방침에 동의하게
                        됩니다.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
