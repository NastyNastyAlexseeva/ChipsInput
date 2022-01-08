import { useState } from 'react';
import cn from 'classnames';
import { ReactComponent as Close } from '../../static/img/svg/close.svg';

import './Chips.scss';

interface IChips {
    id: string, // id chips
    isEditable?: boolean, // editable field
    isClearable?: boolean, // clear value and icon close
    isSelected?: boolean, // selected chips
    value: string, // value chips
    onClear?: (id: string) => any, // handler clear chips
    onChange?: (id: string, value: string) => void, // handler input chips
};

const Chips = ({
    isEditable = false,
    isClearable=false,
    isSelected,
    value,
    id,
    onClear,
    onChange}: IChips) => {

    const [chipsValue, setChipsValue] = useState(value);
    const selectedClass = cn(
        'chips',
        {"chips-selected": isSelected}
    );

    // функция для очистки value 
    const clearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setChipsValue('');
        
        if(onClear) {
            onClear(id);
        }
    }

    // функция для передачи input и id при редактировании чипса

    const handlerInput = (event: React.ChangeEvent<HTMLSpanElement>) => {
        if(onChange) {
            onChange(id, event.target.innerText);
        }
    }

    // чипс сделан с помощью span с атрибутом contentEditable,
    // т.к по существу чипсы не являются input, а так же невозможно
    // сделать требуемую гибкую верстку

    return (
        <div className={selectedClass}>
            <span
                id={id}
                className='chips__value'
                contentEditable={isEditable}
                suppressContentEditableWarning={true} // protected content editable
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                onInput={handlerInput}
            >
                {chipsValue}
            </span>
            {isClearable &&
                <button onClick={clearHandler} className='chips__close'>
                    <Close />
                </button>
            }
        </div>
    )
}

export default Chips;