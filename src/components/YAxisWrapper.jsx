import React from 'react';
import { YAxis } from 'recharts';

const YAxisWrapper = ({ domain = ['dataMin', 'dataMax'], ...props }) => {
  return <YAxis domain={domain} {...props} />;
};

export default YAxisWrapper;
