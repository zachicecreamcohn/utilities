"use client";
import { useState, useEffect } from 'react';

export default function WordCount() {
    const [text, setText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [clipboardText, setClipboardText] = useState('');
    const [clipboardWordCount, setClipboardWordCount] = useState(0);

    const handleTextChange = (event) => {
        setText(event.target.value);
        setWordCount(event.target.value.split(' ').filter(Boolean).length);
    }

    const getWordCountFromClipboard = async () => {
        const clipboardText = await navigator.clipboard.readText();
        setClipboardText(clipboardText);
        setClipboardWordCount(clipboardText.split(' ').filter(Boolean).length);
    }

    useEffect(() => {
        getWordCountFromClipboard();
        setText(clipboardText);


        const interval = setInterval(getWordCountFromClipboard, 250);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        setClipboardWordCount(clipboardText.split(' ').filter(Boolean).length);
    }, [clipboardText]);


    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                cols={60}
                rows={10}
                />
            <p><b>Textarea</b> word count: {wordCount}</p>
            {clipboardText && (
                <div>
                    <p><b>Clipboard</b> word count: {clipboardWordCount}</p>
                </div>
            )}
        </div>
    );

}
