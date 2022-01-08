import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Chips from '../Chips';

import './ChipsInput.scss';

interface IChipsInput {
    id: string,
    name: string,
    value: string;
    placeholder?: string,
    onChange?: (string: string) => void,
}

const ChipsInput = ({id, name, value, placeholder, onChange}: IChipsInput) => {

    const isValidQuotes = (validationString) => {
        let quotesCount = 0;

        for(let i=0; i <= value.length; i++) {
            if(validationString[i] === '"') {
                quotesCount++;
            }
        };

        return !(quotesCount % 2);
    };

    const [isValid, setValid] = useState(isValidQuotes(value));

    const reg: RegExp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/gm;
    const isLastQuotes: Boolean = value[value.length-1] === ',';
    const arrValue: string[] = value.split(reg);
    const lastValue: string = isValid ? arrValue[arrValue.length -1] : value;

    const [inputChips, setInputChips] = useState({
        chips: [],
        value: '',
        initLastValue: '',
    });
    const [isEdit, setEdit] = useState(false);

    const initChips = () => {
        let newArrChips: string[] = [];

        if(isValid) {

            if(isLastQuotes) {
                value.split(reg).forEach(chips => {
                    if(chips && chips !== ' ') {
                        newArrChips.push(chips);
                    }
                });

            } else {
                value.split(reg).forEach((chips, index) => {
                    if(chips && chips !== ' ' && index !== arrValue.length-1) {
                        newArrChips.push(chips);
                    }
                });
            }

        }

        setInputChips({
            chips: newArrChips,
            value: value,
            initLastValue: lastValue,
        });
    }

    useLayoutEffect(() => {
        initChips();
        setEdit(true);
    },[]);

    useLayoutEffect(() => {
        if(isEdit) {
            editInput();
        }
    },[value]);

    const editInput = () => {
        let newArrChips: string[] = [];

        if(isValid) {
            const validComma = reg.exec(inputChips.value)?.index;

            if(inputChips.value[validComma]) {
                inputChips.value.split(reg).forEach((chips, index) => {
                    if(chips && chips !== ' ' && index !== inputChips.value.split(reg).length-1) {
                        newArrChips.push(chips);
                    }
                });

            }

            setInputChips({
                chips: [...inputChips.chips,...newArrChips],
                value: inputChips.value,
                initLastValue: inputChips.initLastValue,
            });
        }
    }

    const keyChipsGenerator = () => {
        return `key_${Math.random()*10}`;
    };

    const handlerLabel = (event: React.ChangeEvent<HTMLLabelElement>) => {
        const text = event.target.innerText;
        setInputChips({
            chips: inputChips.chips,
            value: text,
            initLastValue: inputChips.initLastValue,
        });
        setValid(isValidQuotes(text));

        if(onChange) {
            let chipsString: string = inputChips.chips.join(',') + ', ';

            onChange(chipsString + text);
            const validComma = reg.exec(text)?.index;

            if(isValidQuotes(text) && text[validComma]) {
                let replaceValidComma = text.replace(reg, "&#44;");
                event.target.innerText = replaceValidComma.substring(replaceValidComma.lastIndexOf("&#44;")+5);
            }

            event.target.focus();
        };
    };

    return (
        <div className='chipsInput'>
            <div className='chipsInput__chips'>
                {
                    inputChips.chips.map((chips: string) => {
                        return (
                            chips &&
                            <Chips
                                key={keyChipsGenerator()}
                                isEditable
                                value={chips}/>
                        )
                    })

                }
            </div>
            <label
                className='chipsInput__input-label'
                onInput={handlerLabel}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                htmlFor={id}
                contentEditable={true}
                suppressContentEditableWarning={true}
            >
            {inputChips.initLastValue}
            </label>
            <input
                type="text"
                name={name}
                id={id}
                value={value}
                readOnly
                className='chipsInput__input'
                placeholder={placeholder} />
            {!isValid && <span style={{color: "red"}}>Закройте кавычки</span>}
        </div>
    );
};

export default ChipsInput;