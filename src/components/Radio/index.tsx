import * as React from "react";

import "./scss/index.scss";


export interface RadioProps {
  /**
   * Used as marker for writing e2e tests
   */
  value?: string
  name?: string
  checked?: boolean
  onChange?: any
}

export const Radio: React.FC<RadioProps> = ({
  children,
  value,
  checked,
  name,
  onChange,
}) => (
  <div className="radio">
      <label>
        <input
        type="radio"
        checked={checked}
        value={value}
        id={name}
        onChange={onChange}
        name={name} />
        <span className="radio__label">{children}</span>
      </label>
  </div>
);
