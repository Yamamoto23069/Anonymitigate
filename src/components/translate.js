// translate.js
import AWS from 'aws-sdk';
import '../aws-config'; // Import cấu hình AWS

const translate = new AWS.Translate();

//Việt-Nhật
export const translateMessage = async (message, targetLanguage = 'ja') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'vi', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};

//Nhật-Việt
export const translateMessage2 = async (message, targetLanguage = 'vi') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'ja', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};

//Anh-Nhật
export const translateMessage3 = async (message, targetLanguage = 'ja') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'en', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};

//Nhật-Anh
export const translateMessage4 = async (message, targetLanguage = 'en') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'ja', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};

//Anh-Việt
export const translateMessage5 = async (message, targetLanguage = 'vi') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'en', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};

//Việt-Anh
export const translateMessage6 = async (message, targetLanguage = 'en') => {
  try {
    // Loại bỏ khoảng trắng trước và sau
    targetLanguage = targetLanguage.trim();

    // Kiểm tra nếu targetLanguage không phải là một chuỗi
    if (typeof targetLanguage !== 'string' || targetLanguage.length === 0) {
      throw new Error('TargetLanguageCode must be a non-empty string');
    }

    const params = {
      SourceLanguageCode: 'vi', // Ngôn ngữ gốc của tin nhắn
      TargetLanguageCode: targetLanguage, // Ngôn ngữ đích
      Text: message // Tin nhắn muốn dịch
    };

    const result = await translate.translateText(params).promise();
    return result.TranslatedText; // Trả về bản dịch
  } catch (error) {
    console.error('Error translating message:', error);
    throw error;
  }
};








