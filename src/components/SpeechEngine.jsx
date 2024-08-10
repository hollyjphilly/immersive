import React from "react"
import { useEffect, useState } from 'react';
import micIcon from '../assets/mic.svg';
import glowSound from '../assets/glow_sound_v2.mp3';
import { COLORS } from '../utils/constants';
import { findLastColor } from "../utils/helpers";
import './SpeechEngine.css'

const soundEffect = new Audio(glowSound);

export default function SpeechEngine() {
    const [backgroundColor, setBackground] = useState("#081738ff");
    const [isVisible, setVisibile] = useState(true);
    const [message, setMessage] = useState("Click to begin narrating.");

    const showMic = isVisible ? "visible" : "hidden";
    const showLoader = isVisible ? "hidden" : "visible";

    // let descriptors;

    const [hasClicked, setClicked] = useState(false);
    const [isListening, setListening] = useState(false);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    const recognition = new SpeechRecognition();
    
    if (SpeechGrammarList) {
        // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
        // This code is provided as a demonstration of possible capability. You may choose not to use it.
        const speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(COLORS.grammar, 1);
        recognition.grammars = speechRecognitionList;
    }

    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const speech = event.results[event.resultIndex][0]?.transcript?.toLowerCase();
        const color = findLastColor(speech); // color or false
        if (/the end/i.test(speech) || /stop/i.test(speech)) {
            handleStop();
        } else {
            setMessage(speech);
            if (color) { setBackground(color); }
        }
    };

    recognition.onaudiostart = function() {
        setListening(true);
    }

    recognition.onaudioend = function() {
        setListening(false);
    }

    recognition.onnomatch = function(event) {
        setMessage("speech not recognized");
    }

    recognition.onerror = function(event) {
        if (event.error) { 
            if (event.error === 'no-speech') {
                setListening(false);
            } else {
                setMessage(`error: ${event.error}`);
            }
        } 
    }

    useEffect(() => {
    if (hasClicked && !isListening) {
        setListening(true);
        recognition.start();
    }
}, [hasClicked, setListening, isListening])


    function handleStart() {
        recognition.start();
        soundEffect.play();
        setBackground("white");
        setClicked(true);
        setTimeout(() => {
            setBackground("#081738ff");
        }, 2000);
        setTimeout(() => {
            setVisibile(false);
            setMessage(" ");
        }, 1500);
        
    }

    function handleStop() {
        recognition.stop();
        soundEffect.play();
        setMessage(" ");
        setBackground("white");
        setClicked(false);
        setTimeout(() => {
            setVisibile(true);
            setMessage("Click to begin narrating.");
            setBackground("#081738ff");
        }, 1000);
    }

    return (
        <div className="background" style={{ backgroundColor }}>
            <div className="flex-column">
                {/* <ImageWithFilter {...descriptors} /> * timeOfDay="morning" weather="clear" mood="happy" season="spring" */}
                {isVisible
                    ? (<img src={micIcon} className="icon mic" alt="Microphone icon" onClick={handleStart}/>)
                    : (<div className="loader"></div>)}
                <div id="below-mic-text">{message}</div>
            </div>
        </div>
    );
}