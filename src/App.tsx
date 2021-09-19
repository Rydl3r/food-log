import InputComp from './components/InputComp';
import NavbarComp from './components/NavbarComp';
import TableComp from './components/TableComp';

import { useState } from 'react'


function App() {

  const [logged, setLogged] = useState(false)
  const [adding, setAdding] = useState(false)

  return (
    <div className="App">
      <NavbarComp setLogged={setLogged} />
      <InputComp setAdding={setAdding} />
      <TableComp adding={adding} logged={logged} />
    </div>
  );
}

export default App;
