import React, { useState } from 'react';
import styles from '../StyleSheets/SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  // acá va tu código
  const [city, setCity] = useState('');
  return (
    <form className={styles.container} onSubmit={(e) => {
      if(city==='')return alert("Tienes que elegir una ciudad")
      e.preventDefault();
      onSearch(city);
      setCity('')
    }}>
      <input
        className={styles.input}
        type='search'
        placeholder="¿El clima de qué ciudad querés ver hoy?..."
        onChange={event => setCity(event.target.value)}
        value={city}
      />
      <input className={styles.button} type='submit' value='buscar' />
    </form>
  )
};