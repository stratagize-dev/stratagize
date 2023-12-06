export interface JobHandlerPayload<TPayload> {
  jobId: number;
  payload: TPayload;
}
