import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppShell } from "@/components/layout/AppShell";
import { Placeholder } from "@/pages/Placeholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Placeholder title="Resumen" />} />
          <Route path="usuarios" element={<Placeholder title="Usuarios" />} />
          <Route path="contenido" element={<Placeholder title="Contenido" />} />
          <Route path="auditoria" element={<Placeholder title="Auditoría" />} />
          <Route path="configuracion" element={<Placeholder title="Configuración" />} />
          <Route path="salud" element={<Placeholder title="Salud del sistema" />} />
          <Route path="reportes" element={<Placeholder title="Reportes" />} />
        </Route>
        <Route path="*" element={<Placeholder title="Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
}
