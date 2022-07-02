import React from 'react';

type SuperButtonPropsType = {
    className: string
    title: string
    callBack: () => void
    disabled?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        className, disabled, callBack, title
    }) => {
    return (
        <button className={className} disabled={disabled} onClick={callBack}>{title}</button>
    )
}