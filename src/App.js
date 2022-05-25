import Home from './Home'
import Privacy from './Privacy'
import BasicSelect from './BasicSelect'
import NativeSelectDemo from './NativeSelectDemo'
import {Routes, Route} from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="basicselect" element={<BasicSelect />} />
        <Route path="nativeselect" element={<NativeSelectDemo />} />
      </Routes>
    </>
  )
}

export default App
