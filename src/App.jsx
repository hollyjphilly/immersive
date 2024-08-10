import { useState } from "react";
import Sparkles from './components/Sparkles';
import SpeechEngine from './components/SpeechEngine';
import './App.css';

function App() {
  return (
    <div>
      <SpeechEngine />
      <Sparkles />
    </div>
  )
}

export default App
