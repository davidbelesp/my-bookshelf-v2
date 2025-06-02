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

export const darkStateColorClass: Record<State, string> = {
  [State.Completed]: "bg-dark_completed",
  [State.Reading]: "bg-dark_reading",
  [State.OnHold]: "bg-dark_onhold",
  [State.Dropped]: "bg-dark_dropped",
  [State.PlanToRead]: "bg-dark_plantoread",
};