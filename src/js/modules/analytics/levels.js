export const ANALYTICS_NONE = 'none';
export const ANALYTICS_NAVIGATION = 'navigation';

export function isAllowed(eventType, trackingLevel) {
  return _.findIndex(AnalyticsLevels, level => level.id == eventType)
    <= _.findIndex(AnalyticsLevels, level => level.id == trackingLevel);
}

const AnalyticsLevels = [
  {
    id: ANALYTICS_NONE,
    name: 'None'
  },
  {
    id: ANALYTICS_NAVIGATION,
    name: 'Navigation',
    description: 'How much you use the app, and what pages you go to'
  }
];

export default AnalyticsLevels;
