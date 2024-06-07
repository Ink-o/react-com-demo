import { createFromIconfont } from '../createFrontIconfont';
import React from 'react';

const IconFont = createFromIconfont('//at.alicdn.com/t/c/font_2362828_nv0wia0vi8j.js');

function IconChristmars() {
  return (
    <IconFont type="iconshengdanxuemao" size="40px"></IconFont>
  );
}

export default IconChristmars;