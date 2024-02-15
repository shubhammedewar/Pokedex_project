import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'

function App() {
  return (
    <div className='outer-pokedex'>
      <h1 id='pokedex-heading'>
        <Link to={'/'}> Pokédex</Link>
        </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
