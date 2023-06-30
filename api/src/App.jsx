import AuthProvider from "./services/AuthContext";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
