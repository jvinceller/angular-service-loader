import {Observable} from "rxjs";
import {ParentLevelResults} from "./parent-level-results";

export interface StructureLevel {
  observables: {
    [serviceName: string]: (<T, P extends ParentLevelResults> (parent?: P) => Observable<T>)
  },
  afterAll?: StructureLevel
}
