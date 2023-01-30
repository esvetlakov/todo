import { useState } from 'react';

import NewTask from '../new-task/new-task';

export default function AppHeader({ onItemAdd }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    onItemAdd(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <NewTask
        label={label}
        min={min}
        sec={sec}
        onLabelChange={(e) => setLabel(e.target.value)}
        onMinChange={(e) => setMin(e.target.value)}
        onSecChange={(e) => setSec(e.target.value)}
        onSubmit={onSubmit}
      />
    </header>
  );
}
