import React, { Fragment } from 'react';

export function ListItem(props) {
  return (
    <div className="d-flex">
      <div className="input-group mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={props.name}
          onChange={(e) => props.handleChange(e, props.listIndex)}
        />
      </div>
      {props.includePrice && (
        <Fragment>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Rs.</span>
            </div>
            <input
              type="text"
              name="domesticPrice"
              className="form-control"
              placeholder="Amount"
              value={props.domesticPrice}
              onChange={(e) => props.handleChange(e, props.listIndex)}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input
              type="text"
              name="internationalPrice"
              className="form-control"
              placeholder="Amount"
              props={props.internationalPrice}
              onChange={(e) => props.handleChange(e, props.listIndex)}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
