import { Suspense } from "react";
import VerifyOtp from "../../../components/Auth/VerifyOtp";
import { Loader2 } from "lucide-react";

export default function VerifyOtpPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen w-full">
            <Loader2 className="animate-spin" />
          </div>
        }
      >
        <VerifyOtp />
      </Suspense>
    </div>
  );
}
