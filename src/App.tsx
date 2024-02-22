import { useState } from 'react'
import './App.css'
import Clock from './components/Clock'
import 'moment-timezone';

interface ClockType {
  id: number,
  name: string,
  zone: number,
}

function App() {
  const [list, setList] = useState<ClockType[]>([])
  const [name, setName] = useState('');
  const [zone, setZone] = useState(0);

  const addNewClock = (e: any) => {
    e.preventDefault();
    if (name) {
      const newClock = {
        id: Date.now(),
        name,
        zone
      }

      if (list.map((clock) => clock.name).includes(newClock.name)) {
        setList([...list]);
      } else {
        setList([...list, newClock]);
      }
    }
  }

  function onDeleteClock(e: any) {
    e.preventDefault();
    let index = (list.map((clock) => clock.id).indexOf(Number(e.target.id)));
    list.splice(index,1);
    setList([...list]);
  }

  const newArray = () => {
    return( 
      list.map((clock) => 
      <Clock id={clock.id}name={clock.name} zone={clock.zone} key={clock.id} onDeleteClock={onDeleteClock}/>
      )
    ) 
  }

  return (
    <>
      <div className="input-container">
        <div className='form-row'>
          <label>Название</label>
          <input type='text' onChange={e => setName(e.target.value)}></input>
        </div>
        <div className='form-row'>
          <label>Временная зона</label>
          <input type='number'onChange={e => setZone(Number(e.target.value))} id='zone'></input>
        </div>
        <button onClick={addNewClock}>Добавить</button>
      </div>
      <div>
        <h2>Часики</h2>
        <div className='clock-container'>
        {newArray()} 
        </div>
      </div>      
    </>
  )
}

export default App
