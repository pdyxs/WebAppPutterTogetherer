export const SET_HOME       = `${PACKAGE_NAME}/navigation/set`;
export const OPEN_STARS     = `${PACKAGE_NAME}/navigation/stars/open`;
export const CLOSE_STARS    = `${PACKAGE_NAME}/navigation/stars/close`;
export const OPEN_HELP      = `${PACKAGE_NAME}/navigation/help/open`;
export const CLOSE_HELP     = `${PACKAGE_NAME}/navigation/help/close`;
export const START_SESSION  = `${PACKAGE_NAME}/navigation/session/start`;
export const END_SESSION    = `${PACKAGE_NAME}/navigation/session/end`;
import {initState, saveState} from 'modules/saveable';

const init = initState('navigation');
const save = saveState('navigation');

export function setHome(page)
{
  return {
    type: SET_HOME,
    page
  };
}

export function toggleHelp(newState)
{
  return {
    type: newState ? OPEN_HELP : CLOSE_HELP
  };
}

export function startSession()
{
  return {
    type: START_SESSION
  };
}

export function endSession()
{
  return {
    type: END_SESSION
  };
}

const initialState = {
  ...init({
    home: '/setup'
  })
};

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case SET_HOME:
      var newPage = action.page
      return {
        ...state,
        ...save({home: newPage})
      };
    default:
      return state;
  }
}
