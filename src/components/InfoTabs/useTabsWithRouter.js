import { useRouteMatch } from 'react-router-dom';

export default function useTabsWithRouter(routes, defaultRoute) {
  const match = useRouteMatch(routes);

  return match?.path ?? defaultRoute;
}
