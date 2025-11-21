import "@testing-library/jest-dom";

// Node (older versions / Jest environment) may not provide TextEncoder/TextDecoder
// so map Node's util implementations to the global scope for tests.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const util = require("util");
  // @ts-ignore - assign to global for test environment
  if (typeof global.TextEncoder === "undefined" && util.TextEncoder) {
    // @ts-ignore
    global.TextEncoder = util.TextEncoder;
  }
  if (typeof global.TextDecoder === "undefined" && util.TextDecoder) {
    // @ts-ignore
    global.TextDecoder = util.TextDecoder;
  }
} catch (e) {
  // ignore if util isn't available in the environment
}
