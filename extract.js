const glob = require("globby");
const { transformFileSync } = require("@babel/core");
const manageTranslations = require("react-intl-translations-manager").default;

const SOURCE_DIR = ["src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}"];
const DEFAULT_MSG = "";

function getMessages(path) {
  const result = transformFileSync(path, {
    presets: ["react-app"],
    plugins: [["react-intl", { extractFromFormatMessageCall: false }]]
  });

  const descriptors = result.metadata["react-intl"].messages.map(d => ({
    ...d,
    defaultMessage: d.defaultMessage || DEFAULT_MSG
  }));

  return { path, descriptors };
}

manageTranslations({
  messagesDirectory: "messages",
  translationsDirectory: "src/locales/",
  whitelistsDirectory: "src/locales/whitelists/",
  languages: ["en", "it"],
  overrideCoreMethods: {
    provideExtractedMessages: () => glob.sync(SOURCE_DIR).flatMap(getMessages)
  }
});
