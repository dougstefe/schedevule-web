interface Props {
    show: boolean
}

export default function Loading(props: Props) {
    return <>
        {
            props.show ?
            <div className='fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center'>
                <div className='loader'></div>
            </div> :
            false
        }
    </>
}


