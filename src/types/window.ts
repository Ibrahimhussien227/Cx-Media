
export {}
declare global {
  interface Window {
    Lean: {
      link: (p: object) => void;
      connect: (p: object) => void;
      reconnect: (p: object) => void;
      createPaymentSource: (p: object) => void;
      updatePaymentSource: (p: object) => void;
      pay: (p: object) => void;
    }
  }
}