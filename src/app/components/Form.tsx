import { FormEventHandler } from 'react'

interface Props {
    submit: FormEventHandler<HTMLFormElement>,
    children: React.ReactNode
}

export default function Form(props: Props) {
    return (
        <form onSubmit={props.submit}>
            {props.children}
        </form>
    )
}