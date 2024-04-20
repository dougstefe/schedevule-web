'use client';
import "reflect-metadata"
import { container } from "tsyringe";
import { useParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import Layout from '@/app/components/Layout'
import { JobApplicationService } from '@/app/core/services/job-application-service'
import { JobApplication } from '@/app/core/models/job-application'
import Form from '@/app/components/Form'
import FormButtons from '@/app/components/FormButtons'
import ConfirmationModal from '@/app/components/ConfirmationModal'
import RedirectModal from '@/app/components/RedirectModal'
import Loading from '@/app/components/Loading'
import ButtonsToSave from '@/app/components/ButtonsToSave'

export default function JobApplications() {
  const jobApplicationService = container.resolve(JobApplicationService);
  
  const [jobApplicationState, setJobApplicationState] = useState(null as unknown as JobApplication)
  const [loadingState, setLoadingState] = useState({ show: true })
  const [redirectModalState, setRedirectModalState] = useState(
    {
      title: '',
      text: '',
      target: '',
      show: false
    }
  )

  const params = useParams()
  const jobId = String(params.id)



  useEffect(() => {
    if(!jobApplicationState){
      jobApplicationService.get(Number(params.id))
        .then(x => {
          setJobApplicationState(x)
          setLoadingState({ show: false })
        }
      )
    }
  }, [jobApplicationState, loadingState])


  async function save(jobApplication: JobApplication): Promise<string | boolean | undefined> {
    return await jobApplicationService.update(jobApplication)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setLoadingState({ show: true })
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
      var response = await jobApplicationService.update(jobApplication)


      if (!response) {
        throw new Error('Failed to submit the job application!!!')
      }

      setRedirectModalState({title: 'Sucesso', text: 'Registro atualizado com sucesso.', target: `/job-applications`, show: true})

    } catch (error) {
      console.error(error)
    } finally {
      setLoadingState({ show: false })
    }
  }

  function onChange(key: string, e: ChangeEvent<HTMLInputElement>) {
    setJobApplicationState(
      {
        ...jobApplicationState,
        [key]: e.target.value
      }
    )
  }

  const cancel = () => {
    location.reload();
    console.log('canceled!!!')
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
              <ButtonsToSave cancel={cancel} />
            </div>
          </div>
        </Form>
      </Layout>
      <RedirectModal title={redirectModalState.title} show={redirectModalState.show} text={redirectModalState.text} target={redirectModalState.target} />
      <Loading show={loadingState.show} />
    </>
  )
}