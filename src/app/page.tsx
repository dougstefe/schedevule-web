import Layout from './components/Layout'
import Link from './components/Link'
import { JobApplication } from './core/models/job-application'



export default function Home() {
  return (
    <Layout title="Portal de candidaturas do dev">
      <div className='flex'>
        <Link target='/job-applications' text='Minhas candidaturas' size='large' />
      </div>
    </Layout>
  );
}
