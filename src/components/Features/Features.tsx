import { Fragment } from 'react';
import { Flow } from '@/components/Features/Flow';
import { TabOverview } from '@/components/Features/TabOverview';
import { Organization } from '@/components/Features/Organization';
import { History } from '@/components/Features/History';
import { Protection } from '@/components/Features/Protection';
import { Search } from '@/components/Features/Search';
import { Sharing } from '@/components/Features/Sharing';
import { Scaling } from '@/components/Features/Scaling';
import { Customization } from '@/components/Features/Customization';
import { Privacy } from '@/components/Features/Privacy';
import { More } from '@/components/Features/More';

import { Spacer } from '@/components/Spacer';

const features = [
  Flow,
  TabOverview,
  Organization,
  History,
  Protection,
  Search,
  Sharing,
  Scaling,
  Customization,
  Privacy,
  More,
] as const;

export const Features = () => {
  return (
    <>
      {features.map((Feature, i) => (
        <Fragment key={i}>
          <Feature reverse={!!(i % 2)} />
          <Spacer />
        </Fragment>
      ))}
    </>
  );
};
