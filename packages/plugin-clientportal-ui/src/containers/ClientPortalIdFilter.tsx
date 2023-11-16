import { Counts } from '@erxes/ui/src/types';
import { withProps } from '@erxes/ui/src/utils';
import { gql } from '@apollo/client';
import * as compose from 'lodash.flowright';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';

import ClientPortalIdFilter from '../components/list/ClientPortalIdFilter';
import { queries } from '../graphql';
import { ClientPortalConfigsQueryResponse, IClientPortalUser } from '../types';

type Props = {
  counts: Counts;
  kind?: string;
};

type FinalProps = {
  clientPortalConfigsQuery?: ClientPortalConfigsQueryResponse;
} & Props;

class ClientPortalIdFilterContainer extends React.Component<FinalProps> {
  render() {
    const { clientPortalConfigsQuery, counts } = this.props;

    const clientPortalGetConfigs =
      (clientPortalConfigsQuery &&
        clientPortalConfigsQuery.clientPortalGetConfigs) ||
      [];

    const updatedProps = {
      ...this.props,
      clientPortalGetConfigs,
      loading:
        (clientPortalConfigsQuery ? clientPortalConfigsQuery.loading : null) ||
        false,
      counts: counts || {}
    };

    return <ClientPortalIdFilter {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, ClientPortalConfigsQueryResponse>(gql(queries.getConfigs), {
      name: 'clientPortalConfigsQuery',
      options: ({ kind = 'client' }) => ({
        fetchPolicy: 'network-only',
        variables: { kind }
      })
    })
  )(ClientPortalIdFilterContainer)
);
