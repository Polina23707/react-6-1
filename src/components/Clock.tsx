import moment from 'moment'
import 'moment-timezone';
import { useState } from "react";

interface ClockType {
  id: number,
  name: string,
  zone: number,
  onDeleteClock: any,
}

const Clock =({id, name, zone, onDeleteClock}: ClockType) => {
  const [clock, setClock] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  let intervalId: number;

  intervalId = setInterval(() => {
    let timeZoneHours = Number(zone) + Number(moment().format('hh'));
    setClock({hours: timeZoneHours, minutes: Number(moment().format('mm')), seconds: Number(moment().format('ss'))});
  }, 1000);

  const onDelete = (e: any) => {
    clearInterval(intervalId);
    onDeleteClock(e);
  }

  return(
    <div className="clock">
      <h3 className="clock-name">{name}</h3>
      <div className="clock-time">{clock.hours}: {clock.minutes}</div>
      <button className='delete-btn' id={id.toString()} onClick={onDelete}>Х</button>
    </div>
  )
}

export default Clock;