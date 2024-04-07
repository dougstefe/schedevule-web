import Link from './Link'
import Title from './Title'

interface Props {
    title: string
    toGoBack?: string
    children: any
}

export default function Layout(props: Props) {
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-indigo-500 to-indigo-900">
            <Title>{props.title}</Title>
            <div className="w-full space-y-12 mt-24">
                {
                    props.toGoBack ? <div>
                        <Link target={props.toGoBack} text='Voltar' />
                    </div> : false
                }
                { props.children }
            </div>
        </main>
    )
}