import {forkJoin, Subscriber} from "rxjs";
import {StructureLevel} from "./structure-level";
import {ParentLevelResults} from "./parent-level-results";

export class StructureLoader {
  static loadStructure(level: StructureLevel, subscriber: Subscriber<any>, parent?: ParentLevelResults): void {
    const observables = [];
    let index = 0;
    for (let observablesKey in level.observables) {
      const observable = parent ? level.observables[observablesKey](parent) : level.observables[observablesKey]();
      observables.push(observable);
      index++;
    }

    if (observables.length === 0) {
      console.log('wrong definition, please don\'t declare an "afterAll" block without observables');
      subscriber.error('wrong definition');
      return;
    }

    if (observables.length === 1) {
      this.loadSingleObservable(observables, level, subscriber);

      return;
    }

    forkJoin(observables).subscribe({
      next: (results: any[]) => {
        const parentResults = StructureLoader.createParentResults(level, results);
        if (level.afterAll) {
          this.loadStructure(level.afterAll, subscriber, parentResults);
        } else {
          StructureLoader.deliverResultsAndComplete(subscriber, parentResults);
        }
      }, error: (errorForkJoin) => {
        subscriber.error(errorForkJoin);
      }
    });
  }

  private static loadSingleObservable(observables: any[], level: StructureLevel, subscriber: Subscriber<any>) {
    observables[0].subscribe({
      next: (result: any) => {
        if (level.afterAll) {
          const parentResults = StructureLoader.createParentResults(level, [result]);
          this.loadStructure(level.afterAll, subscriber, parentResults);
        } else {
          StructureLoader.deliverResultsAndComplete(subscriber, result);
        }
      }, error: (error: any) => {
        subscriber.error(error);
      }
    });
  }

  static createParentResults(level: StructureLevel, results: any[]) {
    let index = 0;
    const parentResults: any = {};
    for (let observablesKeys in level.observables) {
      parentResults[observablesKeys] = results[index];
      index++;
    }
    return parentResults;
  }

  static deliverResultsAndComplete(subscriber: Subscriber<any>, parentResults: any[] | any) {
    // emitting the combined result of all the loading
    subscriber.next(parentResults);
    // if successful emit completion as mentioned in RxJS' contract
    subscriber.complete();
  }
}
