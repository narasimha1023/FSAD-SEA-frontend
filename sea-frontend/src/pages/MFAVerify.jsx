import { useState, useRef, useEffect } from "react";

export default function MFAVerify({ user, onVerified, onBack }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendMsg, setResendMsg] = useState("");
  const inputRefs = useRef([]);

  // countdown
  useEffect(() => {
    if (timer === 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // auto-focus first box
  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
    // auto-submit when all filled
    if (val && i === 5) {
      const code = [...next].join("");
      if (code.length === 6) setTimeout(() => verify([...next]), 50);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...digits];
    pasted.split("").forEach((ch, idx) => { if (idx < 6) next[idx] = ch; });
    setDigits(next);
    setError("");
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
    if (pasted.length === 6) setTimeout(() => verify(next), 50);
  };

  const verify = (d = digits) => {
    const entered = d.join("");
    if (entered.length < 6) { setError("Please enter all 6 digits."); return; }
    if (entered === user.mfaCode) {
      setSuccess(true);
      setError("");
      setTimeout(() => onVerified(user), 800);
    } else {
      setError("Incorrect code. Please try again.");
      setDigits(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(30);
    setDigits(["", "", "", "", "", ""]);
    setError("");
    setResendMsg(`Code resent! Your MFA code is: ${user.mfaCode}`);
    setTimeout(() => setResendMsg(""), 4000);
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const maskedEmail = user.email.replace(/(.{2}).+(@.+)/, "$1****$2");

  return (
    <div className="mfa-overlay">
      <div className="mfa-card">
        {/* header */}
        <div className="mfa-header">
          <div className="mfa-shield">{success ? "✅" : "🔐"}</div>
          <h2>{success ? "Verified!" : "Two-Factor Authentication"}</h2>
          <p className="text-muted">
            {success
              ? "Redirecting to your dashboard..."
              : <>Enter the 6-digit code for <strong>{user.name}</strong> ({maskedEmail})</>}
          </p>
        </div>

        {!success && (
          <>
            {/* user info strip */}
            <div className="mfa-user-strip">
              <div className="user-avatar sm">{user.name.charAt(0)}</div>
              <div>
                <strong>{user.name}</strong>
                <span className="text-muted"> · {user.studentId}</span>
              </div>
              <span className={`role-badge ${user.role}`}>{user.role}</span>
            </div>

            {/* OTP boxes */}
            <div className="otp-group" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  className={`otp-box ${d ? "filled" : ""} ${error ? "shake" : ""}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                />
              ))}
            </div>

            {error && <p className="mfa-error">⚠️ {error}</p>}
            {resendMsg && <p className="mfa-resend-msg">📨 {resendMsg}</p>}

            {/* hint box */}
            <div className="mfa-hint">
              <span>💡</span>
              <span>Your MFA code: <strong className="mfa-code-hint">{user.mfaCode}</strong></span>
            </div>

            <button className="btn btn-primary btn-full mfa-submit" onClick={() => verify()}>
              Verify & Sign In
            </button>

            <div className="mfa-footer">
              <button className="mfa-resend" onClick={handleResend} disabled={timer > 0}>
                {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
              </button>
              <span className="mfa-sep">·</span>
              <button className="mfa-back" onClick={onBack}>← Back to login</button>
            </div>
          </>
        )}

        {success && <div className="mfa-success-bar"></div>}
      </div>
    </div>
  );
}
