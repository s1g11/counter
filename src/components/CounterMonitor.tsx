import React from 'react';

type CounterPropsType = {
    className: string
    message: string
}

export const CounterMonitor: React.FC<CounterPropsType> = (
    {
        className, message
    }) => {
    return (
        <span className={className}>
            {message}
        </span>
    )
}