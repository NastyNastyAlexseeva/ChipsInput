import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import Chips from '../Chips';

import './ChipsInput.scss';

interface IChipsInput {
    id: string, // id input
    name: string, // name input
    value: string; // all value
    isEditableChips?: boolean, // editable field
    isClearableChips?: boolean, // clear value and icon close
    placeholder?: string,
    onChange?: (string: string) => void, // change handler
}

interface IChips {
    id: string,
    value: string,
}

const ChipsInput = ({
    id,
    name,
    value,
    placeholder,
    isEditableChips = false,
    isClearableChips = false,
    onChange}: IChipsInput) => {

    const refLabel = useRef<HTMLLabelElement | null>(null);
    const [placeHolder, setPlaceHolder] = useState(placeholder);

    // функция для подсчета двойных кавычек и валидации
    const isValidQuotes = (validationString) => {
        let quotesCount = 0;

        for(let i=0; i <= value.length; i++) {
            if(validationString[i] === '"') {
                quotesCount++;
            }
        };

        return !(quotesCount % 2);
    };

    // функция для генерации id, вариант с current++ показался глупым
    const idChipsGenerator = () => {
        return `id_${Math.random()*10}`;
    };

    const [isValid, setValid] = useState(isValidQuotes(value)); // для валидации при инициализации и вводимых значений

    const reg: RegExp = /,(?=(?:[^"]*"[^"]*")*[^"]*$)/gm; // регулярка ищет запятые вне двойных кавычек
    const isLastQuotes: Boolean = value[value.length-1] === ','; // ищем, является ли последний символ - запятой, необходима для инициализации
    const arrValue: string[] = value.split(reg); // делаем из value массив, необходимо для инициализации
    const lastValue: string = isValid ? arrValue[arrValue.length -1] : value; // ищем последнее значение, необходимо для инициализации

    const [inputChips, setInputChips] = useState({
        chips: [],
        value: '',
        initLastValue: '',
    });

    const [isEdit, setEdit] = useState(false); // чтобы разделить useEffect на тот, который инициализирует, и тот, который работает с вводимым значением


    // функция для первой отрисовки инпут чипса
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

        };

        setInputChips({
            chips: arrChips,
            value: lastValue ?? inputChips.value,
            initLastValue: lastValue,
        });

        if(lastValue) {
            setPlaceHolder('');
        }
    }

    // только для инициализации
    useLayoutEffect(() => {
        initChips();
        setEdit(true);
    },[]);

    // только для работы с изменяемым полем
    useLayoutEffect(() => {
        if(isEdit) {
            editInput();
        }
    },[value]);

    // функция для работы с изменяемым полем
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

    // вынесла обрезку innerText из change
    const newInnerText = (text) => {
        let replaceValidComma = text.replace(reg, "&#44;");
        return replaceValidComma.substring(replaceValidComma.lastIndexOf("&#44;")+5);
    };

    // вынесла преобразование чипсов в текст из change
    const chipsString = () => {
        let chipsString = [];

        inputChips.chips.forEach((chips: IChips) => {
            chipsString.push(chips.value);
        });

        return chipsString.join(', ') + ', ';
    };

    // функция для работы с вводом в поле label
    const handlerLabelInput = (event: React.ChangeEvent<HTMLLabelElement>) => {
        const text = event.target.innerText;
        setInputChips({
            chips: inputChips.chips,
            value: text,
            initLastValue: inputChips.initLastValue,
        });
        setPlaceHolder('');

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

    // функция для удаления чипса по крестику
    const handlerClear = (id: string) => {
        setInputChips({
            chips: inputChips.chips.filter(chips => chips.id !== id),
            value: inputChips.value,
            initLastValue: inputChips.initLastValue,
        });
    };
    
    const [isMouseDown, getMouseDown] = useState(false); // отслеживаем, нажата ли кнопка мыши
    const [selectedChips, getSelectedChips] = useState([]); // массив выделенных чипсов

    // функция для выделения чипсов
    const handlerSelect = (event: any) => {
        if(isMouseDown) {
            refLabel.current?.focus();
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

    // функция для удаления чипсов по кнопке Backspace или Delete
    const handlerDelete = (event: React.KeyboardEvent<HTMLLabelElement>) => {
        if(inputChips.chips && !refLabel.current?.innerText && (event.key === 'Backspace' || event.key === 'Delete')) {
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
    };

    // отслеживаем изменения в чипсах
    const handlerEditChips = (id: string, value: string) => {
        let newChipsArr: IChips[] = inputChips.chips;

        setValid(isValidQuotes(value));

        if(isValid) {
            inputChips.chips.forEach((chips, index) => {
                if(chips.id === id) {
                    let addChips: any[]= [];

                    if(value.split(reg).length >= 2) {
                        value.split(reg).forEach(newValueChips => {
                            addChips.push({
                                id: idChipsGenerator(),
                                value: newValueChips,
                            })
                        });
                    } else {
                        addChips.push({id, value});
                    }

                    newChipsArr = [...inputChips.chips.slice(0,index), ...addChips, ...inputChips.chips.slice(index+1)];
                }
            });
        }

        setInputChips({
            chips: newChipsArr,
            value: inputChips.value,
            initLastValue: inputChips.initLastValue,
        });
    };

    // чипс был реализован с помощью скрытого input, который должен содержать
    // общее значение вводимого значения и чипсов. Это необходимо для соотвествия верстки приложенным скринам

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
                            chips.value &&
                            <Chips
                                id={chips.id}
                                key={chips.id}
                                isEditable={isEditableChips}
                                isSelected={selectedChips.includes(chips.id)}
                                isClearable={isClearableChips}
                                value={chips.value}
                                onClear={handlerClear}
                                onChange={handlerEditChips}
                            />
                        )
                    })

                }
            </div>
            <label
                className='chipsInput__input-label'
                onInput={handlerLabelInput}
                onKeyDown={handlerDelete}
                onClick={() => setPlaceHolder('')}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder={placeholder}
                htmlFor={id}
                contentEditable={true}
                suppressContentEditableWarning={true} // protected content editable
                ref={refLabel}
            >
            {placeHolder && <span className='chipsInput__placeholder'>{placeHolder}</span>}
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
            {!isValid && <span className='chipsInput__error'>Закройте кавычки</span>}
        </div>
    );
};

export default ChipsInput;