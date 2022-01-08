import React from 'react';

interface IForm {
    action?: string,
    method?: "get" | "post",
}

interface PropTypes extends IForm {
    children?: React.ReactNode |  React.ReactNode[],
}

const Form: React.FC = ({action, method, children}: PropTypes) => {
    return (
        <form className='form' action={action} method={method}>
            {children}
        </form>
    )
}

export default Form;