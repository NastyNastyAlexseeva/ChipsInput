import './Form.scss';
import React from 'react';

interface FormInterface {
    action?: string,
    method?: "get" | "post",
}

interface PropTypes extends FormInterface {
    children?: React.ReactNode |  React.ReactNode[],
}

const Form: React.FC = ({action, method, children}: PropTypes) => {
    return (
        <form action={action} method={method}>
            {children}
        </form>
    )
}

export default Form;