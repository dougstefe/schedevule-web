import Layout from '../components/Layout'
import { JobApplication } from '../core/models/job-application'

export default function Home() {
  const jobApplications: JobApplication[] = [
    new JobApplication('Itau', new Date(), 'linkedin', 'https://google.com.br', '123')
  ];

  function renderTableBody() {
    if (!jobApplications.length) {
      <tr>
        <td colSpan={4}>
          Não há candidatura
        </td>
      </tr>
    }
    return jobApplications.map((jobApplication, i) => (
      <tr>
        <td>
          {jobApplication.company}
        </td>
        <td>
          {jobApplication.candidateAt.toISOString().slice(0, 10).split('-').reverse().join('/')}
        </td>
        <td>
          {jobApplication.channel}
        </td>
        <td className="flex justify-evenly">
          <a href={`/job-applications/${jobApplication.id}`}>Ver</a>
          <button>Excluir</button>
        </td>
      </tr>
    ))
  }
  return (
    <Layout title="Candidaturas" toGoBack="/">
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
  );
}
