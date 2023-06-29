import App from "../App";
import AuthProvider from "../services/AuthContext";

export default function Index() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
