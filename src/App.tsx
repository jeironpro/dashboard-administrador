import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppShell } from "@/components/layout/AppShell";
import { Overview } from "@/pages/Overview";
import { Content } from "@/pages/Content";
import { Health } from "@/pages/Health";
import { Logs } from "@/pages/Logs";
import { Reports } from "@/pages/Reports";
import { Settings } from "@/pages/Settings";
import { Users } from "@/pages/Users";
import { Placeholder } from "@/pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Overview />} />
          <Route path="usuarios" element={<Users />} />
          <Route path="contenido" element={<Content />} />
          <Route path="auditoria" element={<Logs />} />
          <Route path="configuracion" element={<Settings />} />
          <Route path="salud" element={<Health />} />
          <Route path="reportes" element={<Reports />} />
        </Route>
        <Route path="*" element={<Placeholder title="Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
}
