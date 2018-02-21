export const UPDATE_RESULTS = 'UPDATE_RESULTS'
export const RELOAD_RESULTS = 'RELOAD_RESULTS'

export function reloadResults() {
  return {
    type: RELOAD_RESULTS
  }
}


export function updateResults(results) {
  return {
    type: UPDATE_RESULTS,
    results
  }
}
