interface Props {
    children: any
}

export default function Title(props: Props) {
    return (
        <h1  className="text-base font-semibold leading-7">
            {props.children}
        </h1>
    )
}