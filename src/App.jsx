import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import PaymentFailure from "./pages/PaymentFailedPage";
import PaymentSuccess from "./pages/PaymentSuccessPage";
import RegisterPage from "./pages/RegisterPage";
import StockPage from "./pages/StockPage";
import StoresPage from "./pages/StoresPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import VerifyPage from "./pages/VerifyPage";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/stores" : "/login"} replace />}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify" element={<VerifyPage />} />

        <Route
          path="/subscription"
          element={
            // <PrivateRoute>
              <SubscriptionPage />
            // </PrivateRoute>
          }
        />

        <Route
          path="/stores"
          element={
            <PrivateRoute>
              <StoresPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/stock"
          element={
            <PrivateRoute>
              <StockPage />
            </PrivateRoute>
          }
        />

        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
