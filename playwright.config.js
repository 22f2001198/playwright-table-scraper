module.exports = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ],
};
