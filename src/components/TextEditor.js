import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useSound from 'use-sound';
import keyboardSound from '../assets/comfort.mp3'

function TextEditor(){
    const [text, setText] = useState('');
    
    const playSound = (e) => {
        // const key = e.target.value;
        console.log(e);
        if (e.key === 'a') {
            playKeyboardSound();
        } else {
            alert('What are you doing!');
        }
    }
    const [playKeyboardSound] = useSound(
        keyboardSound
    );

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