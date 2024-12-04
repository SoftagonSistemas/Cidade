export interface SLAItem {
  name: string
  status: string
  gracePeriodHrs: number
  dateCreated: Date
  dateUpdated: Date
}
export interface DepartmentItem {
  topic: string
  status: string
  type: string
  parentTopic: string
  internalNote: string
}
