import Button from "antd/es/button"

import { ThemeProvider } from "~src/theme"

function IndexOption() {
  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 16
        }}>
        <div>2333</div>
        <Button type="primary">Fascinating</Button>
      </div>
    </ThemeProvider>
  )
}

export default IndexOption
