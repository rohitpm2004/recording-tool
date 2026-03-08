import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus, Mail, Lock, User, Building2, Users, KeyRound } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "student", collegeName: "", group: "", classCode: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === "teacher" ? "/teacher" : "/student");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Study<span>Track</span></h1>
        <p className="auth-subtitle">Create your account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: "relative" }}>
              <User
                size={18}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
              />
              <input
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={set("name")}
                required
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
              />
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                required
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
              />
              <input
                type="password"
                className="form-input"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={set("password")}
                required
                minLength={6}
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
              />
              <input
                type="password"
                className="form-input"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                style={{ paddingLeft: 42 }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-select" value={form.role} onChange={set("role")}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>


          {form.role === "student" && (
            <>
              <div className="form-group">
                <label className="form-label">College Name</label>
                <div style={{ position: "relative" }}>
                  <Building2
                    size={18}
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
                  />
                  <select
                    className="form-select"
                    value={form.collegeName}
                    onChange={set("collegeName")}
                    style={{ paddingLeft: 42 }}
                    required
                  >
                    <option value="" disabled>Select College</option>
                    <option value="vivekananda college">Vivekananda College</option>
                    <option value="city college">City College</option>
                    <option value="begumpet college">Begumpet College</option>
                    <option value="golconda college">Golconda College</option>
                    <option value="Malkajgiri college">Malkajgiri College</option>
                    <option value="Hussanialam college">Hussanialam College</option>
                    <option value="BJR college">BJR College</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Group</label>
                <div style={{ position: "relative" }}>
                  <Users
                    size={18}
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}
                  />
                  <select
                    className="form-select"
                    value={form.group}
                    onChange={set("group")}
                    style={{ paddingLeft: 42 }}
                    required
                  >
                    <option value="" disabled>Select Group</option>
                    <option value="BSC">BSC</option>
                    <option value="BCOM">BCOM</option>
                    <option value="BCA">BCA</option>
                    <option value="BA">BA</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            <UserPlus size={18} />
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>

        <p className="auth-toggle">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
