import React from 'react';

const Sort = props => (
  <div>
    <label>Sort By:</label>
    <select onChange={props.sort}>
      <option value='none'>None</option>
      <option value='recent'>Publication Date (newer-older)</option>
      <option value='older'>Publication Date (older-newer)</option>
      <option value='editions'>Most Editions</option>
    </select>
  </div>
)

export default Sort;
