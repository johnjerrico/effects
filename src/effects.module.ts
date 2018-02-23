import { Actions } from './actions';
import { EffectsSubscription } from './effects-subscription';

export class EffectsModule {
  static provideEffects(): any[] {
    return [
      Actions,
      EffectsSubscription
    ];
  }
}
