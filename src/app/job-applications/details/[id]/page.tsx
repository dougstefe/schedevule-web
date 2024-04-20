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
import ButtonToRemove from '@/app/components/ButtonToRemove'

export default function JobApplications() {
  const jobApplicationService = container.resolve(JobApplicationService);
  
  const [jobApplicationState, setJobApplicationState] = useState(null as unknown as JobApplication)
  const [loadingState, setLoadingState] = useState({ show: true })
  const [showDialogToRemoveState, setShowDialogToRemoveState] = useState(false)
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
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="company" className="block text-sm font-medium leading-6">Nome da empresa:</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {jobApplicationState?.company}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="candidateAt" className="block text-sm font-medium leading-6">Data da candidatura:</label>
                <div className="mt-2">
                  <div className="flex w-32 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {jobApplicationState?.candidateAt ? jobApplicationState.candidateAt.toString().slice(0,10) : ''}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="channel" className="block text-sm font-medium leading-6">Plataforma da candidatura:</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    {jobApplicationState?.channel}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-6">
                <label htmlFor="linkToTrackProgress" className="block text-sm font-medium leading-6">Link para acompanhamento:</label>
                <div className="mt-2">
                  <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    {jobApplicationState?.linkToTrackProgress}
                  </div>
                </div>
              </div>
              <ButtonToRemove remove={() => setShowDialogToRemoveState(true)} />
            </div>
          </div>
      </Layout>
      <ConfirmationModal title="Atenção" show={showDialogToRemoveState} ok={confirmToRemove} nOk={cancelRemove}>
        Deseja realmente excluir o registro?
      </ConfirmationModal>
      <RedirectModal title={redirectModalState.title} show={redirectModalState.show} text={redirectModalState.text} target={redirectModalState.target} />
      <Loading show={loadingState.show} />
    </>
  )
}