import { useState } from 'react';
import useSound from 'use-sound';
import audio from '../assets/comfort.mp3'

function TextEditor(){
    const [text, setText] = useState('');
    
    const [playSound] = useSound(
        audio
    );

    return (
        <div>
            <input 
                type='text' 
                placeholder='Type Something!'
                value = {text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={playSound}>
                click me 
            </button> 
        </div>
    )
}

export default TextEditor