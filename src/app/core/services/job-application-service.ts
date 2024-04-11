import { injectable } from "tsyringe"

import { JobApplication } from '../models/job-application'


@injectable()
export class JobApplicationService {
  async add(jobApplication: JobApplication): Promise<boolean> {
    const response = await fetch(
      '/api/job-applications/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify(jobApplication)
      }
    )
    return response.ok
  }
}