import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import { Paper } from '@mui/material';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  const safeDescription = DOMPurify.sanitize(product.description);

  return (
    <Paper elevation={0} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </Paper>
  );
  //vì sao nó lại để dangerouslySetInnerHTML, có gì mà nguy hiểm ở đây thì
  //product.description là 1 cái chuỗi html, mà trong thẻ html thì sẽ có các thẻ lquan đến như là thẻ script
  // và ngta có thể viết thẻ scriptting trong đó, ví dụ như cái scriptting đó ngta có thể đoc code là lấy
  // localStorage của các bạn nó gửi về server cho nó chẳng hạn và nếu như có chuyện đó thật sự xảy ra
  // thì có phải là dữ liệu trong localStorage, trong session... thì có phỉa bị gửi lên server của hacker kh
  // thì như vậy rất nguyên hiểm thì đây là kiểu tấn công xss
}

export default ProductDescription;
