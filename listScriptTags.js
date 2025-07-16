const axios = require('axios');
require('dotenv').config();

const SHOP = process.env.SHOP;
const TOKEN = process.env.TOKEN;

async function listScriptTags() {
  try {
    const res = await axios.get(
      `https://${SHOP}/admin/api/2025-04/script_tags.json`,
      {
        headers: {
          'X-Shopify-Access-Token': TOKEN,
        },
      }
    );

    console.log('🧾 Existing ScriptTags:');
    console.log(res.data.script_tags);
  } catch (error) {
    console.error(
      '❌ Failed to list ScriptTags',
      error.response?.data || error.message
    );
  }
}

listScriptTags();
