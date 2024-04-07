interface Props {
    target: string
    text: string
    size?: 'small' | 'medium' | 'large'
}

export default function Link(props: Props) {
    const classNameSize = props.size === 'large' ? 'px-16 py-10' : props.size === 'medium' ? 'px-10 py-6' : 'px-4 py-2'
    return (
        <a href={props.target} className={`${classNameSize} bg-indigo-900 rounded-md`}>
          {props.text}
        </a>
    )
}