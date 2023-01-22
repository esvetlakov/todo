import { useState, useEffect } from 'react';

export default function Timer(props) {
  const { taskMin, taskSec } = props;
  const [min, setMin] = useState(taskMin);
  const [sec, setSec] = useState(taskSec);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (active) {
        if (sec < 60) {
          setSec((s) => s + 1);
        }
        if (sec >= 60) {
          setSec(0);
          setMin((m) => m + 1);
        }
        if (min >= 60) {
          setMin(0);
        }
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [active, min, sec]);

  return (
    <>
      <button type="button" className="icon icon-play" aria-label="start timer" onClick={() => setActive(true)} />
      <button type="button" className="icon icon-pause" aria-label="pause timer" onClick={() => setActive(false)} />
      <span className="time">
        {min}:{sec}
      </span>
    </>
  );
}
