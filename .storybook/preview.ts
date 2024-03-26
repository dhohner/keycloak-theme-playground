import type { Preview } from "@storybook/react";
import "../src/login/KcApp.css";
import "./storybook.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
