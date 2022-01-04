import { useState, useLayoutEffect, useRef } from 'react';
import Chips from '../Chips';

import './ChipsInput.scss';

interface IChipsInput {
    id: string,
    name: string,
    value: string;
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLLabelElement>) => any,
}

const ChipsInput = ({id, name, value, placeholder, onChange}: IChipsInput) => {
    // const parseValueForLabel = () => {
    //     return '';
    // }

    // const parseValueForChips = (value) => {
    //     const arr = value.split(/,/);
    //     return arr;
    // }

    const [labelValue, setLabelValue] = useState(value);
    // const [allValue, setLabelValue] = useState(value);
    const [chipsValue, setChipsValue] = useState(['']);
    let chipsStaticArray: string[] = [];

    let allValue: string = value;

    useLayoutEffect(() => {
        createChips();
        setChipsValue(chipsStaticArray);
        console.log(allValue);
        // labelRef.current?.setSelectionRange
    },[value]);

    const createChips = () => {

        value.split(/,/).forEach(ships => {
            chipsStaticArray.push(ships)
        });

        // parseValueForLabel('');
        // setLabelValue('');

        if(value[value.length] !== ',') {
            chipsStaticArray.pop();
            // parseValueForLabel(value.replace(chipsStaticArray.join(","), ''));
            // setLabelValue(value.replace(chipsStaticArray.join(","), ''));
        }

        // parseValueForChips(chipsStaticArray);

        // setChipsValue(arrChips);
        // console.log(value, labelValue, chipsValue);

        // if(value[value.length] !== ',') {
        //     value.split(/,/).forEach(ships => arrChips.push(ships));
        // } else {
        //     arrChips = [...value.split(/,/)].slice(0, arrChips.length-1);
        // }
        
        // setChipsValue(arrChips);
        // const regExpChips: RegExp = /("[^"]*?),+([^"]*?")/;
        // // console.log(value.match(/,/))
        // // console.log(value.split(/,/).join())
        // // const chipsNewValue = value.match(regExpChips) as [] ?? "";
        // let chipsArr: string[] = [];
        // let labelValue: string = value;
        // // // console.log(newArr);

        // for(let i: number = 0; i <= labelValue.length; i++) {
        //     // if(value[i] !== RegExp.test(value[i])) chipsArr.push(value.slice(i))
        //     // value.substring(value[i])
        //     if(value[i] === ',') {
        //         chipsArr.push(value.slice(0, i));
        //         labelValue = labelValue.slice()
        //     }
        // }
        // let arrChips: string[] = value.split(regExpChips);
        // return arrChips;
    };

    const keyChipsGenerator = () => {
        return `key_${Math.random()*10}`;
    };

    const handlerLabel = (event: React.ChangeEvent<HTMLLabelElement>) => {
        // setLabelValue(event.target.innerText);
        // setLabelValue(event.target.innerText);
        event.target.focus();
        // event.target.innerText = event.target.innerText;
        // console.log(event.target.createTextRange())
        // event.target.setSelectionRange(pos, pos)
        // event.currentTarget.selectionStart

        if(onChange) {
            onChange(event)
        };
    };

    return (
        <div className='chipsInput'>
            <div className='chipsInput__chips'>
                {
                    chipsValue.map((chips: string) => {
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
                data-value={value}
                htmlFor={id}
                contentEditable={true}
                suppressContentEditableWarning={true}
                // ref={labelRef}
            >
                <input
                    type="text"
                    name={name}
                    id={id}
                    value={value}
                    readOnly
                    className='chipsInput__input'
                    placeholder={placeholder} />
            {labelValue}
            </label>
        </div>
    );
};

export default ChipsInput;