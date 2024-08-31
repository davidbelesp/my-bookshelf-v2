enum States {
    Reading = "Reading",
    Completed = "Completed",
    OnHold = "On Hold",
    Dropped = "Dropped",
    PlanToRead = "Plan to Read"
}

export function getStates() : string[] {
    return Object.values(States);
}

export function getStatesDropdown() {

    return getStates().map(state => {
        return {
            value: state,
            label: state
        }
    });

}

export default States;