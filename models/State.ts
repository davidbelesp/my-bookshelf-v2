export enum State {
    Reading = "Reading",
    Completed = "Completed",
    OnHold = "On Hold",
    Dropped = "Dropped",
    PlanToRead = "Plan to Read"
}

export const stateColorClass: Record<State, string> = {
  [State.Completed]: "bg-completed",
  [State.Reading]: "bg-reading",
  [State.OnHold]: "bg-onhold",
  [State.Dropped]: "bg-dropped",
  [State.PlanToRead]: "bg-plantoread",
};