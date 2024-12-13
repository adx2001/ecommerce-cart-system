import { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../stores/authStore";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);
  const setError = useAuthStore((state) => state.setError);
  const error = useAuthStore((state) => state.error);
  const isLoading = useAuthStore((state) => state.isLoading);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post("/user/login", {
          email: formData.email,
          password: formData.password,
        });

        const user = response.data.data;

        setUser(user);
        toast.success(response.data.message);

        if (user.role === "admin") {
          navigate("/productManagement");
        } else {
          navigate("/productLists");
        }
      } else {
        // Register request
        response = await axios.post("/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        console.log("🚀 ~ handleSubmit ~ response:", response);

        // Switch to login form after successful registration
        if (response.data.data) {
          toast.success("Registration successful. Please login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">
            {error}
          </p>
        )}

        {/* Name input (only for Register) */}
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
        )}

        {/* Email input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        {/* Password input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          required
        />

        {/* Role dropdown (only for Register) */}
        {!isLogin && (
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-300 ${isLoading ? "opacity-70" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>

        {/* Switch Form Button */}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 w-full text-center text-blue-500 font-semibold"
        >
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
