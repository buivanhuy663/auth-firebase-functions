
export interface PromiseOutputUseCase<Output> {
    run(): Promise<Output>
}
