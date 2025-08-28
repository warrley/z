import { SignupForm } from "@/components/auth/signup-form";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function Page() {
    return (
        <div className="max-w-lg mx-auto mt-12 px-6">
            <Logo size={56} />
            <h1 className="mt-10 text-2xl">Create your account</h1>
            <div className="mt-10 mb-14 flex flex-col gap-6">
                <SignupForm/>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3">
                <div className="text-gray-500">Already have an account?</div>
                <Link href="/signup" className="hover:underline">Login</Link>
            </div>
        </div>
    )
}