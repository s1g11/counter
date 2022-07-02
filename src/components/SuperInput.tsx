import React from 'react';

type SuperInputPropsType = {
    callBack: (value: string) => void
    className: string
    type: string
    value: number
}

export const SuperInput: React.FC<SuperInputPropsType> = (
    {
        className, callBack, type, value
    }) => {

    return (
        <input value={value} className={className} onChange={e => callBack(e.currentTarget.value)} type={type}/>
    )
}