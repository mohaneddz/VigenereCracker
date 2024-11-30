import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import LetterOccurrencesChart from './components/Chart';
import './css/style.css';

import Table from './components/table';
import Input from './components/Input';
import { reverseVigenereCipher } from './utils/results';

const App = () => {

  const [inputValue, setInputValue] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [keyInputVisible, setKeyInputVisible] = useState(false);
  const [decryptedText, setDecryptedText] = useState('');
  const [selectedOption, setSelectedOption] = useState('enter');
  const [replacingLetters, setReplacingLetters] = useState({});
  const [map, setMap] = useState({});

  const resultRef = React.createRef();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setKeyInputVisible(e.target.value === 'guess');
    setDecryptedText('');
  };

  function occDict() {
    const newMap = {};
    for (let i = 0; i < inputValue.length; i++) {
      const letter = inputValue[i].toUpperCase();
      if (newMap[letter]) {
        newMap[letter] += 1;
      } else {
        newMap[letter] = 1;
      }
    }
    setMap(newMap);
  }

  function loadKeys() {
    let keys = [];
    let letterOccurrences = [];
    // Collect letters and their occurrences
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i);
      if (map[letter.toUpperCase()] !== undefined) {
        letterOccurrences.push({ letter, count: map[letter.toUpperCase()] });
      }
    }

    // Sort letters by occurrences in descending order
    letterOccurrences.sort((a, b) => b.count - a.count);

    // Generate JSX elements based on sorted letters
    letterOccurrences.forEach((item, index) => {
      keys.push(
        <div key={index} className="flex justify-center align-center items-center">

          <Input
            type={'readonlyChar'}
            className={"input-with-number text-white bg-blue-900"}
            value={item.letter}
            number={item.count}
            maxLength={100}
            onChange={(e) => {
            }}
          />

          <div className='text-9xl flex items-center justify-center h-full w-full'>&rarr;</div>
          
          <input
            maxLength={1}
            data-letter={item.letter}
            onChange={(e) => {
              if (inputValue) {
                const newValue = e.target.value.toUpperCase();
                const newReplacingLetters = {
                  ...replacingLetters,
                  [item.letter]: newValue
                };
                setReplacingLetters(newReplacingLetters);

                // Apply all replacements sequentially
                let newDecryptedText = inputValue;
                Object.entries(newReplacingLetters).forEach(([letter, replacement]) => {
                  if (replacement) {
                    newDecryptedText = newDecryptedText.replace(
                      new RegExp(letter, 'g'),
                      replacement
                    );
                  }
                });

                setDecryptedText(newDecryptedText);
              }
            }}
            type="text"
            className={`text-black font-bold text-center text-2xl m-4 p-2 h-20 w-20 bg-slate-400 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none focus:bg-slate-300 transition-colors duration-300`}
          />

        </div>
      );
    });
    return keys;
  }

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.value = decryptedText;
    }
  }, [decryptedText]);

  useEffect(() => {
    setDecryptedText('');
    if (inputValue.length > 0) {
      occDict();
    }
  }, [inputValue]);

  return (
    <main className='table-container flex flex-col gap-4 items-center justify-center max-w-[80vw] scroll-snap-x'>
      <div className='scroll-snap-align-start'>
        <h1 className='m-12 text-9x underline'>Vigenère Table</h1>
        <Table cols={26} rows={26} word={inputValue} key={keyValue} />
      </div>

      <div className="Input">

        <h1 className='mt-12 underline'>Encrypted Message</h1>
        <Input
          id="word"
          type="text"
          maxLength={100}
          setter={setInputValue}
          className='mb-24'
        />

        <div className="b-white b-4 p-4 bg-[#3e3d3da0] rounded-lg">

          <h1 className='text-blue-200 underline'>❝Key❞</h1>
          <div className="flex justify-center m-8 gap-12 ">

            <label className='flex items-center text-3xl font-bold'>
              <input
                type="radio"
                value="guess"
                checked={selectedOption === 'guess'}
                onChange={handleOptionChange}
                className='mr-4 h-12 w-12'
              />
              1 To 1 Mapping
            </label>

            <label className='flex items-center text-3xl font-bold'>
              <input
                type="radio"
                value="enter"
                checked={selectedOption === 'enter'}
                onChange={handleOptionChange}
                className='mr-4 h-12 w-12'
              />
              Enter Key
            </label>

          </div>
        </div>

        <hr className='m-12' />

        {!keyInputVisible ? (
          <div className="">

            <div className="Key__input flex justify-center items-center">
              <Input
                id="key"
                type="text"
                maxLength={100}
                className={"text-4xl"}
                setter={setKeyValue} />

              <button onClick={() => {
                const result = reverseVigenereCipher(inputValue, keyValue, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
                setDecryptedText(result);
              }} className="bg-blue-500 text-white w-32 text-2xl h-20 p-2 rounded-lg">Decode</button>

            </div>
          </div>

        ) : (
          <div className="letter__transformations b-4 b-white p-4 bg-[#110e0e7b] rounded-lg m-12 ">
            {Object.keys(map).length === 0 ? (
              <div className="text-3xl">Fill The Message First</div>
            ) : (
              loadKeys()
            )}
          </div>
        )}
        <h1>Result</h1>
        <Input
          id="result"
          type="readonlyText"
          maxLength={100}
          value={decryptedText}
        />
      </div>
      {Object.keys(map).length > 0 && (
        <div className="w-full max-w-4xl p-4 bg-[#3e3d3da0] rounded-lg mt-8">
          <LetterOccurrencesChart map={map} />
        </div>
      )}
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);