interface Props {
    cancel: any
}

export default function ButtonsToSave(props: Props) {
    return (
        <div className="sm:col-span-6 flex justify-center salvar">
            <button type="submit" className="flex align-center bg-indigo-900 rounded-md px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Salvar
            </button>
            <button type="button" className="flex align-center bg-indigo-900 rounded-md px-4 py-2 ml-10" onClick={props.cancel}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                Cancelar
            </button>
        </div>
    )
}