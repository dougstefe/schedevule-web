'use client';
import "reflect-metadata"
import { container } from 'tsyringe'
import { useState } from 'react'

import Layout from '@/app/components/Layout'
import { JobApplication } from '@/app/core/models/job-application'
import { JobApplicationService } from '@/app/core/services/job-application-service'
import Loading from '../components/Loading'


const jobApplicationService = container.resolve(JobApplicationService)

export default function Home() {

  const [loadingState, setLoadingState] = useState({ show: true })
  const [jobApplicationsState, setJobApplicationsState] = useState([] as JobApplication[])
  
  if (!jobApplicationsState.length) {
      jobApplicationService.list(0, 10).then((data) => {
        console.log(data)
        setJobApplicationsState(data)
        setLoadingState({ show: false })
      })
  }

  function renderTableBody() {

    if (!jobApplicationsState?.length) {
      return <tr>
          <td colSpan={4}>
            Não há candidatura
          </td>
        </tr>
    } else {
      return jobApplicationsState?.map((jobApplication, i) => (
        <tr key={jobApplication.id}>
          <td>
            {jobApplication.company}
          </td>
          <td>
            {jobApplication.candidateAt.toString().slice(0, 10).split('-').reverse().join('/')}
          </td>
          <td>
            {jobApplication.channel}
          </td>
          <td className="flex justify-evenly">
            <a href={`/job-applications/details/${jobApplication.id}`}>Ver</a>
            <a href={`/job-applications/edit/${jobApplication.id}`}>Editar</a>
          </td>
        </tr>
      ))
    }
    
  }
  return (
    <>
      <Layout title="Candidaturas" toGoBack="/">
        <div className='flex justify-end'>
          <a href='/job-applications/new' className='flex align-center px-4 py-2 bg-indigo-900 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Novo
          </a>
        </div>
        <table className='table-auto w-full bg-slate-300 text-indigo-900 rounded-md border-separate border-spacing-6 text-center'>
          <thead>
            <tr>
              <th className=''>
                Empresa
              </th>
              <th className=''>
                Candidatado em
              </th>
              <th className=''>
                Canal
              </th>
              <th className=''>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              renderTableBody()
            }
          </tbody>
        </table>
      </Layout>
      <Loading show={loadingState.show} />
    </>
  );
}
