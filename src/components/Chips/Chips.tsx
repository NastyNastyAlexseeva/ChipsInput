import {ReactComponent as Close} from '../../static/img/svg/close.svg';

import './Chips.scss';

const Chips = () => {
    return (
        <div className='chips'>
            <span className='chips__value'>Это первый чипс!</span>
            <span className='chips__close'>
                <Close />
            </span>
        </div>
    )
}

export default Chips;