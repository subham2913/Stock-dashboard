import React from 'react';
import { XAxis } from 'recharts';

const XAxisWrapper = ({ dataKey = 'date', ...props }) => {
  return <XAxis dataKey={dataKey} {...props} />;
};

export default XAxisWrapper;
