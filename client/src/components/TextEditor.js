// ========================================
//           Import Dependencies
// ========================================
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useSound from 'use-sound';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// ========================================
//           Initial Sounds Import
// ========================================
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

function TextEditor() {
    // =====================================
    //              Define States
    // =====================================
    const [text, setText] = useState(''); // Text Area State
    const [soundA, setSoundA] = useState(bubbleSound) // Sounds State
    const [form, setForm] = useState({}) // Form State
    const [errors, setErrors] = useState({}) // Form Validation State
    const [show, setShow] = useState(false); // Model (Pop-up Form) State


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

    // ================================================
    //                   Change Sound
    // ================================================
    const uploadSound = () => {
        let soundForm = document.getElementById('soundForm');
        let formData = new FormData(soundForm);
        console.log(formData);
        fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            })
            .then(async response => {
                console.log(response);
                const resposneMessage = await response.json();
                return resposneMessage;
            })
            .then((response) => {
                console.log(response.key);
                changeA(response.key);
            })
            .then(() => {
                setForm({})
                setErrors({})
                setShow(false);
            })
            .catch(e => console.log(e))
    }

    const changeA = (key) => {
        console.log(key)
        fetch(`http://localhost:5000/file/${key}.mp3`)
            .then(response => setSoundA(response.url))
            .then(alert('New Sound Upload!'))
            .catch(e => console.log(e))
    }

    // ================================================
    //        Form Model Helper Functions
    // ================================================
    const handleClose = () => {
        setForm({});
        setErrors({});
        setShow(false);
    }
    const handleShow = () => setShow(true);

    // ================================================
    //        Form Validation Helper Functions
    // Credit: https://github.com/AlecGrey/demo-form-for-blog
    // ================================================

    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })
        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
          ...errors,
          [field]: null
        })
      }
    
      const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if ( Object.keys(newErrors).length > 0 ) {
          // We got errors
          setErrors(newErrors)
        } else {
          // No errors
          uploadSound();
        }
      }
    
    const findFormErrors = () => {
        const { key, sound } = form;
        const newErrors = {};
        // Key errors
        if (!key || key === '') newErrors.key = 'Please select the key!'
        // Sound errors
        if (!sound || sound === '') newErrors.sound = 'Please upload the sound!'
        return newErrors;
    }

    return (
        <div className='container'>

            <h1>FunTyping</h1>

            {/* Text Area */}
            <textarea 
                className='text-editor' 
                type='text' 
                placeholder='Type Something!'
                value = {text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => playSound(e)}
            >
            </textarea>
            
            {/* Handle Sound Chnage */}
            <Button variant="primary" onClick={handleShow}>
                Change Sound
            </Button>
            
            {/* to diable the warning do  animation={false} */}
            {/* but it doesnt look as good */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Select Key & Upload Sounds</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id='soundForm' name='soundForm'>
                        <Form.Group>
                            <Form.Control
                                name='key'
                                as='select'
                                onChange={ e => setField('key', e.target.value) }
                                isInvalid={ !!errors.key }
                            >
                                <option value=''>Choose the key</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>{ errors.key }</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                name='file'
                                type="file"
                                onChange={(e) => setField('sound', e.target.files[0])}
                                isInvalid={ !!errors.sound }
                                feedback={ errors.sound }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TextEditor