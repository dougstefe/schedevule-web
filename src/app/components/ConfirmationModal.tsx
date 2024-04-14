import { MouseEventHandler } from 'react'

interface Props {
    title: string
    ok: MouseEventHandler<HTMLButtonElement>
    nOk: MouseEventHandler<HTMLButtonElement>
    show: Boolean
    children: React.ReactNode
}

export default function ConfirmationModal(props: Props) {
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
                                {props.children}
                            </div>
                            <div className='w-full flex justify-evenly text-white'>
                                <button type="button" className="flex align-center bg-indigo-900 rounded-md px-4 py-2" onClick={props.ok}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-lime-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    Sim
                                </button>
                                <button type="button" className="flex align-center bg-indigo-900 rounded-md px-4 py-2" onClick={props.nOk}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-rose-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                    Não
                                </button>
                            </div>
                        </div>
                    </div>
                </dialog> :
                false

            }
        </>
    );
}