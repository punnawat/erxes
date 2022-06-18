import Wrapper from '@erxes/ui/src/layout/components/Wrapper';
import React from 'react';
import { __ } from 'coreui/utils';
import ClientPortalIdFilter from '../../containers/ClientPortalIdFilter';
import { isEnabled } from '@erxes/ui/src/utils/core';
import { IClientPortalUser } from '../../types';

function Sidebar({
  loadingMainQuery,
  clientPortalUsers
}: {
  loadingMainQuery: boolean;
  clientPortalUsers: IClientPortalUser[];
}) {
  return (
    <Wrapper.Sidebar>
      {isEnabled('clientportal') && (
        <ClientPortalIdFilter clientPortalUsers={clientPortalUsers} />
      )}
    </Wrapper.Sidebar>
  );
}

export default Sidebar;
