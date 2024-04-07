export class JobApplication {
  constructor(
    company: string,
    candidateAt: Date,
    channel: string,
    linkToTrackProgress: string,
    id: string | undefined = undefined
  ) {
    this.id = id
    this.candidateAt = candidateAt
    this.company = company
    this.channel = channel
    this.linkToTrackProgress = linkToTrackProgress
  }
  id: string | undefined
  company: string
  candidateAt: Date
  channel: string
  linkToTrackProgress: string
}