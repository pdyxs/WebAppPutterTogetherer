export const SET_LEVEL  = `${PACKAGE_NAME}/analytics/set-level`;

import {initState, saveState} from 'modules/saveable';
import uuid from 'uuid/v4';
import { loop, Cmd } from 'redux-loop';
import _ from 'lodash';

import AnalyticsLevels, {
  ANALYTICS_NONE,
  ANALYTICS_NAVIGATION,
  isAllowed
} from './levels';
import AnalyticsEvents from './events';

export { AnalyticsLevels };

const init = initState('home');
const save = saveState('home');

import KeenTracking from 'keen-tracking';

// This is your actual Project ID and Write Key
const client = new KeenTracking({
    projectId: '5c730da4c9e77c0001cf46d0',
    writeKey: '56AE91AB2EA152033125B343D571A17FF599C606299F19DF1FF67036E5CC1584492828A5DA6CBCDCCB4548940920DCCFE9717CD8E2E6DAA116C1DF41EF5C72F9E1EF1463228D66AE050BACBFD85D4D6D38C74F572AAABFE7207D852036B6CE57'
});

function getEventsTriggeredBy(triggeringAction, trackingLevel) {
  return _.filter(AnalyticsEvents, event =>
    (_.includes(event.actions, triggeringAction) && isAllowed(event.type, trackingLevel))
  );
}

function sendEvents(action, events) {
  if (events.length == 0) return;
  return (dispatch, getState) => {
    var state = getState();

    for (var i = 0; i != events.length; ++i) {
      var data = {
        uid: state.analytics.uid,
        action: action.type,
        platform: PLATFORM,
        version: APP_VERSION_NUMBER,
        ...events[i].data(action, state)
      };

      if (!IS_PRODUCTION_BUILD)
      {
        console.log(_.set({}, events[i].collection, data));
      } else {
        client.recordEvent(events[i].collection, data);
      }
    }
  }
}

export function setLevel(level)
{
  return {
    type: SET_LEVEL,
    level
  };
}

const initialState = init({
  trackingLevel: ANALYTICS_AMOUNTS,
  uid: uuid()
});

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case SET_LEVEL:
      return loop({
          ...state,
          ...save({trackingLevel: action.level})
        },
        Cmd.run(
          getEventsTriggeredBy, {
          successActionCreator: (events) => sendEvents(action, events),
          args: [action.type, state.trackingLevel]
        })
      );
    default:
      return loop(state,
        Cmd.run(
          getEventsTriggeredBy, {
          successActionCreator: (events) => sendEvents(action, events),
          args: [action.type, state.trackingLevel]
        })
      );
  }
}
