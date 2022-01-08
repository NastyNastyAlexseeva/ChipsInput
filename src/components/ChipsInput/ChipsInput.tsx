import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import cn from 'classnames';
import Chips from '../Chips';

import './ChipsInput.scss';
import classNames from 'classnames';

interface IChipsInput {
    id: string,
    name: string,
    value: string;
    placeholder?: string,
    onChange?: (string: string) => void,
}

interface IChips {
    id: string,
    value: string,
}

const ChipsInput = ({id, name, value, placeholder, onChange}: IChipsInput) => {

    const refChipsInput = useRef(null);

    const isValidQuotes = (validationString) => {
        let quotesCount = 0;

        for(let i=0; i <= value.length; i++) {
            if(validationString[i] === '"') {
                quotesCount++;
            }
        };

        return !(quotesCount % 2);
    };

    const idChipsGenerator = () => {
        return `id_${Math.random()*10}`;
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
        let arrChips: IChips[] = [];

        if(isValid) {

            if(isLastQuotes) {
                value.split(reg).forEach(chips => {
                    if(chips && chips !== ' ') {
                        arrChips.push({
                            id: idChipsGenerator(),
                            value: chips,
                        });
                    }
                });

            } else {
                value.split(reg).forEach((chips, index) => {
                    if(chips && chips !== ' ' && index !== arrValue.length-1) {
                        arrChips.push({
                            id: idChipsGenerator(),
                            value: chips,
                        });
                    }
                });
            }

        }

        setInputChips({
            chips: arrChips,
            value: lastValue ?? inputChips.value,
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
        let arrChips: object[] = [];

        if(isValid) {
            const validComma = reg.exec(inputChips.value)?.index;

            if(inputChips.value[validComma]) {
                inputChips.value.split(reg).forEach((chips, index) => {
                    if(chips && chips !== ' ' && index !== inputChips.value.split(reg).length-1) {
                        arrChips.push({
                            id: idChipsGenerator(),
                            value: chips,
                        });
                    }
                });

            }

            setInputChips({
                chips: [...inputChips.chips,...arrChips],
                value: inputChips.value,
                initLastValue: inputChips.initLastValue,
            });
        }
    }

    const newInnerText = (text) => {
        let replaceValidComma = text.replace(reg, "&#44;");
        return replaceValidComma.substring(replaceValidComma.lastIndexOf("&#44;")+5);
    };

    const chipsString = () => {
        let chipsString = [];

        inputChips.chips.forEach((chips: IChips) => {
            chipsString.push(chips.value);
        });

        return chipsString.join(', ') + ', ';
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

            onChange(chipsString() + text);
            const validComma = reg.exec(text)?.index;

            if(isValidQuotes(text) && text[validComma]) {
                event.target.innerText = newInnerText(text);
            }

            event.target.focus();
        };
    };

    const handlerClear = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        setInputChips({
            chips: inputChips.chips.filter(chips => chips.id !== id),
            value: inputChips.value,
            initLastValue: inputChips.initLastValue,
        });
    };

    const [isMouseDown, getMouseDown] = useState(false);
    const [selectedChips, getSelectedChips] = useState([]);

    const handlerDelete = (event: React.KeyboardEvent<HTMLLabelElement>) => {
        if(inputChips.chips && !inputChips.value && (event.key === 'Backspace' || event.key === 'Delete')) {
            let newChipsArr = inputChips.chips;

            if(selectedChips.length) {
                newChipsArr = newChipsArr.filter(chips => !selectedChips.includes(chips.id));
            } else {
                newChipsArr.pop();
            }

            setInputChips({
                chips: newChipsArr,
                value: inputChips.value,
                initLastValue: inputChips.initLastValue,
            });
        }
    }

    const handlerSelect = (event: any) => {
        refChipsInput.current?.focus();

        if(isMouseDown) {
            const currentNode = document.elementFromPoint(event.clientX, event.clientY);

            inputChips.chips.forEach(chips => {
                if(chips.id === currentNode.id && !selectedChips.includes(chips.id)) {
                    getSelectedChips([...selectedChips, chips.id]);
                }
            });
        } else {
            getSelectedChips([]);
        }
    };

    return (
        <div className='chipsInput'>
            <div
                onMouseDown={() => getMouseDown(true)}
                onMouseUp={() => getMouseDown(false)}
                onMouseOver={handlerSelect}
                className='chipsInput__chips'>
                {
                    inputChips.chips.map((chips: IChips) => {
                        return (
                            chips &&
                            <Chips
                                id={chips.id}
                                key={chips.id}
                                // isEditable
                                isSelected={selectedChips.includes(chips.id)}
                                isClearable
                                value={chips.value}
                                onClear={handlerClear}
                            />
                        )
                    })

                }
            </div>
            <label
                className='chipsInput__input-label'
                onInput={handlerLabel}
                onKeyDown={handlerDelete}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                htmlFor={id}
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={refChipsInput}
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