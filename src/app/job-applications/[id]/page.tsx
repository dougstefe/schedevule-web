'use client';
import "reflect-metadata"
import { container } from "tsyringe";
import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

import Layout from '@/app/components/Layout'
import { JobApplicationService } from '@/app/core/services/job-application-service'
import { JobApplication } from '@/app/core/models/job-application'
import Form from '@/app/components/Form'
import FormButtons from '@/app/components/FormButtons'
import ConfirmationModal from '@/app/components/ConfirmationModal'
import RedirectModal from '@/app/components/RedirectModal'
import Loading from '@/app/components/Loading'

export default function JobApplications() {
  const jobApplicationService = container.resolve(JobApplicationService);
  
  // const router = useRouter();
  const params = useParams()
  const isNew = params.id === 'new'
  const jobId = !isNew ? String(params.id) : undefined

  const [loadingState, setLoadingState] = useState({ show: false })
  const [showDialogToRemoveState, setShowDialogToRemoveState] = useState(false)
  const [redirectModalState, setRedirectModalState] = useState(
    {
      title: '',
      text: '',
      target: '',
      show: false
    }
  )
  const [changed, setChangedState] = useState(false)
  const [jobApplicationState, setJobApplicationState] = useState(null as unknown as JobApplication)

  if (!isNew){
    if(!jobApplicationState) {
      if (!loadingState.show) {
        setLoadingState({ show: true })
      }
      jobApplicationService.get(Number(params.id))
        .then(x => {
          setJobApplicationState(x)
          setLoadingState({ show: false })
        })
    }
  }


  async function save(jobApplication: JobApplication): Promise<string | boolean | undefined> {
    if (isNew) {
      return await jobApplicationService.add(jobApplication)
    }
    else {
      return await jobApplicationService.update(jobApplication)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const formData = new FormData(event.currentTarget)
      const jobApplication = new JobApplication(
        String(formData.get('company')),
        new Date(String(formData.get('candidateAt'))),
        String(formData.get('channel')),
        String(formData.get('linkToTrackProgress')),
        jobId 
      )
      
      setShowDialogToRemoveState(false)
      setLoadingState({ show: true })
      var response = await save(jobApplication)
      setLoadingState({ show: false })

      if (!response) {
        throw new Error('Failed to submit the job application!!!')
      }
      if (isNew) {
        setRedirectModalState({title: 'Sucesso', text: 'Registro adicionado com sucesso.', target: `/job-applications/${response}`, show: true})
      }
      else {
        setRedirectModalState({title: 'Sucesso', text: 'Registro atualizado com sucesso.', target: `/job-applications`, show: true})
      }
      //location.reload();
    } catch (error) {
      console.error(error)
    } finally {
      // setIsLoading(false)
    }
  }

  function onChange(key: string, e: ChangeEvent<HTMLInputElement>) {
    setJobApplicationState(
      {
        ...jobApplicationState,
        [key]: e.target.value
      }
    )
    setChangedState(true)
  }

  const cancel = () => {
    location.reload();
    console.log('canceled!!!')
  }

  const confirmToRemove = async () => {
    setShowDialogToRemoveState(false)
    setLoadingState({ show: true })
    await jobApplicationService.remove(String(jobId))
    setLoadingState({ show: false })
    setRedirectModalState({title: 'Excluído', text: 'Registro excluído com sucesso', target: '/job-applications', show: true})
    console.log('confirmed!!!')
  }

  const cancelRemove = () => {
    setShowDialogToRemoveState(false)
    console.log('confirmed!!!')
  }

  return (
    <>
      <Layout title="Detalhes da candidatura" toGoBack='/job-applications'>
        <Form submit={handleSubmit}>
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="company" className="block text-sm font-medium leading-6">Nome da empresa:</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input onChange={(e) => { onChange('company', e) }} value={jobApplicationState?.company} type="text" name="company" id="company" autoComplete="company" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="candidateAt" className="block text-sm font-medium leading-6">Data da candidatura:</label>
                <div className="mt-2">
                  <div className="flex w-32 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input onChange={(e) => { onChange('candidateAt', e) }} value={jobApplicationState?.candidateAt ? jobApplicationState.candidateAt.toString().slice(0,10) : ''} type="date" name="candidateAt" id="candidateAt" autoComplete="candidateAt" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="channel" className="block text-sm font-medium leading-6">Plataforma da candidatura:</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input onChange={(e) => { onChange('channel', e) }} value={jobApplicationState?.channel} type="text" name="channel" id="channel" autoComplete="channel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="linkToTrackProgress" className="block text-sm font-medium leading-6">Link para acompanhamento:</label>
                <div className="mt-2">
                  <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input onChange={(e) => { onChange('linkToTrackProgress', e) }} value={jobApplicationState?.linkToTrackProgress} type="text" name="linkToTrackProgress" id="linkToTrackProgress" autoComplete="linkToTrackProgress" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>
              <FormButtons showSaveButtons={isNew || changed} cancel={cancel} remove={() => setShowDialogToRemoveState(true)} />
            </div>
          </div>
        </Form>
      </Layout>
      <ConfirmationModal title="Atenção" show={showDialogToRemoveState} ok={confirmToRemove} nOk={cancelRemove}>
        Deseja realmente excluir o registro?
      </ConfirmationModal>
      <RedirectModal title={redirectModalState.title} show={redirectModalState.show} text={redirectModalState.text} target={redirectModalState.target} />
      <Loading show={loadingState.show} />
    </>
  )
}