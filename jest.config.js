export default {
  testEnvironment: "jsdom",
  transform: {},
  extensionsToTreatAsEsm: [".jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};
