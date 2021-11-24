import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>item.title</dt>
      <dd>item.description</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}