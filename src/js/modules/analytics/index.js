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
const client = null;//new KeenTracking({
//     projectId: '',
//     writeKey: ''
// });

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
  trackingLevel: ANALYTICS_NAVIGATION,
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
