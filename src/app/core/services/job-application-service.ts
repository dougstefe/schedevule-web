import { injectable } from "tsyringe"

import { JobApplication } from '../models/job-application'


@injectable()
export class JobApplicationService {

  async list(start: number, size: number): Promise<JobApplication[]> {
    const response = await fetch('http://localhost:5959/job-applications/')
    await this.delay(2000)
    return await response.json()
  }

  async get(id: number): Promise<JobApplication> {
    const response = await fetch(`http://localhost:5959/job-applications/${id}`)
    await this.delay(2000)
    return await response.json()
  }

  async add(jobApplication: JobApplication): Promise<string | undefined> {
    const response = await fetch(
      'http://localhost:5959/job-applications/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(jobApplication)
      }
    )
    await this.delay(2000)
    if (response.ok) {
      const { id } = await response.json()

      return String(id)
    }
  }

  async update(jobApplication: JobApplication): Promise<boolean> {
    const response = await fetch(
      `http://localhost:5959/job-applications/${jobApplication.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(jobApplication)
      }
    )
    await this.delay(2000)
    return response.ok
  }
    return response.ok
  }
}