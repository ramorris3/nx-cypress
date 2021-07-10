import { NavConstants } from '@halcyon/common';

export function Index() {

  return (
    <ul data-testid='nav'>
      {NavConstants.NAV_ITEMS.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
};

export default Index;
