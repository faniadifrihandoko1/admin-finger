// lib/setTokenExpiredModal.ts

import { useTokenExpiredModal } from "../../store/use-token-expired-modal";

export const setTokenExpiredModal = () => {
  useTokenExpiredModal.getState().showModal();
};
