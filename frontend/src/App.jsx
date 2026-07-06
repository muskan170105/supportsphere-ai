import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import LiveChat from "./pages/LiveChat";
import KnowledgeBase from "./pages/KnowledgeBase";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <Layout>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/live-chat"
          element={<LiveChat />}
        />

        <Route
          path="/knowledge-base"
          element={<KnowledgeBase />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </Layout>
  );
}

export default App;