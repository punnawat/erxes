import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { TaggerPopover } from '/imports/react-ui/common';
import { MessageListRow } from '../containers';
import Sidebar from './Sidebar';

const propTypes = {
  type: PropTypes.string,
  messages: PropTypes.array.isRequired,
  bulk: PropTypes.array.isRequired,
  emptyBulk: PropTypes.func.isRequired,
  toggleBulk: PropTypes.func.isRequired,
};

class List extends React.Component {
  renderNewButton() {
    const type = this.props.type;

    if (type) {
      const text = `New ${type === 'auto' ? 'auto' : 'manual'} message`;

      return (
        <Button bsStyle="link" href={`/engage/messages/create?type=${type || ''}`}>
          <i className="ion-plus-circled" /> {text}
        </Button>
      );
    }
  }

  render() {
    const { messages, bulk, emptyBulk } = this.props;
    const targets = bulk.map(b => b._id);

    const actionBarLeft = (
      <div>
        <TaggerPopover
          type="engageMessage"
          targets={targets}
          trigger={
            <Button bsStyle="link">
              <i className="ion-pricetags" /> Tag <span className="caret" />
            </Button>
          }
          afterSave={emptyBulk}
        />

        {this.renderNewButton()}
      </div>
    );

    const actionBar = <Wrapper.ActionBar left={bulk.length ? actionBarLeft : false} />;

    const content = (
      <Table className="no-wrap">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Segment</th>
            <th>From</th>
            <th>Status</th>
            <th>Total</th>
            <th>Sent</th>
            <th>Failed</th>
            <th>Created date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message =>
            <MessageListRow
              toggleBulk={this.props.toggleBulk}
              key={message._id}
              message={message}
            />,
          )}
        </tbody>
      </Table>
    );

    return (
      <div>
        <Wrapper
          header={<Wrapper.Header breadcrumb={[{ title: 'Messages' }]} />}
          leftSidebar={<Sidebar />}
          actionBar={actionBar}
          content={content}
        />
      </div>
    );
  }
}

List.propTypes = propTypes;

export default List;
