import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { COUNTRIES } from "@/lib/types/user";
import { toast } from "sonner";

export default function SignupPage() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [nationality, setNationality] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [cityTown, setCityTown] = useState("");
  const [postcodeZip, setPostcodeZip] = useState("");
  const [country, setCountry] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [role, setRole] = useState("user");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements = [
    { met: password.length >= 8, text: "Minimum 8 letters" },
    { met: /[0-9]/.test(password), text: "At least one number" },
    {
      met: /[!@#$%^&*]/.test(password),
      text: "At least one special character",
    },
  ];

  const allPasswordRequirementsMet = passwordRequirements.every(
    (req) => req.met
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!allPasswordRequirementsMet) {
      setError("Password does not meet requirements");
      return;
    }

    if (!firstName || !surname || !dateOfBirth || !phone || !nationality) {
      setError("Please fill in all required personal information fields");
      return;
    }

    if (!addressLine1 || !cityTown || !postcodeZip || !country) {
      setError("Please fill in all required address fields");
      return;
    }

    if (!companyType) {
      setError("Please select a company type");
      return;
    }

    setIsLoading(true);

    try {
      // Check for existing admin
      if (role === "admin") {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const adminExists = users.some((u: any) => u.role === "admin");
        if (adminExists) {
          setError("An admin already exists. Only one admin allowed.");
          setIsLoading(false);
          return;
        }
      }

      // Save user
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password,
        firstName,
        middleName,
        surname,
        dateOfBirth,
        phone,
        nationality,
        addressLine1,
        addressLine2,
        cityTown,
        postcodeZip,
        country,
        companyType,
        role,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Log activity
      const logs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
      logs.push({
        id: `log_${Date.now()}`,
        userId: newUser.id,
        action: "User Registration",
        details: `New ${role} account created for ${firstName} ${surname}`,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("activityLogs", JSON.stringify(logs));

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header showFlashSale={false} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 pt-[140px] pb-20">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Please enter your details</p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 bg-white p-8 rounded-2xl shadow-xl"
            >
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-0 mb-10">
                  Personal Information
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Surname *
                    </label>
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth (dd/mm/yyyy) *
                    </label>
                    <input
                      type="text"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      placeholder="01/01/1990"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 1234567890"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality *
                  </label>
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {password && (
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center ${
                              req.met ? "bg-green-500" : "bg-gray-300"
                            }`}
                          >
                            {req.met && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </span>
                          <span
                            className={
                              req.met ? "text-green-600" : "text-gray-500"
                            }
                          >
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Address Details Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-0 mt-14 mb-10">
                  Address Details
                </h3>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      value={cityTown}
                      onChange={(e) => setCityTown(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Postcode / ZIP *
                    </label>
                    <input
                      type="text"
                      value={postcodeZip}
                      onChange={(e) => setPostcodeZip(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Company Information Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-0 mt-14 mb-10">
                  Company Information
                </h3>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Type *
                  </label>
                  <div className="space-y-2">
                    {["LTD Company", "Sole Trader", "Virtual Address"].map(
                      (type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="companyType"
                            value={type}
                            checked={companyType === type}
                            onChange={(e) => setCompanyType(e.target.value)}
                            className="w-4 h-4 text-[#D30B5F]"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors bg-gray-50"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D30B5F] hover:bg-[#B00A4F] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Creating Account..." : "Sign up"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#D30B5F] font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
