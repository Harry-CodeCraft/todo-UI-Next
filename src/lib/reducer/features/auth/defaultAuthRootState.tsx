import { AuthRoot } from "@/lib/types/rootTypes";

export function getDefaultAuthState(): AuthRoot {
  return {
    authState: {
      Autherror: false,
      Authloading: false,
    },
  };
}
