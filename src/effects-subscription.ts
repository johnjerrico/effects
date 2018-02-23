import { OpaqueToken, Inject, SkipSelf, Optional, Injectable, OnDestroy } from 'ng-metadata/core';
import { Action, Store } from '../store';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { mergeEffects } from './effects';


export const effects = new OpaqueToken('ngrx/effects: Effects');

@Injectable()
export class EffectsSubscription extends Subscription implements OnDestroy {
  constructor(
    @Inject(Store) private store: Observer<Action>
  ) {
    super();
  }

  addEffects(effectInstances: any[]) {
    const sources = effectInstances.map(mergeEffects);
    const merged = merge(...sources);

    this.add(merged.subscribe(this.store));
  }

  ngOnDestroy() {
    if (!this.closed) {
      this.unsubscribe();
    }
  }
}
