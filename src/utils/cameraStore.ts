import { create } from "zustand";

type CameraState = {
  capturedImage: {
    uri: string;
    base64?: string;
  } | null;
  setCapturedImage: (image: { uri: string; base64?: string } | null) => void;
  clearCapturedImage: () => void;
};

export const useCameraStore = create<CameraState>((set) => ({
  capturedImage: null,
  setCapturedImage: (image) => set({ capturedImage: image }),
  clearCapturedImage: () => set({ capturedImage: null }),
}));
