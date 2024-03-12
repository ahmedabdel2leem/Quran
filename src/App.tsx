import { Provider, useDispatch } from 'react-redux'
import './App.css'
// import QPage from './Components/QPage/QPage'
import QVerse from './Components/QVerse/QVerse'
import { getAllTheQuran } from './store/store';
function App() {
  return <>
<Provider store={getAllTheQuran}>
  <QVerse/>
</Provider>
  </>
}

export default App
