import { useContext } from "react";

import { AuthContext } from "@nlw-copa/contexts/AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
