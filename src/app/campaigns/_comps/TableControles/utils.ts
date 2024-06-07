
import { sortConfig } from "./types"


export const converetSortconfigsToOptions =(sortConfigs: sortConfig[]) : IOption[]=> {
  return sortConfigs.map(config=> ({
    display: config.display,
    value: config.keyToSort + '_' + config.direction
  }))
}
