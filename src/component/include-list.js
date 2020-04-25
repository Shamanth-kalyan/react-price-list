import React, { Fragment, useState } from 'react';
import { ListItem } from './list-item';

export function IncludeList(props) {
  const initialState = props.includePrice
    ? {
        items: [
          { listIndex: 1, name: '', domesticPrice: '', internationalPrice: '' },
        ],
        domesticTotal: '',
        internationalTotal: '',
        date: new Date().toLocaleString(),
      }
    : {
        items: [{ listIndex: 1, name: '' }],
        date: new Date().toLocaleString(),
      };
  const [itemList, setItemList] = useState(initialState);

  function handleChange(e, key) {
    const changeItem = itemList.items.find((item) => item.listIndex === key);
    changeItem[e.target.name] = e.target.value;
    let newList = itemList.items.map((item) => {
      if (item.listIndex === key) {
        return {
          ...changeItem,
        };
      }
      return item;
    });

    newList = addItem(e.target.value, key, newList);
    newList = removeItem(e.target.value, key, newList, changeItem);
    if (props.includePrice) {
      const totalUpdate = updateChange(e, newList);
      setItemList({ ...itemList, items: newList, ...totalUpdate });
      props.onListItemChange({ include: newList });
    } else {
      setItemList({ ...itemList, items: newList });
      props.onListItemChange({ exclude: newList }); 
    }
  }

  function updateChange(e, newList) {
    const fieldName = e.target.name;
    if (fieldName === 'domesticPrice') {
      const domesticTotal = getTotal(fieldName, newList);
      return { domesticTotal };
    } else if (fieldName === 'internationalPrice') {
      const internationalTotal = getTotal(fieldName, newList);
      return { internationalTotal };
    }
    return {};
  }

  function getTotal(type, list) {
    return list
      .map((value) => (!!value[type] ? value[type] : 0))
      .reduce((total, data) => parseInt(total, 10) + parseInt(data, 0));
  }

  function addItem(value, key, newList) {
    if (value.length === 1 && key === itemList.items.length) {
      newList.push({
        listIndex: itemList.items.length + 1,
        name: '',
        domesticPrice: '',
        internationalPrice: '',
      });
    }
    return newList;
  }

  function removeItem(value, key, newList, changeItem) {
    if (
      value.length === 0 &&
      key === itemList.items.length - 1 &&
      isEmpty(changeItem)
    ) {
      const lastItem = itemList.items.find(
        (item) => item.listIndex === itemList.items.length
      );
      if (isEmpty(lastItem)) {
        newList.pop();
      }
    }
    return newList;
  }

  function isEmpty(changeItem) {
    const item = { ...changeItem };
    delete item.listIndex;
    return Object.values(item).every((value) => !value);
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between m-3">
        {props.includePrice ? (
          <Fragment>
            <h4>Included</h4>
            <h4>{itemList.date}</h4>
          </Fragment>
        ) : (
          <Fragment>
            <h4>Excluded</h4>
          </Fragment>
        )}
      </div>
      <div className="card m-3">
        <div className="card-header d-flex justify-content-between">
          <span>NAME</span>
          {props.includePrice && (
            <Fragment>
              {' '}
              <span>AMOUNT-DOMESTIC</span>
              <span>AMOUNT-INTERNATIONAL</span>
            </Fragment>
          )}
        </div>
        <div className="card-body">
          {itemList.items.map((items, index) => (
            <ListItem
              {...items}
              {...props}
              handleChange={handleChange.bind(this)}
              key={index}
            />
          ))}
        </div>
        {props.includePrice && (
          <div className="card-header d-flex justify-content-between">
            <span>Total</span>
            <span>Rs. {itemList.domesticTotal}(Estimate)</span>
            <span>$ {itemList.internationalTotal}(Estimate)</span>
          </div>
        )}
      </div>
    </Fragment>
  );
}
