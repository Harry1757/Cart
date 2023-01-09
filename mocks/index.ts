const initMockAPI = async (): Promise<void> => {
  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen();
  } else {
    const { worker } = await import("./browser");
    // worker.start({ onUnhandledRequest: "bypass" });
    worker.start();
  }
};

export default initMockAPI;
