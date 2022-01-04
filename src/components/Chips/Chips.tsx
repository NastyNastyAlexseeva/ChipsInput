import { ReactComponent as Close } from '../../static/img/svg/close.svg';

import './Chips.scss';

interface IChips {
    isEditable: boolean,
    value: string,
}

const Chips = ({isEditable = false, value}: IChips) => {
    return (
        <div className='chips'>
            <span
                className='chips__value'
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
            >
                    {value}
            </span>
            <span className='chips__close'>
                <Close />
            </span>
        </div>
    )
}

export default Chips;