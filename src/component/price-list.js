import React, { Fragment, useState } from 'react';

import { IncludeList } from '../component/include-list';

export function PriceList() {
  const [itemList, setItemList] = useState({
    include: [],
    exclude: [],
  });
  const [submitted, setSubmitted] = useState(false);

  function onListItemChange(newList) {
    setSubmitted(false);
    setItemList({ ...itemList, ...newList });
  }

  function isEmpty(changeItem) {
    const item = { ...changeItem };
    delete item.listIndex;
    return Object.values(item).every((value) => !value);
  }
  return (
    <Fragment>
      <IncludeList
        includePrice={true}
        onListItemChange={onListItemChange}
      ></IncludeList>
      <IncludeList
        includePrice={false}
        onListItemChange={onListItemChange}
      ></IncludeList>
      {submitted && <pre>{JSON.stringify(itemList, null, 2)}</pre>}
      <button
        type="button"
        className="btn btn-primary m-3"
        onClick={() => setSubmitted(true)}
      >
        Submit
      </button>
    </Fragment>
  );
}
