import { useState } from 'react';
import Animations from './Animations'
import TextEditor from './TextEditor'

function InteractionSpace() {
    return (
        <div className="InteractionSpace">
            <Animations />
            <TextEditor />

        </div>
    )
}

export default InteractionSpace