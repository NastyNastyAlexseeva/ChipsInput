import { useState } from 'react';
import cn from 'classnames';
import { ReactComponent as Close } from '../../static/img/svg/close.svg';

import './Chips.scss';

interface IChips {
    id: string,
    isEditable?: boolean,
    isClearable?: boolean,
    isSelected?: boolean,
    value: string,
    onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => any,
}

const Chips = ({isEditable = false, isClearable=false, value, id, isSelected, onClear}: IChips) => {
    const [chipsValue, setChipsValue] = useState(value);
    const selectedClass = cn(
        'chips',
        {"chips-selected": isSelected}
    );

    const clearHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setChipsValue('');
        
        if(onClear) {
            onClear(event, id);
        }
    }

    return (
        <div className={selectedClass}>
            <span
                id={id}
                className='chips__value'
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
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