import { MouseEventHandler } from 'react'
import Link from './Link'

interface Props {
    title: string
    show: Boolean
    target: string
    text: string
}

export default function RedirectModal(props: Props) {
    return (
        <>
            {
                props.show ?
                <dialog
                    className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
                    <div className="bg-white m-auto p-8 rounded-md">
                        <div className="flex flex-col items-center">
                            <h3 className='mb-8 text-xl font-semibold'>{props.title}</h3>
                            <div className='mb-8'>
                                {props.text}
                            </div>
                            <div className='text-white'>
                                <Link target={props.target} text="Ok" />
                            </div>
                        </div>
                    </div>
                </dialog> :
                false
            }
        </>
    );
}