import { useState, useLayoutEffect, useRef } from 'react';
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
    const inputRef = useRef<HTMLLabelElement | null>();
    const reg: RegExp = /,(?=([^"]*"[^"]*")*(?![^"]*"))/gm;
    const [inputChips, setInputChips] = useState({
        chips: [],
        value: '',
        initLastValue: value[value.length-1] !== ',' && value.split(',')[value.split(',').length-1],
    });

    useLayoutEffect(() => {
        // console.log(labelValue, splitValue);
        // splitLabelValue();
        // createChips();
        // setChipsValue(chipsStaticArray);
        // labelRef.current?.setSelectionRange
        createChips2();
    },[value]);

    const createChips2 = () => {
        // const valueArr: string[] = value.split(',');
        let newArrChips: string[] = [];
        let lastValue: string = '';

        // value.split(',').forEach(chips => {
        //     if(chips) {
        //         newArrChips.push(chips);
        //     }
        // });

        // setInitValue('');

        if(value[value.length-1] === ',') {
            // newArrChips.pop();
            // setInitValue(lastChips);
            // setInputChips({
            //     chips: a,
            //     value: inputChips.value,
            // });
            // console.log('1');
            // setInitValue(inputChips.value);
            // value.split(',').forEach(chips => {
            //     if(chips) {
            //         newArrChips.push(chips);
            //     }
            // });
            // setInitValue('');
            lastValue = '';
            value.split(',').forEach(chips => {
                if(chips) {
                    newArrChips.push(chips);
                }
            });

        } else {
            value.split(',').forEach((chips, index) => {
                if(chips && index !== value.split(',').length-1) {
                    newArrChips.push(chips);
                }

                if(index === value.split(',').length-1) {
                    lastValue = chips;
                }
            });

        }

        if(inputChips.value.includes(',')) {
            newArrChips.push(inputChips.value.substring(0, inputChips.value.length-1));
            lastValue = inputChips.value.substring(inputChips.value.indexOf(',')+1);

            // console.log(inputChips.value.substring(inputChips.value.indexOf(',')+1))
            // console.log(inputChips.value.substring(inputChips.value.indexOf(',')+1));
        }

        setInputChips({
            chips: newArrChips,
            value: lastValue,
            initLastValue: inputChips.initLastValue,
        });

        // console.log(inputChips);

        // console.log("AllValue",value);
        // if(inputChips.value.includes(',')) {
        //     console.log(inputChips.value.includes(','))
        //     //     setSplitValue(event.target.innerText.substring(0,event.target.innerText.indexOf(',')+1));
        //     //     // console.log(splitValue);
        //     // const a = event.target.innerText.substring(event.target.innerText.indexOf(',')+1);
        //     // event.target.innerText = a;

            
        //     setInputChips({
        //         chips: [],
        //         value: inputChips.value.substring(0, inputChips.value.indexOf(',')+1),
        //     })
        // }
        // let currentValue: string = value;

        // for(let i = 0; i <= currentValue.length; i++) {
        //     if(currentValue[i] === ',') {
        //         chipsArr.push(currentValue.substring(0, i+1));
        //         currentValue = currentValue.substring(i+1, currentValue.length);
        //     }
        // }
        // const lastValue: string = value.split(/,/);
        // const currentValue: string = value.split(/,/).pop();


        // value.split(',').forEach(chips => {
        //     if(chips) {
        //         chipsArr.push(chips);
        //     }

            
        //     if(!chipsValue.includes(chips) && chips !== inputChips.value) {
        //         chipsArr.push(chips);
        //     }
        // });
    }

    // const splitLabelValue = () => {
    //     // if(splitValue[splitValue.length] === ',') {
    //         setLabelValue('');
    //     // }
    // }

    const createChips = () => {
        // const stringChips = value.replace(/,(?=(([^']*'){2})*[^']*$)(?=(([^\"]*\"){2})*[^\"]*$)(?![^()]*\\)/gm, '&#44;');
        // value.split(',').forEach(chips => {
        //     // if(!chipsStaticArray.includes(chips)) {
        //         chipsStaticArray.push(chips);
        //     // }
        // });


        // let chipsString: string = value.replace(splitValue, '');

        // if(chipsString[chipsString.length-1] !== ',') {
        //     chipsString.replace(splitValue, '');
        // }

        // console.log(chipsString);

        // value.split(',').forEach(chips => {
        //     if(chips) {
        //         chipsArr.push(chips);
        //     }
        // });

        // if(labelValue[labelValue.length] !== ',') {
        //     // setSplitValue(value.replace(chipsStaticArray.join(","), ''));
        //     chipsArr.pop();
        // }

            // if(splitValue[splitValue.length-1] === ',') {
            //     if(chips) {
            //         chipsArr.push(splitValue);
            //     }
            // }

            // if(value[value.length - 1] === ',') {
            //     if(chips) {
            //         chipsArr.push(chips);
            //     }
            // }

            // if(!chipsValue.includes(chips) && chips !== splitValue) {
            //     // chipsStaticArray.push(chips);
            //     // setChipsValue();
            //     chipsArr.push(chips);
            // }

        // if(splitValue.includes(',')) {
        //     chipsArr.push(splitValue.replace(',', ''));
        // }

        // setChipsValue(chipsArr);
        // console.log(splitValue);


        // parseValueForLabel('');
        // setLabelValue('');

        // if(value[value.length] !== ',') {
        //     chipsStaticArray.pop();
        //     // parseValueForLabel(value.replace(chipsStaticArray.join(","), ''));
        //     // setLabelValue(value.replace(chipsStaticArray.join(","), ''));
        // }

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
        // setLabelValue(value);
        // event.target.innerText = splitValue;


        // console.log(inputChips.value)

        // event.target.innerText = value;

        // if(event.target.innerText.includes(',')) {
        //     // setSplitValue(event.target.innerText.substring(0,event.target.innerText.indexOf(',')+1));
        //     // console.log(splitValue);
        //     const a = event.target.innerText.substring(event.target.innerText.indexOf(',')+1);
        //     event.target.innerText = a;

        // } else {
        //     // setSplitValue(event.target.innerText);
        // }



        // if(event.target.innerText[event.target.innerText.length-1] !== ',') {

        // }

        // setSplitValue(event.target.innerText);

        // console.log(splitValue);
        // setLabelValue(event.target.innerText);
        // event.target.innerText = event.target.innerText;
        // console.log(event.target.createTextRange())
        // event.target.setSelectionRange(pos, pos)
        // event.currentTarget.selectionStart
        // const a = value+event.target.innerText;
        // const currentValue = () => {
        //     if(event.target.innerText)
        // }

        // console.log(event.target.innerText, value);

        // event.target.innerText = value;

        // event.target.selectionStart = event.target.selectionEnd = event.target.innerText.length;


        if(onChange) {
            let chipsString: string = inputChips.chips.join(',') + ', ';

            onChange(chipsString + event.target.innerText);

            if(event.target.innerText.includes(',')) {
                const substring = event.target.innerText.substring(event.target.innerText.indexOf(',')+1);
                event.target.innerText = substring;
            }
    
            setInputChips({
                chips: inputChips.chips,
                value: event.target.innerText,
                initLastValue: inputChips.initLastValue,
            });

            event.target.focus();
    
            // console.log("Event target", event.target.innerText, '\n', "chipsValue", inputChips.value, '\n', "last value", inputChips.initLastValue);

        };

        // event.target.innerText = event.target.innerText
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
                ref={inputRef}
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
        </div>
    );
};

export default ChipsInput;