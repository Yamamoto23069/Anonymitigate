// aws-config.js
import AWS from 'aws-sdk';

// Cấu hình AWS SDK
AWS.config.update({
  region: "ap-southeast-1", // Thay đổi theo khu vực của bạn
  credentials: new AWS.Credentials('AKIA6ODU2Q6SBFV3XTVZ', 'rwGkQvwqk0hKLdcChiSRskyrpqvSQ8obbzmc2QdW')
});
