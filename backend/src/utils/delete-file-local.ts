import fs = require('fs');
import path = require('path');

/**
 *
 * @param imgPath absolute path of file
 */
export const removeFile = (pathAbs: string) => {
  const filePath = path.join(process.cwd(), pathAbs);
  fs.unlink(filePath, (err) => {
    if (err) {
      return { code: err.code, message: err.message, stack: err.stack };
    }
  });
};
