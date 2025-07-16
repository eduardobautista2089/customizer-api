const axios = require('axios');
require('dotenv').config();

const SHOP = process.env.SHOP;
const TOKEN = process.env.TOKEN;

const scriptTagId = '229096259805';

async function deleteScriptTag() {
  try {
    await axios.delete(
      `https://${SHOP}/admin/api/2025-04/script_tags/${scriptTagId}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': TOKEN,
        },
      }
    );

    console.log(`🗑️ Deleted ScriptTag with ID ${scriptTagId}`);
  } catch (error) {
    console.error(
      '❌ Failed to delete ScriptTag',
      error.response?.data || error.message
    );
  }
}

deleteScriptTag();
