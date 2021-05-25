import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useSound from 'use-sound';
import keyboardSound from '../assets/keyboard.mp3'
import comfortSong from '../assets/comfort.mp3'
import bubbleSound from '../assets/bubbles.mp3'

function TextEditor(){
    const [text, setText] = useState('');
    
    const playSound = (e) => {
        // const key = e.target.value;
        const key = e.key;
        // console.log(e);
        switch (key) {
            case 'a': 
                playKeyboardSound();
                break;
            case 'b': 
                playComfortSong();
                break;
            case 'c':
                playBubbleSound();

            default:
                console.log('lol lol')
                break;
        }
    }
    const [playKeyboardSound] = useSound(
        keyboardSound, {
         interrupt: true,
        });
    
    const [playComfortSong] = useSound(
        comfortSong, {
            interrupt: true,
        });

    const [playBubbleSound] = useSound(
        bubbleSound, {
            interrupt: true,
        });

    return (
        <div >
            {/* <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(e, editor) => {
                    const data = editor.getData();
                    // console.log(editor);
                    setText(data);
                    // editor.on('key', playSound(e))
                }}
            /> */}
            <input 
                type='text' 
                placeholder='Type Something!'
                value = {text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => playSound(e)}
            />
            <button onClick={playSound}>
                click me 
            </button> 
        </div>
    )
}

export default TextEditor