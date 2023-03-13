import { useState } from "react";

const VerifyCode = ({
  emailAddress,
  onResendClick,
}: {
  emailAddress: string;
  onResendClick: () => void;
}): JSX.Element => {
  const [resendCodeDisabled, setResendCodeDisabled] = useState(false);

  const handleResendClick = async function () {
    try {
      setResendCodeDisabled(true);
      onResendClick();
    } finally {
      setResendCodeDisabled(false);
    }
  };
  return (
    <>
      <div className="flex flex-row text-xs text-gray-500 md:text-sm">
        <p>
          Enter the 6-digit code sent to <span className=" text-gray-700">{emailAddress || "email"}</span>
        </p>
      </div>
      <div className="flex flex-row items-center justify-start space-x-1 text-center text-xs text-gray-500 md:text-sm">
        <p>Didn&apos;t recieve code?</p>
        <button
          type="button"
          disabled={resendCodeDisabled}
          onClick={handleResendClick}
          className="flex flex-row items-center text-blue-600 hover:underline "
        >
          Resend
        </button>
      </div>
    </>
  );
};

export default VerifyCode;
