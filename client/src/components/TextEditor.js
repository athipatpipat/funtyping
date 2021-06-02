import { useState } from 'react';
import useSound from 'use-sound';
import bubbleSound from '../assets/bubbles.mp3'
import claySound from '../assets/clay.mp3'
import confettiSound from '../assets/confetti.mp3'
import coronaSound from '../assets/corona.mp3'
import dottedSound from '../assets/dotted-spiral.mp3'
import flash1Sound from '../assets/flash-1.mp3'
import flash2Sound from '../assets/flash-2.mp3'
import flash3Sound from '../assets/flash-3.mp3'
import glimmerSound from '../assets/glimmer.mp3'
import moonSound from '../assets/moon.mp3'
import pinwheelSound from '../assets/pinwheel.mp3'
import piston1Sound from '../assets/piston-1.mp3'
import piston2Sound from '../assets/piston-2.mp3'
import piston3Sound from '../assets/piston-3.mp3'
import prism1Sound from '../assets/prism-1.mp3'
import prism2Sound from '../assets/prism-2.mp3'
import prism3Sound from '../assets/prism-3.mp3'
import splitsSound from '../assets/splits.mp3'
import squiggleSound from '../assets/squiggle.mp3'
import strikeSound from '../assets/strike.mp3'
import suspensionSound from '../assets/suspension.mp3'
import timerSound from '../assets/timer.mp3'
import ufoSound from '../assets/ufo.mp3'
import veilSound from '../assets/veil.mp3'
import wipeSound from '../assets/wipe.mp3'
import zigzagSound from '../assets/zig-zag.mp3'

function TextEditor(){
    const [text, setText] = useState('');
    const [soundA, setSoundA] = useState(bubbleSound)
    const letterArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z' ];
    const playSound = (e) => {
        const key = e.key.toLowerCase();
        switch (key) {
            case 'a': 
                playA();
                break;
            case 'b': 
                playB();
                break;
            case 'c':
                playC();
                break;
            case 'd':
                playD();
                break;
            case 'e':
                playE();
                break;
            case 'f':
                playF();
                break;
            case 'g':
                playG();
                break;
            case 'h':
                playH();
                break;
            case 'i':
                playI();
                break;
            case 'j':
                playJ();
                break;
            case 'k':
                playK();
                break;
            case 'l':
                playL();
                break;
            case 'm':
                playM();
                break;
            case 'n':
                playN();
                break;
            case 'o':
                playO();  
                break;
            case 'p':
                playP(); 
                break;
            case 'q':
                playQ();
                break;
            case 'r':
                playR();
                break;
            case 's':
                playS();
                break;
            case 't':
                playT();
                break;
            case 'u':
                playU();
                break;
            case 'v':
                playV();
                break;
            case 'w':
                playW();
                break;
            case 'x':
                playX();
                break;
            case 'y':
                playY();
                break;
            case 'z':
                playZ();
                break;
            default:
                const randomIndex = Math.floor(Math.random() * 26);
                const randomLetter = letterArray[randomIndex];
                console.log(key);
                console.log(`play${randomLetter}()`);
                eval(`play${randomLetter}()`);
                break;
        }
    }
    
    let [playA] = useSound(
        soundA, {
            interrupt: true,
        });

    const [playB] = useSound(
        claySound, {
            interrupt: true,
        });

    const [playC] = useSound(
        confettiSound, {
            interrupt: true,
        });
    
    const [playD] = useSound(
        dottedSound, {
            interrupt: true,
        });

    const [playE] = useSound(
        flash1Sound, {
            interrupt: true,
        });

    const [playF] = useSound(
        flash2Sound, {
            interrupt: true,
        });

    const [playG] = useSound(
        flash3Sound, {
            interrupt: true,
        });

    const [playH] = useSound(
        glimmerSound, {
            interrupt: true,
        });

    const [playI] = useSound(
        moonSound, {
            interrupt: true,
        });

    const [playJ] = useSound(
        pinwheelSound, {
            interrupt: true,
        });

    const [playK] = useSound(
        piston1Sound, {
            interrupt: true,
        });

    const [playL] = useSound(
        piston2Sound, {
            interrupt: true,
        });

    const [playM] = useSound(
        piston3Sound, {
            interrupt: true,
        });

    const [playN] = useSound(
        prism1Sound, {
            interrupt: true,
        });

    const [playO] = useSound(
        prism2Sound, {
            interrupt: true,
        });

    const [playP] = useSound(
        prism3Sound, {
            interrupt: true,
        });

    const [playQ] = useSound(
        coronaSound, {
            interrupt: true,
        });
    const [playR] = useSound(
        splitsSound, {
            interrupt: true,
        });

    const [playS] = useSound(
        squiggleSound, {
            interrupt: true,
        });

    const [playT] = useSound(
        strikeSound, {
            interrupt: true,
        });

    const [playU] = useSound(
        suspensionSound, {
            interrupt: true,
        });

    const [playV] = useSound(
        timerSound, {
            interrupt: true,
        });

    const [playW] = useSound(
        ufoSound, {
            interrupt: true,
        });

    const [playX] = useSound(
        veilSound, {
            interrupt: true,
        });

    const [playY] = useSound(
        wipeSound, {
            interrupt: true,
        });
        
    const [playZ] = useSound(
        zigzagSound, {
            interrupt: true,
        });
        
    const changeA = () => {
        fetch(`http://localhost:5000/file/7dede6dbcdbcda21206c66440a48f514.mp3`)
            .then(response => setSoundA(response.url))
            .catch(e => console.log(e))
    }

    return (
        <div className='container'>
            <textarea 
                className='text-editor' 
                type='text' 
                placeholder='Type Something!'
                value = {text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => playSound(e)}
            >
            </textarea>
            <button onClick={changeA}>Change Sound A</button>
        </div>
    )
}

export default TextEditor