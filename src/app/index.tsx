import { Suspense } from "react"

import { Router } from "./router"

const App = () => {
  return (
    <Suspense>
      <Router />
    </Suspense>
  )
}

export default App
