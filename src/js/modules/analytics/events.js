import AnalyticsLevels, {
  ANALYTICS_NONE,
  ANALYTICS_NAVIGATION
} from './levels';

import {
  SET_HOME,
  OPEN_HELP, CLOSE_HELP,
  START_SESSION, END_SESSION
} from 'modules/navigation';

const AnalyticsEvents = [
  {
    actions: [SET_HOME],
    type: ANALYTICS_NAVIGATION,
    collection: 'navigation',
    data: (action, state) => ({
      page: action.page
    })
  },
  {
    actions: [START_SESSION, END_SESSION],
    type: ANALYTICS_NAVIGATION,
    collection: 'sessions',
    data: (action, state) => ({})
  },
  {
    actions: [OPEN_HELP, CLOSE_HELP],
    type: ANALYTICS_NAVIGATION,
    collection: 'navigation',
    data: (action, state) => ({
      page: state.navigation.home
    })
  }
];

export default AnalyticsEvents;
