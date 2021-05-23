import { useState } from 'react';
import useSound from 'use-sound';


function Demo(){
    const bubblesAudio = '../bubbles.mp3'
    const [text, setText] = useState('');
    
    const [playSound] = useSound(
        bubblesAudio
    );
    // let audio0 = () => {playSound()}
    // let audio = new Audio(bubblesAudio)
  


    // const start = () => {
    //     audio.play()
    // }

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

export default Demo